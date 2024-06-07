import * as dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import swaggerDocs from "./documentation/swagger.json";

dotenv.config();

const port: number = parseInt(process.env.PORT || "3333", 10);

const app: Application = express();

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${
        res.statusCode
      } - ${duration}ms`
    );
  });
  next();
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message, err.stack);

  const statusCode: number = (err as any).statusCode || 500;
  const message: string = err.message || "Internal Server Error";
  const response = {
    success: false,
    error: {
      message,
      code: (err as any).code,
    },
  };

  res.status(statusCode).json(response);
};

const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(requestLogger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.use("/api", routes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}! 🚀`);
});
