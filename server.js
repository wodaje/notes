const path = require('path')
const express = require('express')
const app = express()
const fs = require("fs")
const db = require("./db/db.json")
const { stringify } = require('querystring')

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

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

app.delete("/api/notes/:id", function(req, res) {
  
  let id = parseInt(req.params.id)
    
  for (var i = 0; i < db.length; i++) {
    if (id === db[i].id) {
     db.splice(i,1)
    }
  }
  for (var i = 0; i < db.length; i++) {
    db[i].id = i + 1 
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(db)), (err) => {
    if(err) throw err
  }
  res.sendFile(path.join(__dirname, "/public/notes.html"))

  // return res.json(false);
});

app.post("/api/notes", function(req, res) {
  let note = req.body
  note.id = db.length + 1
  db.push(note)
  fs.writeFileSync("./db/db.json", JSON.stringify(db)), (err) => {
    if(err) throw err
  }
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})
  