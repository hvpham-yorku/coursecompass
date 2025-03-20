import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /Courses.
const router = express.Router();

// This section will help you get a list of all the Courses.
router.get("/", async (req, res) => {
  let collection = await db.collection("Courses");
  let results = await collection.find().toArray();
  res.send(results).status(200);
});

// This section will help you get a single Courses by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Courses");
  let query = { _id: req.params.id};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new Courses.
router.post("/", async (req, res) => {
  try {
    let newDocument = req.body;
    let collection = await db.collection("Courses");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Courses");
  }
});

// this section takes mulptile courses and adds them to the database
router.post("/bulk", async (req, res) => {
  try {
    let newDocuments = req.body;
    let collection = await db.collection("Courses");
    let result = await collection.insertMany(newDocuments);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Courses");
  }
});

// This section will help you update a Courses by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("Courses");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating Courses");
  }
});

// This section will help you delete a Courses
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };

    const collection = db.collection("Courses");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting Courses");
  }
});

export default router;