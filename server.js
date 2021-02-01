const path = require('path')
const express = require('express')
const app = express()
const fs = require("fs")
const db = require("./db/db.json")

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"))
  // return res.json(db.json)
})

app.get("/api/notes/:id", function(req, res) {
  var chosen = req.params.character

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

app.post("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname + '/db', "db.json"))
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})
  