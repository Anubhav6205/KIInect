const mongoose=require('mongoose');

const questionschema=new mongoose.Schema({
    questionName:{
        type:String,
        required:true,
    },
    //for adding image along with question
    questionUrl:{
        type:String

    },
    createdAt:{
        type:Date,
        default:Date.now()//present date is added automatically
    },
    answers:{
        type:mongoose.Schema.Types.ObjectId, //used to refer to the id of the answers
        ref:"Answers"
    },
    user: Object,
    upvotes:{
        type:Number,
        default:0
    },
    downvotes:{
        type:Number,
        default:0
    }
})

const model=mongoose.model("Questions",questionschema);
module.exports=model;