const express = require("express");
const router = express.Router();

const SkillsInfo = require("../models/SkillsInfo");

router.post("/", async(req, res) => {
  try {
    const { username, skill } = req.body;
    const existingUser =await SkillsInfo.findOne({ username });
    if (!existingUser) {
      const newSkill = new SkillsInfo({ username, skills: [skill] });
      await newSkill.save();
      res.status(200).send({
        status: true,
        message: "Skill saved successfully"
      });
      console.log("SAVED SKILL");
    } else {
      const updateSkill =await SkillsInfo.findOneAndUpdate(
        { username },
        { $push: { skills: skill } },
        {new:true}
      ).exec();
      updateSkill.save();
      res.status(200).send({
        status: true,
        message: "Skill updated successfully"
      });
      console.log("UPDATED SKILL");
    }
  } catch (error) {
    console.log("Error in posting skills");
    console.log(error);
  }
});

router.post("/find", async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await SkillsInfo.findOne({ username: username });
    if (!existingUser) {
      return res.send({
        status: false,
        message: "User does not exist",
      });
    }

    const userSkills = await SkillsInfo.find({ username });
    res.status(200).send(userSkills);
  } catch (err) {
    console.log(err);
  }
});

module.exports=router;