const mongoose=require('mongoose');

const skillsinfoschema=new mongoose.Schema({
    username:{
        type:String,
    
    },
    skills:{
        type:[String],
        default:[]
    }
})

const model=mongoose.model('Skills',skillsinfoschema);
module.exports=model;