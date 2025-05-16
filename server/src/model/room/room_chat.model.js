import { Schema, model } from "mongoose";


const roomChatSchema = new Schema({
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'RoomMember',
        required: true,
        unique: true
    },
    messages: [{
        sender_id: {
            type: Schema.Types.ObjectId,
            ref: 'UserProfile',
            required: true
        },
        message_text: {
            type: String,
            required: true,
            trim: true,
        },
        send_at: {
            type: Date,
            default: Date.now,
        }
    }]
}, { timestamps: true });


const RoomChatModel = model('RoomChat', roomChatSchema);
export default RoomChatModel;

