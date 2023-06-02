const mongoose=require("mongoose");

const userinfoschema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    photoURL:{
        type:String,
    }

})

const model=mongoose.model('UserInfo',userinfoschema);
module.exports=model;