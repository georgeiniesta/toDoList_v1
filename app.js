const express = require('express')
const bodyParser = require('body-parser')
// require module date
const date = require(__dirname + '/date.js');
// console.log(date)

const app = express()
// Using ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
// ref the main folder with css file
app.use(express.static("public"))

const items = [];
const workItems = []

app.get("/", function(req, res) {
  let day = date.getDate()
  res.render("list", {listTitle: day,newListItems: items})
})
// handling POST request
app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item)
  res.redirect("/work")
})
app.get("/about", function(req, res){
  res.render("about")
})


const port = 3000;
app.listen(port, function() {
  console.log("Server running in port " + port)
})
