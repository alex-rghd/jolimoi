import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// app.get("/events", (req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });

//   // Envoie un message SSE au client
//   res.write(`data: Hello SSE\n\n`);

//   // Ferme la connexion après 500ms
//   setTimeout(() => {
//     res.end();
//   }, 100);
// });

export default app;
