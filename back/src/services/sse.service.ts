import { Response } from "express";

const connections = new Map<string, Response>();

export const sseService = {
  addConnection: (id: string, res: Response) => {
    connections.set(id, res);
  },
  removeConnection: (id: string) => {
    connections.delete(id);
  },
  getConnection: (id: string): Response | undefined => {
    return connections.get(id);
  },
  sendMessage: (id: string, data: any) => {
    const res = connections.get(id);
    if (res) {
      res.write(`data: ${JSON.stringify({ data })}\n\n`);
    }
  },
  closeConnection: (id: string) => {
    const res = connections.get(id);
    if (res) {
      res.end();
      connections.delete(id);
    }
  },
};