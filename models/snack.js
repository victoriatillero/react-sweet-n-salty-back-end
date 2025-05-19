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
})
const Snack = mongoose.model('Snack', snackSchema);

module.exports = Snack;
