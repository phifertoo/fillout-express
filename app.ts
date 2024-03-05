import express from "express";
const bodyParser = require("body-parser");
import router from "./src/routes/routes";

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
