const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect(
        "mongodb+srv://durga:durga_123@cluster0.ppkiq.mongodb.net/getupforchange?retryWrites=true&w=majority"
    )
}