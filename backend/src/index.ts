import express from "express";
import routes from "./routes";

import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}! 🚀`);
});
