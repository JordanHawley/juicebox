require("dotenv").config();

const { client } = require("./db");
client.connect();

const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
server.use(bodyParser.json());
const apiRouter = require("./api");
server.use("/api", apiRouter);

const morgan = require("morgan");
server.use(morgan("dev"));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.get("/add/:first/to/:second", (req, res, next) => {
  res.send(
    `<h1>${req.params.first} + ${req.params.second} = ${
      Number(req.params.first) + Number(req.params.second)
    }</h1>`
  );
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
