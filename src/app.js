import express from "express";
import articlesRouter from "./routes/articles.js";
//import tachesRouter from "./routes/taches.js";
import tachesRouter from "./routes/tache.routes.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/articles", articlesRouter);
app.use("/api/taches/v1", tachesRouter);

app.use((req, res, next) => {
  const err = new Error(`Route inconnue : ${req.method} ${req.originalUrl}`);
  console.log(req.originalUrl)
  err.statusCode = 404;
  next(err);
});

export default app;