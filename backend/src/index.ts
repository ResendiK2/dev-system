import * as dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import swaggerDocs from "./swagger.json";

dotenv.config();

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}! 🚀`);
});
