const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const doctorRoutes = require('./doctors');
const medicalRecordRoutes = require('./medicalRecords');

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/medical-records', medicalRecordRoutes);

module.exports = router;
