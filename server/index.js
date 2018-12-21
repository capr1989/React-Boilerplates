import express from "express";
import renderer from "./src/helpers/renderer.js";
const app = express();

console.log("hello world");

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send(renderer());
});
app.listen(3000, () => {
  console.log("listening");
});
