import { Schema, model } from "mongoose";

const roomMemberSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'UserPost',
        required: true,
        unique: true
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true,
    },
    participants: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'UserProfile'
        },
        joined_at: {
            type: Date,
            default: Date.now

        }
    }]

}, { timestamps: true });


const RoomMemberModel = model('RoomMember', roomMemberSchema);
export default RoomMemberModel;

