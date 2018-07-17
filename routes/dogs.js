const express = require("express");
const dogsRoutes = express.Router();
const Dog = require("../models/Dog");
const multer = require('multer');
const upload = multer({ dest: "uploads/" });


dogsRoutes.get("/new", (req, res, next) => {
  res.render("dog/new");
});

dogsRoutes.post("/new", upload.single('photo'), (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  const photo = req.file.path;
  const owner = req.body.owner;
  const breed = req.body.breed;
  const size = req.body.size;
  const description = req.body.description;
  const location = req.body.location;
  if (
    name === "" ||
    age === "" ||
    photo === "" ||
    owner === "" ||
    breed === "" ||
    size === ""||
    description === "" ||
    location === ""
  ) {
    res.render("dog/new", {
      message: "Please fill all the flields"
    });
    return;
  }

  Dog.findOne({ name }, "name", (err, user) => {
    const newDog = new Dog({
      name,
      age,
      photo,
      owner,
      breed,
      size,
      description,
      location
    });
      console.log(newDog)
    newDog.save(err => {
      if (err) {
        console.log(err);
        res.render("dog/new", { message: "Something went wrong" });
      } else {
        res.redirect("dog/list");
      }
    });
  });
});

module.exports = dogsRoutes;
