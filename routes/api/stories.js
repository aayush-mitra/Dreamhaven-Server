const express = require('express')
const User = require('../../models/User')
const Dream = require('../../models/Dream')
const Story = require('../../models/Story')
const mongoose = require('mongoose')
const router = express.Router();

router.post('/create-story', (req, res) => {
    const {userId, dreamId, title, content} = req.body;

    User.findOne({_id: userId}).then((user) => {
        if (!user) {
            return res.json({
                success: false,
                message: "Server Error1"
            })
        }

        Dream.findOne({_id: dreamId}).then((dream) => {
            if (!dream) {
                return res.json({
                    success: false,
                    message: "Server Error2"
                })
            }

            Story.create({
                user: user._id,
                dream: dream._id,
                title,
                content
            }).then(story => {
                return res.json({
                    success: true,
                    message: "Story Created",
                    story,
                    user,
                    dream
                })
            }).catch(err => {
                return res.json({
                    success: false,
                    message: "Server Error3"
                })
            })
        }).catch(err => {
            return res.json({
                success: false,
                message: "Server Error4"
            })
        })
    }).catch(err => {
        return res.json({
            success: false,
            message: "Server Error5"
        })
    })
})

router.get('/', (req, res) => {
    const {dreamId} = req.query;

    Story.findOne({dream: dreamId}).then(story => {
        
        if (!story) {
            return res.json({
                success: false,
                message: "No Story"
            })
        }

        return res.json({
            success: true,
            story
        })
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            message: "Server Error"
        })
    })
})

router.get('/all', async (req, res) => {
    try {
        const stories = await Story.find({})
            .populate('user')  // Populates 'user' field
            .populate('dream') // Populates 'dream' field
            .exec();
    
        if (!stories || stories.length === 0) {  // Checks if stories are found
            return res.json({
                success: false,
                message: 'No stories found'
            });
        }
    
        return res.json({
            success: true,
            stories
        });
    } catch (err) {
        console.error(err);  // Logs the error for debugging
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
})

module.exports = router; 