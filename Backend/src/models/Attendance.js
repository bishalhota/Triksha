// models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Room'
  },
  date: {
    type: Date,
    required: true
  },
  students: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    present: {
      type: Boolean,
      required: true
    },
    locations: [{
      lat: Number,
      lng: Number,
      timestamp: Date,
      withinRange: Boolean
    }]
  }]
});

module.exports = mongoose.model('Attendance', AttendanceSchema);