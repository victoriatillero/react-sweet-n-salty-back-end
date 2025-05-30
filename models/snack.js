const mongoose = require('mongoose');

const snackSchema =mongoose.Schema({
    name:  {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: String,
    category: {
        type: String,
        enum: ['sweet', 'salty'],
        required: true
    },
    emoji: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
})
const Snack = mongoose.model('Snack', snackSchema);

module.exports = Snack;
