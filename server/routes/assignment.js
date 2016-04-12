var express = require('express');
var path = require('path');
var Assignment = require('../../models/assignment');

var router = express.Router();

// Add assignmnets
router.post('/add', function(req, res) {
  console.log('POST /assignment/add');
  console.log(req.body);
  var assignment = new Assignment({
    assignment_number: req.body.number,
    student_name: req.body.name,
    score: req.body.score
  });

  assignment.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('Assignment saved');
      res.sendStatus(200);
    }
  })
});

// Get and search for assignments
router.get('/get/:id?', function(req, res) {
  if(req.params.id) {
    Assignment.findById(req.params.id, function(err, assignment) {
      if(err) {
        console.log(err);
      } else {
        res.send(assignment);
      }
    })

  } else {
    Assignment.find({}, function (err, assignments) {
      if(err) {
        console.log('err');
        res.sendStatus(500);

      } else {
        res.send(assignments);
      }
    });
  }
});

// Delete assignments

router.delete('/delete/:id', function(req, res) {
  if(req.params.id) {
    Assignment.findByIdAndRemove(req.params.id, function(err) {
      if(err){
        console.log(err)
      }
    });
  } else {
    res.send('No id');
  }
});

module.exports = router;
