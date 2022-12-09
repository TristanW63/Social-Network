const { Users, Thought } = require("../models");
const { json } = require("express");

module.exports = {
  //Get all Users
  getUsers(req, res) {
    Users.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get single user
  getSingleUser(req, res) {
    Users.findOne({_id: req.params.userId})
    .populate("thoughts")
    .then((userData) => 
    !userData
    ? res.status(404).json({message: 'No user found with ID'})
    : res.json(userData)
    )
    .catch((err) => res.status(500).json(err));
},

  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    Users.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {new: true}
    )
    .then((userData) => 
    !userData
    ? res.status(404).json({message: 'No friend with ID'})
    : res.json(userData)
    )
    .catch((err) => res.status(500).json(err));
},

  removeFriend(req, res) {
    console.log('You deleted a friend');
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {friends: req.params.friendId } },
      { new: true }
    )
    .then((user) =>
    !user
    ? res.status(404).json({ message: 'No friend found with that ID'})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

};
