const express = require('express');
const User = require('../models/user');
const multer = require('multer');
const router = express.Router()

module.exports = router;

router.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/users/:nameSurname', async (req, res) => {
    try{
        const users = await User.find({$or:[{'firstName':req.params.nameSurname},{'lastName': req.params.nameSurname} ]});
        res.json(users)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/users', async (req, res) => {
    var storage	= multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname );
        }
      });
    var upload = multer({ storage : storage }).single('image');

    upload(req,res, async function(err) {
        const base64Img = require('base64-img')
        
        const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        image: base64Img.base64Sync(req.file.path)
    })
    try {
        const dataToSave = await user.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
    });
})

router.put('/users/:id', async (req, res) => {
    var storage	= multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname );
        }
      });
    var upload = multer({ storage : storage }).single('image');

    upload(req,res, async function(err) {
        try {
            const id = req.params.id;
            const updatedUser = req.body;
            const options = { new: true };

            const base64Img = require('base64-img')
            if (req.file) {
                updatedUser['image'] = base64Img.base64Sync(req.file.path)
            }
            const result = await User.findByIdAndUpdate(
                id, updatedUser, options
            )
            res.status(200).json(result)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    });
})

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id)
        res.send(`Document with ${user.firstName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
