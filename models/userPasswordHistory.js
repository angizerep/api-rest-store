'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const Schema = mongoose.Schema

const UserPasswordHistorySchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'User is required'
    },
    password: {
        type: String,
        // select: false
    },
    created_at: {
        type : Date,
        default: Date.now
    },
    updated_at: {
        type : Date,
        default: Date.now
    },
    active: {
        type : Boolean,
        default: true
    }
// },
// {
//     toJSON: {
//         transform(doc, ret) {
//         delete ret.password;
//         delete ret.__v;
//         },
//     },
})

UserPasswordHistorySchema.pre('save', function(next) {
    let userPassword = this
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()
        bcrypt.hash(userPassword.password, salt, null, (err, hash) =>{
            if (err) return next(err)
            userPassword.password = hash
            next();
        })
    })
})

module.exports = mongoose.model('UserPasswordHistory', UserPasswordHistorySchema )
