const {Schema,model,Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema({
    replyBody: {
        type:String
    },
    replyId: {
        type: Schema.Types.ObjectId,
        defalut: () => new Types.ObjectId()
    },
    writtenBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
})
const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

CommentSchema.virtual('replyCount').get(function(){
    return this.replies.length;
});

const Comment = model('Comment',CommentSchema
);
 module.exports = Comment;
