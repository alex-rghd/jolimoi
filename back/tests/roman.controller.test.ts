import request from "supertest";
import app from "../src/app";

describe("Roman Controller", () => {
  describe("POST /roman/convert", () => {
    test("should convert valid number to roman", async () => {
      const response = await request(app)
        .post("/roman/convert")
        .send({ number: 42 })
        .expect(200);

      expect(response.body.data).toBe("XLII");
    });

    test("should return error for invalid number", async () => {
      const response = await request(app)
        .post("/roman/convert")
        .send({ number: 150 })
        .expect(400);

      expect(response.body.data).toBe("The number must be between 1 and 100.");
    });
  });
});
