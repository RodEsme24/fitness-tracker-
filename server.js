const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var bodyParser = require('body-parser')
var path=require("path")
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/css/'))

 mongoose.connect("mongodb://localhost/fitness", {
  useNewUrlParser: true,
  useFindAndModify: false
 });
 app.get('/',(req,res)=>{
  var filePath = "./views/index.html"
  var resolvedPath = path.resolve(filePath);
  res.sendFile(resolvedPath)
})

app.get('/exercise', (req, res) => {
  var filePath = "./views/exercise.html"
  var resolvedPath = path.resolve(filePath);
  res.sendFile(resolvedPath)
})
app.put('/api/workouts/:id', (req, res) => {
  console.log(req.body)

})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});