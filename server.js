const express = require('express');
const mongodb = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

const destinationsSchema = {
  title: String,
  location: String,
  dateFrom: Date,
  dateTo: Date,
  description: String,
  photo: String
};

const Destination = mongodb.model("destinations", destinationsSchema);

// const uri = 'mongodb://localhost:27017/TravelDestinations';
const uri = 'mongodb+srv://traveldestination:Traveldestination123@traveldestination.hcx2xmc.mongodb.net/TravelDestinations?retryWrites=true&w=majority';

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

async function connect() {
  try {
    await mongodb.connect(uri)
    console.log("Connected to MongoDB!")
  } catch (error) {
    console.error(error);
  }
}

connect();

app.post("/", function (req, res) {
  let newDestination = new Destination({
    title: req.body.title,
    location: req.body.location,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    description: req.body.description,
    photo: req.body.photo
  });
  newDestination.save();
  res.redirect('/');
})

app.listen(8000, () => {
  console.log("Server is running on port 8000!")
});