const { ObjectId } = require('mongoose').Types;
const { Users, Thought } = require('../models');

module.exports = {
    //Get all Users
    getUsers(req,res) {
        Users.find()
         .then((users) => res.json(users))
         .catch((err) => res.status(500).json(err));
    },
    // Get single user 
    getSingleUser(req,res) {
        Users.findOne({ _id: req.params.userId })

    }
}