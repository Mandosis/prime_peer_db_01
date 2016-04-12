var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  assignment_number: {
    type: Number,
    required: true,
    unique: false
  },
  student_name: {
    type: String,
    required: true,
    unique: false
  },
  score: {
    type: Number,
    required: true,
    unique: false
  },
  date_completed: {
    type: Date,
    default: Date.now,
    required: true,
    unique: false
  }
});

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
