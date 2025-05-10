import mongoose from 'mongoose';
import _ from 'lodash';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    member_id: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        auth_token: {
            type: String,
            required: true,
        },
        refresh_token: {
            type: String,
            default: ''
        },
        auth_exp: {
            type: Date,
            required: true
        },
        refresh_exp: {
            type: Date,
            default: Date.now
        },
        created_At: {
            type: Date,
            default: Date.now
        }
    }],
    user_type: {
        type: Number,
        default: 0
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    reset_token: {
        type: String,
        default: ''
    },
    reset_token_expiry: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


UserSchema.methods.toJSON = function () {
    const userSchema = this;
    const userObject = userSchema.toObject();
    return _.pick(userObject, [
        'email',
        'is_email_verified',
        '_id'

    ])
};


const UserModel = model('User', UserSchema);
export default UserModel;

