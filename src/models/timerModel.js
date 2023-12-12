const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timerSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    time: {
        type: Float,
        required: true,
    },
});

module.exports = mongoose.model("Timer", timerSchema);