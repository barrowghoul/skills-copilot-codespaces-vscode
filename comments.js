// Create web server
var express = require('express');
var router = express.Router();

// Connect to MongoDB
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/comments');

// Define Schema
var commentSchema = mongoose.Schema({
  Name: String,
  Comment: String
});

// Compile Schema into Model
var Comment = mongoose.model('Comment', commentSchema);

// Create a new comment
router.post('/comment', function(req, res, next) {
  var newComment = new Comment(req.body);
  newComment.save(function(err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

// Get all comments
router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) return console.error(err);
    console.log(comments);
    res.json(comments);
  });
});

// Delete a comment
router.delete('/comment/:id', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

// Update a comment
router.put('/comment/:id', function(req, res, next) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

module.exports = router;