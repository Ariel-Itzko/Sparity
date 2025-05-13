import { Schema, model } from "mongoose";
import _ from 'lodash';

const UserProfile = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
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
    profile_image: {
        type: String,
        default: ''
    },
    user_prefer: {
        type: String,
        enum: ['creator', 'collaborator'],
        default: 'collaborator'
    }
}, { timestamps: true });


UserProfile.methods.toJSON = function () {
    const userProfileSchema = this;
    const userProfileObject = userProfileSchema.toObject();
    return _.pick(userProfileObject, [
        'first_name',
        'last_name',
        'user_id',
        'gender',
        'date_of_birth',
        'country',
        'is_demographic_updated',
        'profile_image',
        'user_prefer',
        'city',
        '_id'
    ])
};



const UserProfileModel = model('UserProfile', UserProfile);
export default UserProfileModel;
