const { connect } = require("../db");
const express = require("express");
const commentsController = require("./controllers/comments");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // metoda use jest używana do dodawania funkcji pośredniczących (middleware) do przepływu żądań i odpowiedzi. Funkcje pośredniczące są wywoływane sekwencyjnie podczas przetwarzania żądania HTTP, co pozwala na wykonywanie różnych operacji, takich jak uwierzytelnianie, obsługa sesji czy walidacja danych.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/comments", commentsController.all);
app.post("/comments", commentsController.create);
app.put("/comments/:id", commentsController.update);
app.delete("/comments/:id", commentsController.remove);

const startServer = async () => {
  await connect("mongodb://localhost:27017/comments");

  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
};

startServer();
