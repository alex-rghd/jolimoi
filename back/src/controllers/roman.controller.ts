import { Request, Response } from "express";
import { toRomanService } from "../services/roman.service";

interface ApiResponse {
  data: string;
}

interface RomanRequest {
  number: number;
}

export const convertToRoman = async (
  req: Request<{}, ApiResponse, RomanRequest>,
  res: Response<ApiResponse>
) => {
  try {
    const { number } = req.body;

    if (typeof number !== "number") {
      return res.status(400).json({
        data: "Number field missing or not a number",
      });
    }

    const romanNumeral = toRomanService(number);

    return res.status(200).json({
      data: romanNumeral,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        data: error.message,
      });
    }

    return res.status(500).json({
      data: "Erreur interne du serveur",
    });
  }
};
