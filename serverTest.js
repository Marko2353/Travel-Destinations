const express = require('express');
const mongodb = require('mongoose');
const app = express();
const port = 5504;

app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

/*
app.get('/', (req, res) => {
  
  Destination.find({}, function (err, destinations) {
    res.render('index-edit', {
      destinationsList: destinations
    })
  })
})
*/
//IÑIGO-MONGODB
const uri = "mongodb+srv://e-learning-admin:e-learning-admin@e-learning.mkhehw2.mongodb.net/e-learning";  


//NIKO-MONGODB
//const uri = 'mongodb+srv://traveldestination:Traveldestination123@traveldestination.hcx2xmc.mongodb.net/TravelDestinations?retryWrites=true&w=majority';

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html")
// })

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://e-learning-admin:e-learning-admin@e-learning.mkhehw2.mongodb.net/test-travels"
  )
  .catch((error) => console.log(error));

  app.get("/", (req, res) => {
    res.render("index-edit");
  });
/* create
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
*/

///update
app.post("/update", (req, res) => {

var query = {'_id': '63456c7294e4b8e14c2ae77d'};

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
 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });