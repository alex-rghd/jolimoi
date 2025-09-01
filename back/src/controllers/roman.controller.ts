import { Request, Response } from "express";
import { toRomanService } from "../services/roman.service";

interface ApiResponse {
  // success: boolean;
  data: any;
  // message?: string;
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
        // success: false,
        data: "Number field missing or not a number",
      });
    }

    const romanNumeral = toRomanService(number);

    return res.status(200).json({
      // success: true,
      data: {
        number: number,
        roman: romanNumeral,
      },
      // message: `${number} converti en ${romanNumeral} avec succès`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        // success: false,
        data: error.message,
      });
    }

    return res.status(500).json({
      // success: false,
      data: "Erreur interne du serveur",
    });
  }
};
