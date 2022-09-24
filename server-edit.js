const express = require('express');
const mongodb = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

const destinationsSchema = {
  title: String,
  location: String,
  country: String,
  dateFrom: Date,
  dateTo: Date,
  description: String,
  photo: String
};

const Destination = mongodb.model("destinations", destinationsSchema);

app.get('/', (req, res) => {
  Destination.find({}, function (err, destinations) {
    res.render('index-edit', {
      destinationsList: destinations
    })
  })
})

//IÑIGO-MONGODB
const uri = 'mongodb+srv://traveldestination:Traveldestination123@cluster0.zi5cvyi.mongodb.net/?retryWrites=true&w=majority';
//
//NIKO-MONGODB  const uri = 'mongodb+srv://traveldestination:Traveldestination123@traveldestination.hcx2xmc.mongodb.net/TravelDestinations?retryWrites=true&w=majority';

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html")
// })

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
    country: req.body.country,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    description: req.body.description,
    photo: req.body.photo
  });
  newDestination.save();
  res.redirect('/');
})

var query = {'_id': '632f0908b66bb4d51cb1e838'};

MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
  if (err) return res.send(8000, {error: err});
  return res.send('Succesfully saved.');
});

app.listen(8000, () => {
  console.log("Server is running on port 8000!")
});