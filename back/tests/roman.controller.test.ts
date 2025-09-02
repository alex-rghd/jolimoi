import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import app from "../src/app"; 

jest.setTimeout(10000); // timeout augmenté pour SSE

test("SSE + POST integration: should receive roman numeral", (done) => {
  const connectionId = uuidv4();

  const sseReq = request(app)
    .get(`/roman/events?connectionId=${connectionId}`)
    .timeout({ response: 8000, deadline: 10000 });

  sseReq.buffer(false).parse((res, cb) => {
    res.setEncoding("utf8");
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;

      if (data.includes("Converting ...")) {
        // reçu message "Converting ..."
        data = ""; // reset buffer
      } else {
        try {
          // Essayer de parser le chunk complet
          const jsonStr = chunk.trim().replace(/^data: /, "");
          const parsed = JSON.parse(jsonStr);
          if (parsed.data && parsed.data !== "Converting ...") {
            expect(parsed.data).toBe("XLII"); // 42 en chiffre romain
            sseReq.abort(); // fermer la connexion SSE côté client
            done();
          }
        } catch {
          // pas encore un JSON complet, on attend la suite
        }
      }
    });

    res.on("error", (err) => {
      done(err);
    });
  });

  sseReq.end((err) => {
    if (err) done(err);
  });

  setTimeout(() => {
    request(app)
      .post("/roman/convert")
      .send({ number: 42, connectionId })
      .expect(200)
      .catch(done);
  }, 500);
});
