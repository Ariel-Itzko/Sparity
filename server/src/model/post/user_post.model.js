import { Schema, model } from 'mongoose';

const UserPostSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_text: {
        type: String,
        required: true,
    },
    post_heading: {
        type: String,
        required: true,
    },
    required_skills: {
        type: [
            {
                skill_name: {
                    type: String,
                    required: true
                }
            }
        ],
        validate: {
            validator: function (val) {
                return val.length >= 2;
            },
            message: "Please add at least 2 skills"
        }
    },
}, { timestamps: true });

const UserPostModel = model('UserPost', UserPostSchema);
export default UserPostModel;
