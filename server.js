const express = require("express");
const mongoose = require("mongoose");
let Schema=mongoose.Schema
let schema=new Schema({
type:String,
name:String,
distance:Number,
duration:Number,
weight:Number,
sets:Number,
reps:Number,

})



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

 var connection=mongoose.createConnection("mongodb://localhost/fitness", {
  useNewUrlParser: true,
  useFindAndModify: false
 });
 let Exercises=connection.model("Exercises", schema)

 
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
  Exercises.create(req.body,(err, data)=>{
    connection.collection('Exercise').insertOne(data).then((result, err)=> {
      if (err){
        console.log(`ha you really thought: ${err}`)
      } else {
        console.log(`bruhhhhhhhhhhhhhhhh like if this happens i'll be so sad: ${result}`)
      }
    })
  })
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
