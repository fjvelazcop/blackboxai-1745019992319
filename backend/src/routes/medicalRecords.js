const express = require('express');
const { MedicalRecord } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MedicalRecords
 *   description: Medical record management endpoints
 */

/**
 * @swagger
 * /api/medical-records:
 *   get:
 *     summary: Get all medical records (admin only)
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of medical records
 */
router.get('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const records = await MedicalRecord.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medical records' });
  }
});

/**
 * @swagger
 * /api/medical-records/{id}:
 *   get:
 *     summary: Get medical record by ID
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical record ID
 *     responses:
 *       200:
 *         description: Medical record data
 *       404:
 *         description: Medical record not found
 */
router.get('/:id', authenticateToken, authorizeRoles('admin', 'doctor', 'patient'), async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Medical record not found' });
    // Authorization: patients can only access their own records
    if (req.user.role === 'patient' && req.user.id !== record.patientId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medical record' });
  }
});

/**
 * @swagger
 * /api/medical-records:
 *   post:
 *     summary: Create a new medical record
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rifInitial:
 *                 type: string
 *               cedula:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               mobilePhone:
 *                 type: string
 *               email:
 *                 type: string
 *               birthPlace:
 *                 type: string
 *               address:
 *                 type: string
 *               medicalHistory:
 *                 type: string
 *               allergies:
 *                 type: string
 *               consultationReason:
 *                 type: string
 *               physicalExam:
 *                 type: string
 *               vitalSigns:
 *                 type: string
 *               medicalIndicationsNonPharma:
 *                 type: string
 *               medicalIndicationsPharma:
 *                 type: string
 *               labOrders:
 *                 type: string
 *               imagingOrders:
 *                 type: string
 *               medicalReferrals:
 *                 type: string
 *               examResults:
 *                 type: string
 *               diagnosis:
 *                 type: string
 *               observations:
 *                 type: string
 *               patientId:
 *                 type: string
 *               doctorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medical record created
 */
router.post('/', authenticateToken, authorizeRoles('admin', 'doctor'), async (req, res) => {
  try {
    const record = await MedicalRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    console.error('Error creating medical record:', error);
    res.status(500).json({ message: 'Error creating medical record' });
  }
});

/**
 * @swagger
 * /api/medical-records/{id}:
 *   put:
 *     summary: Update a medical record
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Medical record updated
 *       404:
 *         description: Medical record not found
 */
router.put('/:id', authenticateToken, authorizeRoles('admin', 'doctor'), async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Medical record not found' });

    await record.update(req.body);
    res.json(record);
  } catch (error) {
    console.error('Error updating medical record:', error);
    res.status(500).json({ message: 'Error updating medical record' });
  }
});

/**
 * @swagger
 * /api/medical-records/{id}:
 *   delete:
 *     summary: Delete a medical record
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical record ID
 *     responses:
 *       204:
 *         description: Medical record deleted
 *       404:
 *         description: Medical record not found
 */
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Medical record not found' });

    await record.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting medical record:', error);
    res.status(500).json({ message: 'Error deleting medical record' });
  }
});

module.exports = router;
