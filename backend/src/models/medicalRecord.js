const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MedicalRecord = sequelize.define('MedicalRecord', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Patient Basic Data
    rifInitial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: false,
    },
    mobilePhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    birthPlace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Internal Medical Record Sections
    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    consultationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    physicalExam: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vitalSigns: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicalIndicationsNonPharma: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicalIndicationsPharma: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    labOrders: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imagingOrders: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicalReferrals: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    examResults: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return MedicalRecord;
};
