
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

//const uri = "mongodb+srv://e-learning-admin:e-learning-admin@e-learning.mkhehw2.mongodb.net/e-learning";  
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

///update
app.post("/update", (req, res) => {
  //https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose


  var query = {'_id': '632ddfe8cc5a7f6a21782e45'};



let title = req.body.title;
let location = req.body.location;
let country = req.body.country;
let dateFrom = req.body.dateFrom;
let dateTo = req.body.dateTo;
let description = req.body.description;
let photo = req.body.photo;



/*if(title==="" && location==="" && country==="" && dateFrom==="" && dateTo==="" && description==="" && photo===""){
  res.json({ 
    status: "FAILED",
    message: "You need to edit atleast one field"
  })
}
else { */ //query es el id de lo que quiero editar
  Destination.findOneAndUpdate(query, {title:title, location:location, country:country, dateFrom:dateFrom, dateTo: dateTo, description:description, photo: photo}, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
});
//} 
});

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