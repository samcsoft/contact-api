const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required:  true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Provide a name"]
    },
    phone: {
        type: String,
        required: [true, "Provide a contact phpne"]
    },
    address: {
        type: String,
        required: [true, "Provide a contact address"]
    },
    gender: {
        type: String,
        required: [true, "Provide your gender"]
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('contacts', contactSchema);