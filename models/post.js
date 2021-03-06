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
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
]
},
    {
        timestamps:true
    }
);
const post = mongoose.model('posts', postSchema);
module.exports = post;