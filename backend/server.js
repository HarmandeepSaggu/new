const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const alumniRoutes = require('./routes/alumniRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/alumni', alumniRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));