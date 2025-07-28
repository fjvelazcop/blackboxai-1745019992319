const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const DoctorModel = require('./doctor');
const MedicalRecordModel = require('./medicalRecord');

const sequelize = new Sequelize('medicalrecordsdb', 'heroku', 'z5eW2OXl44PzSnDVK5UR5muHPR3Ldm9U', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
const User = UserModel(sequelize);
const Doctor = DoctorModel(sequelize);
const MedicalRecord = MedicalRecordModel(sequelize);

// Associations
User.hasOne(Doctor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(MedicalRecord, { foreignKey: 'patientId', as: 'patientRecords' });
MedicalRecord.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

Doctor.hasMany(MedicalRecord, { foreignKey: 'doctorId', as: 'doctorRecords' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = {
  sequelize,
  User,
  Doctor,
  MedicalRecord,
};
