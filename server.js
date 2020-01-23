// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/waitlist", (req, res) => {
  // res.sendFile(path.join(__dirname, "reserve.html"));
});

// waiting list

// current reservations

// database link for tables

// database for waiting list
app.get("/api/tables", function (req, res) {
  res.json(JSON.parse(fs.readFileSync('db/db.json', 'utf8')).slice(0,5));
});

app.get("/api/waiting", function (req, res) {
  res.json(JSON.parse(fs.readFileSync('db/db.json', 'utf8')).slice(5));
});



app.post("/reserve/newreservation", (req,res)=>{
  const newReservation = req.body;
  dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  dbJSON.push(newReservation);
  fs.writeFileSync('db/db.json', JSON.stringify(dbJSON,null,2,"utf-8"))
  res.json(newReservation);
})



// Displays all characters


// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function (req, res) {
  var chosen = req.params.reservations;

  console.log(chosen);

  reservations = res.json(JSON.parse(fs.readFileSync('db/db.json', 'utf8')));
  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});