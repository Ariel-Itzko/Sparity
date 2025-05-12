import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PostResponseSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'UserPost',
        required: true,
        index: true
    },
    resp_users: [
        {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: 'UserProfile',
                required: true
            },
            status: {
                type: String,
                enum: ['Accepted', 'Rejected', 'Pending'],
                default: 'Pending'
            },
            responded_at: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const PostResponseModel = model('PostResponse', PostResponseSchema);
export default PostResponseModel;