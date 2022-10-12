const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { Binary } = require('mongodb');
const { maxHeaderSize } = require('http');
var database

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

const destinationsSchema = {
  title: {
  type: String,
  message: "Title is required",
  trim: true
},
  location: {
  type: String,
  message: "Location is required",
  trim: true
  },
  country: { 
  type: String,
  message: "Country is required",
  trim: true

},
  dateFrom: {
  type: Date,
},
  dateTo: {
  type: Date,
  },

  description: {
  type: String,
  message: "Description is required",
  trim: true
  },
  photo: String
};
// const destinationsSchema = {
//   title: {
//     type: String,
//     required: "Title must be filled before creating a new destination!"
//   },
//   location: String,
//   country: String,
//   dateFrom: Date,
//   dateTo: Date,
//   description: String,
//   photo: String
// };

const Destination = mongoose.model("destinations", destinationsSchema);

app.get('/api/destinations', (req, res) => {
  Destination.find().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err)
  })
})

//IÑIGO-MONGODB
// const uri = 'mongodb+srv://traveldestination:Traveldestination123@cluster0.zi5cvyi.mongodb.net/?retryWrites=true&w=majority';
//
const uri = 'mongodb+srv://traveldestination:Traveldestination123@traveldestination.hcx2xmc.mongodb.net/TravelDestinations?retryWrites=true&w=majority';

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html")
// })



let newDestination

app.post("/", function (req, res) {
  newDestination = new Destination({
    title: req.body.title,
    location: req.body.location,
    country: req.body.country,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    description: req.body.description,
    photo: req.body.photo
  });
  newDestination.save();
  res.redirect('/create.html');
})



app.listen(8000, () => {
  mongoose.connect(uri, {
    useNewUrlParser: true
  }, (error, result) => {
    if (error) throw error
  })
  console.log("Connected to MongoDB!")
  console.log("Server is running on port 8000!")
});

module.exports = Destination;