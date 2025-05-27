import { Schema, model } from "mongoose";
import _ from 'lodash';

const UserProfile = new Schema({
    // Auto
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User',
        unique: true
    },
    // First Auth and register
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        unique: true,
        required: true,
    },
    is_user_name_set: {
        type: Boolean,
        default: false,
    },
    // demographic 
    gender: {
        type: String,
        default: ''
    },
    date_of_birth: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    is_demographic_updated: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    user_prefer: {
        type: String,
        enum: ['creator', 'advertiser', 'both'],
        default: 'advertiser'
    },
    // default 
    profile_image: {
        type: String,
        default: 'https://res.cloudinary.com/dqdrqdxt2/image/upload/v1747059503/htlhuod5nmv8qvk6twzh.jpg'
    },
    is_deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const UserProfileModel = model('UserProfile', UserProfile);
export default UserProfileModel;
