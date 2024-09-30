import express, { Request, Response } from "express";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cors from "cors";

const app = express();

app.use(express());
app.use(express.json());
// frontend cors  origin setup frontend url is http://localhost:5173/

app.use(
  cors({
    // origin: "https://sportyra.vercel.app",
    origin: "http://localhost:5173",
    // local host origin
    // origin: "http://localhost:3000",

    credentials: true,
  })
);

app.use("/api/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("hey  Sports facility  server is running 😎");
});

app.use(globalErrorHandler);

app.use(notFound);
export default app;
