const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router()

//get all cars

router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Falied to get cars from the server" })
    })
})


//get car by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cars').where({ id })
    .then(([cars]) => {
      if (cars) {
        res.status(200).json(cars)
      } else {
        res.status(404).json({ message: "The car with the specified ID does not exist" })
      }
    })
})

// create new car
router.post('/', (req, res) => {
  const { make, model, mileage, VIN, } = req.body;
  if (!make || !model || !mileage || !VIN) {
    return res.status(400).json({ message: "Please provide the make model mileage and VIN for this car" })
  }
  db('cars').insert({ make: make, model: model, mileage: parseInt(mileage, 10), VIN: parseInt(VIN, 10) })
    .then(([car]) => {
      res.status(201).json(car)
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error saving this car to the database" })
    })
})




module.exports = router;