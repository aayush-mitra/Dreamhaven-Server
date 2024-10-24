const express = require('express')
const User = require('../../models/User')
const Dream = require('../../models/Dream')
const Story = require('../../models/Story')
const mongoose = require('mongoose')
const router = express.Router();

router.post('/create', (req, res) => {
    const {dateString, userId} = req.body;

    User.findOne({_id: userId}).then(user => {
        if (!user) {
            return res.json({
                success: false,
                message: "Error: Server Error"
            });
        }

        if (user.dreams.includes(dateString)) {
            return res.json({
                success: false,
                message: "Error: Date Dream Already Created"
            });
        }
 
        Dream.create({
            dateString,
            user: user._id,
            description: ""
        }).then(dream => {
            user.dreams.push(dateString)
            user.save().then(user1 => {
                return res.json({
                    success: true,
                    message: "Dream Created",
                    dream,
                    user: user1
                })
            }).catch(err => {
                return res.json({
                    success: false,
                    message: "Error: Server Error"
                });
            })
            

        }).catch(err => {
            return res.json({
                success: false,
                message: "Error: Server Error"
            });
        })
    }).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error"
        });
    })
})

router.get('/get', (req, res) => {
    const {userId, dateString} = req.query;

    User.findOne({_id: userId}).then(user => {
        if (!user) {
            return res.json({
                success: false,
                message: "Error: Server Error"
            });
        }

        if (!user.dreams.includes(dateString)) {
            return res.json({
                success: false,
                message: "Error: Dream not created"
            });
        }

        Dream.findOne({dateString, user: user._id}).then(dream => {
            if (!dream) {
                return res.json({
                    success: false,
                    message: "Error: Server Error"
                });
            }

            return res.json({
                success: true,
                user,
                dream
            })
        }).catch(err => {
            return res.json({
                success: false,
                message: "Error: Server Error"
            });
        })
    }).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error"
        });
    })
})

router.post('/edit-content', (req, res) => {
    const {description, dreamId} = req.body;
    console.log(req.body)
    Dream.findOne({_id: dreamId}).then(dream => {
        if (!dream) {
            return res.json({
                success: false,
                message: "Error: Server Error 1"
            });
        }

        dream.description = description;
        dream.save().then(dream1 => {
            return res.json({
                success: true,
                dream: dream1
            })
        }).catch(err => {
            return res.json({
                success: false,
                message: "Error: Server Error 2"
            });
        })
    }).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error 3"
        });
    })
})

router.post('/questions', (req, res) => {
    const {dreamId, payload} = req.body;

    Dream.findOne({_id: dreamId}).then(dream => {
        if (!dream) {
            return res.json({
                success: false,
                message: "Error: Server Error"
            });
        }

        dream.startTime = payload.startTime
        dream.endTime = payload.endTime
        dream.dreamLength = payload.dreamLength
        dream.lucidity = payload.lucidity
        dream.mood = payload.mood
        dream.vividness = payload.vividness
        dream.characters = payload.characters
        dream.location = payload.location
        dream.themes = payload.themes
        dream.repetition = payload.repetition
        dream.quality = payload.quality

        dream.save().then(dream1 => {
            return res.json({
                success: true,
                dream: dream1
            })
        }).catch(err => {
            return res.json({
                success: false,
                message: "Error: Server Error"
            });
        })
    }).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error"
        });
    })
})


module.exports = router; 