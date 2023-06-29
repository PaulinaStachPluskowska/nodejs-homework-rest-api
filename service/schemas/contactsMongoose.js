const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;