express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//Route management
const roomRoute = require('./routes/room');
const attendenceRoute = require('./routes/Attendance');
const authRoutes = require('./routes/auth')

app.use('/api/room', roomRoute);
app.use('/api/attendance', attendenceRoute);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log('server running on port ${PORT}'));