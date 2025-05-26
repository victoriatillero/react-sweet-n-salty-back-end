const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');

const User = require('../models/User');
router.get('/:userId', verifyToken, async (req,res) => {
    try {
        // If the user is looking for the details of another user, block the request
            //  send 403SC to indicate user is unauthorized
        if (req.user._id.toString() !== req.params.userId){
            return res.status(403).json({ err: "Unauthorized"});
        }
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({err:'User not found /:'})
        }
        res.json({ user })
    }catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// verifyToken() is called before the async controller function, to ensure that only authent. users can access routes. Unverified user will see an invalid token msg.
router.get('/', verifyToken, async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
