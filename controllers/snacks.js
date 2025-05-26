const Snack = require('../models/snack.js');
const express= require('express');
const verifyToken = require('../middleware/verify-token');
const router = express.Router();

//CREATE - POST - /snacks
router.post('/', verifyToken, async (req,res) => {
    try {
        const createdSnack = await Snack.create({
            ...req.body,
            createdBy: req.user._id,
        });
        res.status(201).json(createdSnack); // created 201
    } catch (err) {
        res.status(500).json({err: err.message});
    }
    console.log("REQ.USER:",req.user);
});

// READ - GET - /snacks
router.get('/', async (req,res) => {
    try{
        const foundSnacks = await Snack.find();
        res.status(200).json(foundSnacks);
    } catch (err) {
    res.status(500).json({err:err.message})
    }
})
router.get('/my-snacks', verifyToken, async (req, res) => {
  try {
    const snacks = await Snack.find({ createdBy: req.user._id });
    res.status(200).json(snacks);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// READ - GET  - /snacks/:snackId
router.get('/:snackId', async (req,res) => {
    try {
        const foundSnack = await Snack.findById(req.params.snackId)
        if (!foundSnack) {
            res.status(404);
            throw new Error('Snack not found');
        }
        res.status(200).json(foundSnack);
    } catch  (err) {
        if (res.statusCode === 404 ) {
            res.json({err:err.message});
        } else {
            res.status(500).json({err: err.message});
        }
    }
});

// DELETE- Delete - /snacks/:snackId
router.delete('/:snackId', verifyToken, async (req,res) => {
    try {
        const badSnack = await Snack.findByIdAndDelete(req.params.snackId)
        if (!badSnack) {
            res.status(404);
            throw new Error('Snack not found');
        }
        if (badSnack.createdBy.toString() !== req.user._id) {
            return res.status(403).json({err: 'Unauthorized to edit this snack'});
        }
        await badSnack.deleteOne();
        res.status(200).json({
            message: `${badSnack.name} removed from pantry.`
        });
    } catch (err) {
        if (res.statusCode === 404|| res.statusCode === 403) {
            res.json({err:err.message});
        } else {
            res.status(500).json({err:err.message})
        }
    }
});

// UPDATE - PUT - /snacks/:snackId
router.put('/:snackId', verifyToken, async (req, res) => {
    try {
        const existingSnack = await Snack.findById(req.params.snackId);
        if (!existingSnack) {
            res.status(404);
            throw new Error('Snack not in pantry');
        }

        if (existingSnack.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ err: 'Unauthorized' });
        }

        const updatedSnack = await Snack.findByIdAndUpdate(req.params.snackId, req.body, {
            new: true,
        });

        res.status(200).json(updatedSnack);
    } catch (err) {
        if (res.statusCode === 404 || res.statusCode === 403) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

module.exports = router;
