const express = require("express");
const router = express.Router();

 const questionRouter = require("./Question");
const answerRouter = require("./Answer"); //all answers will route thorugh this answer file
const userInfoRouter=require("./UserInfo")
const skillRouter=require("./Skills");


router.get("/", (req, res) => {
  res.send("this api is reserved ");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/userinfos",userInfoRouter);
router.use("/skills",skillRouter)


module.exports = router;