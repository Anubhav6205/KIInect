const express=require('express')
const router=express.Router();

const UserInfo=require('../models/UserInfo');

router.post("/",async(req,res)=>{
    try{
        const userInfo=await UserInfo(req.body);
        const {email}=await req.body;
        const existingUser=await UserInfo.findOne({email})
        if(existingUser)
        {
            return res.status(201).send({
                message:"User Exits"
            })
        }
        await userInfo.save();
        console.log(`User info saved: ${userInfo}`);
        res.status(200).send({
            status:true,
            message:"User info saved successfully"
        });

    }
    catch(error){
        console.log(`Unable to post user info:${error}`);
    }

})


router.get("/",async(req,res)=>{
    try{
        const userInfo=await UserInfo.find();
        console.log(`User info fetched: ${userInfo}`);
        res.status(200).send({
            status:true,
            message:"User info fetched successfully",
            data:userInfo
        });

    }
    catch(error){
        console.log(`Unable to fetch user info:${error}`);
    }

})
module.exports=router;