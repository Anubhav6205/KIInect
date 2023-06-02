const mongoose = require("mongoose");

const answerschema = new mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  //for adding image along with answer
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions"
  },
  createdAt: {
    type: Date,
    default: Date.now() //present date is added automatically
  },
  user: Object,
});

const model = mongoose.model("Answers", answerschema);
module.exports = model;
