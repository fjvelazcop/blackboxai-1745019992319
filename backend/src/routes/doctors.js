const express = require('express');
const { Doctor, User } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();
const path = require('path');
const fs = require('fs');

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management endpoints
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor data
 *       404:
 *         description: Doctor not found
 */
router.get('/:id', authenticateToken, authorizeRoles('admin', 'doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor' });
  }
});

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rifInitial:
 *                 type: string
 *               rif:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               mppsNumber:
 *                 type: string
 *               medicalLicenseNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               phones:
 *                 type: string
 *               specialty:
 *                 type: string
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               signature:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Doctor created
 */
router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const {
      rifInitial,
      rif,
      firstName,
      lastName,
      mppsNumber,
      medicalLicenseNumber,
      email,
      phones,
      specialty,
      gender,
      address,
      userId,
    } = req.body;

    let logoUrl = null;
    let signatureUrl = null;

    if (req.files) {
      if (req.files.logo) {
        const logo = req.files.logo;
        const logoPath = path.join(__dirname, '../../uploads/logos', logo.name);
        await logo.mv(logoPath);
        logoUrl = `/uploads/logos/${logo.name}`;
      }
      if (req.files.signature) {
        const signature = req.files.signature;
        const signaturePath = path.join(__dirname, '../../uploads/signatures', signature.name);
        await signature.mv(signaturePath);
        signatureUrl = `/uploads/signatures/${signature.name}`;
      }
    }

    const doctor = await Doctor.create({
      rifInitial,
      rif,
      firstName,
      lastName,
      mppsNumber,
      medicalLicenseNumber,
      email,
      phones,
      specialty,
      gender,
      address,
      logoUrl,
      signatureUrl,
      userId,
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Error creating doctor' });
  }
});

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update a doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rifInitial:
 *                 type: string
 *               rif:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               mppsNumber:
 *                 type: string
 *               medicalLicenseNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               phones:
 *                 type: string
 *               specialty:
 *                 type: string
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               signature:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Doctor updated
 *       404:
 *         description: Doctor not found
 */
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const {
      rifInitial,
      rif,
      firstName,
      lastName,
      mppsNumber,
      medicalLicenseNumber,
      email,
      phones,
      specialty,
      gender,
      address,
    } = req.body;

    let logoUrl = doctor.logoUrl;
    let signatureUrl = doctor.signatureUrl;

    if (req.files) {
      if (req.files.logo) {
        const logo = req.files.logo;
        const logoPath = path.join(__dirname, '../../uploads/logos', logo.name);
        await logo.mv(logoPath);
        logoUrl = `/uploads/logos/${logo.name}`;
      }
      if (req.files.signature) {
        const signature = req.files.signature;
        const signaturePath = path.join(__dirname, '../../uploads/signatures', signature.name);
        await signature.mv(signaturePath);
        signatureUrl = `/uploads/signatures/${signature.name}`;
      }
    }

    await doctor.update({
      rifInitial,
      rif,
      firstName,
      lastName,
      mppsNumber,
      medicalLicenseNumber,
      email,
      phones,
      specialty,
      gender,
      address,
      logoUrl,
      signatureUrl,
    });

    res.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Error updating doctor' });
  }
});

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       204:
 *         description: Doctor deleted
 *       404:
 *         description: Doctor not found
 */
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    await doctor.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Error deleting doctor' });
  }
});

module.exports = router;
