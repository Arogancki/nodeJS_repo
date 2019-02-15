
const mongoose = require('mongoose')
    , log = require('../helpers/log')
    , config = require('../config')
    , statuses = require('../assets/reminderStatuses')
    , reminders = new mongoose.Schema({
        userId: {
            type: ObjectId,
            required: true
        },
        pleaces: [{
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                default: ''
            },
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
            tolerance: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                required: true,
                enum: statuses
            },
            statusChangeCallBack: {
                type: ObjectId,
                default: null
            },
            time: {
                created: {
                    type: Date,
                    default: Date.now
                },
                slept: [{
                    type: Date,
                    default: []
                }],
                done: {
                    type: Date,
                    default: Date.now
                }
            }
        }]
    })

const model = mongoose.model(config.REMINDERS_DATABASE_NAME, reminders)

module.exports = model