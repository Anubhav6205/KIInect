const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://Collapmp3:collab123@cluster0.owjvkr5.mongodb.net/test";

mongoose
  .connect(MONGO_URI, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
