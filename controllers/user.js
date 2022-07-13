const express = require("express");
const mongoose = require("mongoose");

const Student = require("../models/user");

const router = express.Router();

// Create and Save a new student
exports.create = async (req, res) => {
  console.log(req.body);
  const newstudent = new Student({
    name: req.body.name,
    roll: req.body.roll,
    registration: req.body.registration,
    subjects: req.body.subjects,
    created_on: req.body.created_on,
  });
  await newstudent
    .save()
    .then(() => {
      res.status(201).json(newstudent);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

// Retrieve all students from the database.
exports.getAll = async (req, res) => {
  try {
    const student = await Student.find();

    res.status(200).json(student);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Find a single student with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const stud = await Student.findOne({ id: id });
    res.status(200).json(stud);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  const roll = req.params.roll;
  try {
    await Student.findOneAndUpdate(
      {
        roll: roll,
      },
      {
        name: req.body.name,
        registration: req.body.registration,
        subjects: req.body.subjects,
        created_on: req.body.created_on,
      }
    );
    res.status(202).json({ roll: roll });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };

  try {
    await Student.findOneAndRemove({ details:details});
    res.status(203).json({ details:details });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};
