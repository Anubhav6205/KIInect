const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

router.post("/", async (req, res) => {
  try {
    const answer = await Answer(req.body);
    await answer.save();
    console.log("Answer saved");
    res.status(200).send({
      status: true,
      message: "Answer saved successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: false,
      message: "Error while adding answers"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const answer = await Answer.find();
    console.log(answer);
    res.status(200).json({
      status: true,
      message: "Answers fetched successfully"
    });
  } catch (e) {
    console.log(`Unable to fetch answers:${e.message}`);
  }
});

module.exports = router;
