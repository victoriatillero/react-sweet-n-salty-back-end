const Snack = require('../models/snack.js');
const express= require('express');
const router = express.Router();

//CREATE - POST - /snacks
router.post('/', async (req,res) => {
    try {
        const createdSnack = await Snack.create(req.body);
        res.status(201).json(createdSnack); // 201 created
    } catch (err) {
        res.status(500).json({err: err.message});
    }

});

// READ - GET - /snacks
router.get('/', async (req,res) => {
    try{
        const foundSnacks = await Snack.find();
        res.status(200).json(foundSnacks); // 200 ok
    } catch (err) {
    res.status(500).json({err:err.message}) // 500 internal server error
    }
})
// READ - GET  - /snacks/:snackId
router.get('/:snackId', async (req,res) => {
    try {
        const foundSnack = await Snack.findById(req.params.snackId)
        // add error handling if a snack isn't found
        if (!foundSnack) {
            res.status(404);
            throw new Error('Snack not found');
        }
        res.status(200).json(foundSnack); // 200 ok
    } catch  (err) {
        if (res.statusCode === 404 ) {
            res.json({err:err.message});
        } else {
            // add else statement to handle all other errors
            res.status(500).json({err: err.message});
        }
    }
})
// DELETE- Delete - /snacks/:snackId
router.delete('/:snackId', async (req,res) => {
    try {
        const expiredSnack = await Snack.findByIdAndDelete(req.params.snackId)
        if (!expiredSnack) {
            res.status(404);
            throw new Error('Snack not found');
        }
        res.status(200).json({
            message: `${expiredSnack.name} removed from pantry.`
        });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({err:err.message});
        } else {
            res.status(500).json({err:err.message})
        }
    }
});

//UPDATE - PUT - /snacks/:snackId
router.put('/:snackId', async (req,res) => {
    // res.json({message: `Update route with the param ${req.params.snackId}`})
    try {
        const updatedSnack = await Snack.findByIdAndUpdate(req.params.snackId, req.body, {
        new: true,
        });
        if (!updatedSnack) {
            res.status(404);
            throw new Error('Snack not in pantry')
        }
        res.status(200).json(updatedSnack); 
    }catch (err) {
        if (res.statusCode === 404) {
            res.json({err:err.message});
        } else {
            res.status(500).json({err:err.message})
        }
    }
});

module.exports = router;
