# Medical Records Management System

This project is a full-stack web application for managing medical records with user roles (admin, doctor, patient). It includes a Node.js backend with Express and PostgreSQL, and an Angular frontend (to be implemented).

## Features

- User management with roles (admin, doctor, patient)
- CRUD operations for doctors and medical records
- JWT-based authentication and role-based access control
- Data encryption and security protections (XSS, CSRF)
- File upload support for doctor logos and signatures
- API documentation with Swagger
- Deployment ready for Heroku

## Backend Setup

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- npm

### Installation

1. Clone the repository

2. Navigate to the backend directory:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Configure environment variables:

Create a `.env` file in the `backend` directory with the following content:

```
PORT=4000
DATABASE_URL=postgres://username:password@localhost:5432/medical_records_db
JWT_SECRET=your_jwt_secret_key
TOKEN_EXPIRATION=1h
```

Replace `username`, `password`, and database name as appropriate.

5. Run the backend server:

```bash
npm run dev
```

The backend server will start on `http://localhost:4000`.

6. Access API documentation at:

```
http://localhost:4000/api-docs
```

## Frontend Setup

(To be implemented: Angular frontend with user login, doctor and medical record management)

## Deployment to Heroku

1. Create a Heroku app:

```bash
heroku create your-app-name
```

2. Add Heroku Postgres add-on:

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. Set environment variables on Heroku:

```bash
heroku config:set JWT_SECRET=your_jwt_secret_key TOKEN_EXPIRATION=1h
```

4. Push code to Heroku:

```bash
git push heroku main
```

5. Run database migrations if needed.

6. The app will be available at `https://your-app-name.herokuapp.com`.

## Notes

- The backend uses Sequelize ORM for database interactions.
- File uploads are stored in the `uploads` directory (ensure this is handled properly in production).
- Security middleware includes Helmet, CORS, CSRF protection.
- API documentation is available via Swagger UI.

## License

MIT License
