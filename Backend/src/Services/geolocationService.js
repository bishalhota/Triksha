const axios = require('axios');

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';

const callPythonGeolocation = async (data) => {
  try {
    const response = await axios.post(`${PYTHON_SERVICE_URL}/start_tracking`, data);
    return response.data;
  } catch (error) {
    console.error('Error calling Python service:', error);
    throw new Error('Geolocation service unavailable');
  }
};

const updateStudentLocation = async (roomId, studentId, location) => {
  try {
    await axios.post(`${PYTHON_SERVICE_URL}/update_location`, {
      roomId,
      studentId,
      location
    });
  } catch (error) {
    console.error('Error updating student location:', error);
  }
};

module.exports = {
  callPythonGeolocation,
  updateStudentLocation
};