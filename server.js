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
    var item = fs.readFileSync(pathJSON, (err,data)=>{
        if (err) throw err;
    });

    return item;
}

function writeData(){
    let noteString = JSON.stringify(item);
    var pathJSON = path.join(__dirname, './db/db.json');
    fs.writeFileSync(pathJSON,noteString, (err) =>{
        if (err) throw err;
    });
}

function reset(res){
    let item = res;
    for(var x=0; x<res.length; x++){
        item[x].id = x;
    }

    return item;
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
  let noteString = reset(notes);
  reset(noteString);
  writeData(noteString);

  res.json(newNote);
});

app.delete('/api/notes/:id', function(req,res){
    var chosen = req.params.id;

    note = JSON.parse(getData());

    let input = notes.filter(function(item){
        return item.id != chosen;
    });

    writeData(input);

});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});