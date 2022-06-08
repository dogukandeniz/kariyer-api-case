const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,

    },
    email   : {
        type: String,
        required: true,

    },
    policyNo: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true,

    },
    location: {
        type: String,
        required: true,
    },

},{
    timestamps: true
});

const User = mongoose.model('user', UserSchema);


module.exports = User;