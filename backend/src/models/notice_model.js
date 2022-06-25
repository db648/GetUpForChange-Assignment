const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
    {
        username : { type : String, required : true },
        user_id : { type : String, required : true },
        comment : { type : String, required : true },
        date : { type : String, required : true }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("Notice", NoticeSchema)