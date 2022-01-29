const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
},
    {
        timestamps:true
    }
);
const posts = mongoose.model('posts', postSchema);
module.exports = posts;