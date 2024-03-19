import express from "express";
const bodyParser = require("body-parser");
import router from "./public/src/routes/routes";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31557600"); // Example for static assets
  next();
});

app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
