const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const { callPythonGeolocation, updateStudentLocation } = require('../services/geolocationService');

// Start attendance tracking
router.post('/start', auth, async (req, res) => {
  try {
    // Only teachers can start attendance
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can start attendance' });
    }

    const { roomId, radius } = req.body;
    
    // Get teacher's current location from request
    const targetLocation = req.body.location; // { lat, lng }

    // Call Python service
    const trackingData = {
      roomId,
      duration: 5, // 5 minutes
      targetLocation,
      radius: radius || 100 // default 100 meters
    };

    const trackingResults = await callPythonGeolocation(trackingData);
    
    // Save to database
    const attendance = new Attendance({
      roomId,
      date: new Date(),
      targetLocation,
      radius,
      students: [] // Will be populated as students check in
    });
    
    await attendance.save();
    
    res.json({
      message: 'Attendance tracking started',
      attendanceId: attendance._id,
      trackingData
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Student location update endpoint
router.post('/update-location', auth, async (req, res) => {
  try {
    // Only students can update location
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can update location' });
    }

    const { roomId, location } = req.body;
    
    // Forward to Python service
    await updateStudentLocation(roomId, req.user.id, location);
    
    res.json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;