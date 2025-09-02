import { Request, Response } from "express";
import { toRomanService } from "../services/roman.service";
import { sseService } from "../services/sse.service";

interface ApiResponse {
  data: string;
}

interface RomanRequest {
  number: number;
  connectionId: string;
}

export const connections = new Map<string, Response>();

export const convertToRoman = async (
  req: Request<{}, ApiResponse, RomanRequest>,
  res: Response<ApiResponse>
) => {
  const { number, connectionId } = req.body;

  if (number > 100) {
    return res.status(400).json({
      data: "Number must be 100 or less",
    });
  }

  const resSSE = connections.get(connectionId)!;

  if (!resSSE) {
    return res.status(404).json({ data: "Connection not found" });
  }

  try {
    const timer = setTimeout(() => {
      const romanNumeral = toRomanService(number);
      resSSE.write(`data: ${JSON.stringify({ data: romanNumeral })}\n\n`);

      resSSE.end();
      connections.delete(connectionId); 
    }, 1000);

    timer.unref();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        data: error.message,
      });
    }
    connections.delete(connectionId);
    res.status(500).json({ data: "Failed to send data" });
  }
};

export const convertToRomanEvent = (req: Request, res: Response) => {
  const connectionId = req.query.connectionId as string;
  if (!connectionId) {
    return res.status(400).send("Missing client id");
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  sseService.addConnection(connectionId, res);
  sseService.sendMessage(connectionId, "Converting ...");
  connections.set(connectionId, res);

  const cleanup = () => sseService.removeConnection(connectionId);

  req.on("close", cleanup);
  req.on("error", cleanup);
  res.on("error", cleanup);

};
