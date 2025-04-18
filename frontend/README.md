# Angular Frontend Setup for Medical Records Management System

## Prerequisites

- Node.js (v16+)
- npm (comes with Node.js)
- Angular CLI (optional but recommended)

## Installation Steps

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. To run the Angular development server:

```bash
npm start
```

This will start the app at `http://localhost:4200`.

## Common Errors and Fixes

- If you see errors like "Cannot find module '@angular/core' or its corresponding type declarations", it usually means dependencies are not installed or the IDE needs to reload.

- Run `npm install` to ensure all packages are installed.

- Restart your IDE or editor after installing dependencies.

- Make sure your `tsconfig.json` and Angular project files are correctly set up (these will be created as part of the Angular project).

## Next Steps

- Continue creating Angular components and services step-by-step.

- Implement routing, authentication, and CRUD UI for doctors and medical records.

- Use Tailwind CSS for styling as configured.

## Notes

- This frontend is designed to work with the Node.js backend API you have.

- Ensure backend is running and accessible for API calls.
