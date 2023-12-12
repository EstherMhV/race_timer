const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timerSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    timer: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Timer", timerSchema);
