const { Schema, model } = require('mongoose');
import { isEmail } from 'validator';
// const validator = require('validator');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [ isEmail, 'invalid email'],
            // validate: [validator.isEmail, 'invalid email']
        },
        thoughts: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
 .virtual('friendCount')
 .get(function () {
    return this.friends.length;
 });

 const Users = model('users', userSchema);

 module.exports = Users;

