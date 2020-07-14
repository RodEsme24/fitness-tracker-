const express = require("express");
const mongoose = require("mongoose");
let Schema=mongoose.Schema
let subschema=new Schema({
  type:String,
  name:String,
  distance:Number,
  duration:Number,
  weight:Number,
  sets:Number,
  reps:Number,
})
let schema=new Schema({
day:Date,
  exercises:[subschema]


})



const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var bodyParser = require('body-parser')
// var path=require("path")
// app.use(bodyParser.json())

// app.use(express.static(__dirname + '/public'))
// app.use(express.static(__dirname + '/public/css/'))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fitness", { useNewUrlParser: true, useUnifiedTopology: true });
 let Workout=connection.model("Exercise", schema)



 
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

app.get('/stats', (req, res) => {
  var filePath = "./views/stats.html"
  var resolvedPath = path.resolve(filePath);
  res.sendFile(resolvedPath)
})

app.post('/api/workouts', (req, res) => {
  let profit={
    day:new Date(),
    exercises:[req.body]
  }
  Workout.create(profit, (err, data) => {
    connection.collection('Workout').insertOne(data).then((result, err) => {
    if (err){
    console.log(`ha you really thought: ${err}`)
    } 
    console.log(result.ops[0])
    res.send(result.ops[0])
    })
  })
})


app.put('/api/workouts/:id', (req, res) => {
  let id = req.params.id
  console.log(id)
  Workout.findById(id, (err, result) => {
    console.log(`first result: ${result}`)
    let prevExercises = result.exercises
    Workout.findOneAndUpdate({_id: id}, { $set: { exercises: [...prevExercises, req.body] }}, {}, (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(`second result: ${result}`)
      res.json(result)
    })
  })
})

app.get('/api/workouts', (req, res) => {
  Workout.find({}, {}, {}, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.json(result)
  })
})

app.get('/api/workouts/range', (req, res) => {
  Workout.find({}, {}, {}, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.json(result)
  })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
