const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

router.post("/", async (req, res) => {
  console.log(req.body); //req.body is the data sent from frontend
  try {
    const question = await new Question(req.body);
    await question
      .save()
      .then(() => {
        console.log("Question saved");
        res.status(200).send({
          status: true,
          message: "Question saved successfully"
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send({
          status: false,
          message: "Question not saved"
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "error while adding questions"
    });
  }
});

// lookup and pipeline is used to join two collections in mongodb
// router.get('/',async(req,res)=>{
//   try{
//     const questions=await Question.find();
//     console.log(questions);
//     res.status(201).json({
//       status:true,
//       message:"Questions fetched successfully"
//     })

//   }
//   catch(e){
//     console.log(`Unable to fetch questions:${e.message}`);
//   }
// })

router.get("/", async (req, res) => {
  try {
    await Question.aggregate([
      {
        //$lookup stage in the aggregation pipeline that performs a left outer join on the answers collection
        $lookup: {
          from: "answers", //this is the name of collection to join with question collection
          localField: "_id", //field from input document
          foreignField: "questionId", // field from answers collection
          as: "allAnswers" // this stores all the answers as an array
        }
      }
    ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get questions details"
        });
      });
  } catch (e) {
    console.log(`Unable to fetch questions:${e.message}`);
  }
});

router.post("/search", async (req, res) => {
  try {
    const { searchTerm } = req.body;
    console.log(searchTerm);
    const data = await Question.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "allAnswers"
        }
      },
      {
        $match: {
          questionName: {
            $regex: new RegExp(`^${searchTerm}`, "i")
          }
        }
      }
    ]).exec();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send("Error");
  }
});

router.patch("/:id/:voteType", async (req, res) => {
  const { id, voteType } = req.params;
  try {
    let question = await Question.findById(id);
    if (!question) {
      return res
        .status(404)
        .json({ status: false, message: "Question not found" });
    }
    if (voteType === "upvote") {
      question.upvotes += 1;
      question.downvotes = Math.max(0, question.downvotes - 1); // reset downvotes to 0 if upvote is clicked again
    } else if (voteType === "downvote") {
      question.downvotes += 1;
      question.upvotes = Math.max(0, question.upvotes - 1); // reset upvotes to 0 if downvote is clicked again
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid vote type" });
    }
    await question.save();
    res
      .status(200)
      .json({ status: true, message: "Vote updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

module.exports = router;
