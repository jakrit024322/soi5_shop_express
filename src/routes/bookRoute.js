const express = require('express');
const app = express.Router();
const bookController = require('../controllers/bookController')
// const auth = require("../middleware/auth");

app.get("/", bookController.getBook);

app.get("/:id",bookController.getBookById);

app.get("/name/:name",bookController.getBookByName);

app.post("/", bookController.addBook);

app.put("/:id", bookController.editWholeBook);

// app.patch("/:id",auth,bookController.editProduct);

app.delete("/:id", bookController.deleteBook);

module.exports = app;