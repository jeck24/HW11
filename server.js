var express = require("express");
var path = require("path");

var fs = require('fs');

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var note = [
    ""
];

function getData(){
    var pathJSON = path.join(__dirname,"./db/db.json");
    var raw = fs.readFileSync(pathJSON, (err,data)=>{
        if (err) throw err;
    });
}

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(notes);
});


app.get("/api/notes/:note", function(req, res) {
  return res.json(false);
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  notes = JSON.parse(getData());

  notes.push(newNote);
  let noteString = resetSequenceID(notes);
  resetSequenceID(noteString);
  writeToDBJSON(noteString);

  res.json(newNote);
});

app.delete('/api/notes/:id', function(req,res){
    var chosen = req.params.id;

    note = JSON.parse(getData());

    let input = notes.filter(function(item){
        return item.id != chosen;
    });

    writeToDBJSON(input);

});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});