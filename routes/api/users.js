const express = require('express')
const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        success: true
    })
})

router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    User.findOne({email}).then(user => {
        if (user) {
            res.status(400);
            return res.json({
                success: false,
                message: "Error: User Exists"
            });
        }

        User.create({
            name,
            email,
            password
        }).then(user => {

            UserSession.create({
                user: user._id
            }).then(session => {
                return res.json({
                    success: true,
                    user: user,  
                    message: "Registered",
                    token: session._id              
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
        });
    }).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error"
        });
    })
})

router.post('/login', (req, res) => {
    let {email, password} = req.body;

    email = email.toLowerCase()

    User.findOne({email}).then(
        user => {
            if (!user) {
                return res.json({
                    success: false,
                    message: "Error: Invalid Credentials"
                });
            }

            if (!user.matchPasswords(password)) {
                return res.json({
                    success: false,
                    message: "Invalid Credentials"
                })
            }

            UserSession.create({
                user: user._id
            }).then(session => {
                return res.json({
                    success: true,
                    user: user,  
                    message: "Logged In",
                    token: session._id              
                })
            }).catch(err => {
                return res.json({
                    success: false,
                    message: "Error: Server Error"
                });
            })
        }
    ).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error"
        });
    })
})

router.get('/logout', (req, res) => {
    const {token} = req.query;

    UserSession.deleteOne({_id: token}).then(() => {
        return res.json({
            success: true,
            message: "Logged Out"
        })
    }).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error"
        });
    })
})

router.get('/verify', (req, res) => {
    const {token} = req.query;

    UserSession.findOne({_id: token}).then(session => {
        if (!session) {
            return res.json({
                success: false,
                message: "Error: Invalid Token"
            });
        }
        
        User.findOne({_id: session.user}).then(user => {
            return res.json({
                success: true,
                message: "Valid",
                user
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
    const {userId} = req.query;

    User.findOne({_id: userId}).then(user => {
        if (!user) {
            return res.json({
                success: false,
                message: "Error: Server Error"
            });
        }
        return res.json({
            success: true,
            user
        })
    }).catch(err => {
        return res.json({
            success: false,
            message: "Error: Server Error"
        });
    })
})

module.exports = router; 