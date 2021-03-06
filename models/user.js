'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
	name:   {
		type: String,
		required: 'Name is required'
	},
    lastname:   {
		type: String,
		required: 'Lastname is required'
	},
    displayName:   {
		type: String,
		unique: true,
		required: 'DisplayName is required'
	},
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    avatar : String,
    singUpDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date,
    active: {
        type : Boolean,
        default: true
    },
    statusDeleted: {
        type : Boolean,
        default: false
    }
},
{
    toJSON: {
        transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        },
    },
})

UserSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema )
