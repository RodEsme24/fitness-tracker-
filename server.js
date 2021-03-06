const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
let Schema = mongoose.Schema
let subschema = new Schema({
  type: String,
  name: String,
  distance: Number,
  duration: Number,
  weight: Number,
  sets: Number,
  reps: Number,
})
let schema = new Schema({
  day: Date,
  exercises: [subschema]

})



const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'))



app.use(express.urlencoded({ extended: true }));
app.use(express.json());



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fitness", { useNewUrlParser: true, useUnifiedTopology: true });
let Workout = mongoose.model("fitness", schema)




app.get('/', (req, res) => {
  var filePath = "./public/index.html"
  var resolvedPath = path.resolve(filePath);
  res.sendFile(resolvedPath)
})

app.get('/exercise', (req, res) => {
  var filePath = "./public/exercise.html"
  var resolvedPath = path.resolve(filePath);
  res.sendFile(resolvedPath)
})

app.get('/stats', (req, res) => {
  var filePath = "./public/stats.html"
  var resolvedPath = path.resolve(filePath);
  res.sendFile(resolvedPath)
})

app.post('/api/workouts', (req, res) => {
  Workout.create({}).then(result => {
    res.json(result)
  }).catch(err => {
    console.log(err)
  })
  }
)



app.put('/api/workouts/:id', (req, res) => {
  let id = req.params.id
  console.log(id)
  Workout.findById(id, (err, result) => {
    console.log(`first result: ${result}`)
    let prevExercises = result.exercises
    Workout.findOneAndUpdate({ _id: id }, { $set: { exercises: [...prevExercises, req.body] } }, {}, (err, result) => {
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
