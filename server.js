const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var path=require("path")
app.use(express.static(path.join(__dirname + '/views')))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/css'))

mongoose.connect("mongodb://localhost/fitness", {
  useNewUrlParser: true,
  useFindAndModify: false
});
app.get('/',(req,res)=>{
    res.sendFile("index.html")
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});