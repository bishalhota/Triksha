const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.post("/", async (req, res) => {
    try {
        const { teacherId, classname } = req.body;
        const room = new Room({
            teacherId,
            className: classname,
            active: true,
        })
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get('/teacher/:teacherId', async (req, res) => {
    try {
      const rooms = await Room.find({ teacherId: req.params.teacherId });
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;