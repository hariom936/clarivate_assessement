my-account-project/
├── backend/(clarivate_be_assessment)                # Node.js backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validation/         # validation with class-validator
│   └── index.js
│
├── frontend/(clarivate_fe_assessment)               # React.js frontend app
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/       # API services
│   │   └── App.js
│   └── package.json
│
├── shared-orm-library/     # Shared DB models using TypeORM
│   ├── entities/
│   ├── migrations/
│   └── db.ts
│
└── README.md

🚀 Setup Instructions
    1. Clone the Repository
    git clone https://github.com/your-username/clarivate_assessment.git
    cd clarivate_assessment

⚙️ Backend Setup (clarivate_be_assessment/)
    Install dependencies:
        cd clarivate_be_assessment
        npm install

    Environment Setup:
        Create a .env file:
            CORS_ORIGIN='*'
            NODE_ENV=local
            PORT=8000
            JWT_SECRET=your-secret
            JWT_ACCESS_EXPIRATION=30

    Run DB Create:
     typeorm entity:create src/entity/users

    Run DB Migrations:
        npm run migration:run

Run Backend Server:
    npm run serve

    The backend runs at: http://localhost:8000/
    Test the API:
    Use Postman or curl to test the API endpoints.

🌐 Frontend Setup (clarivate_fe_assessment/)

    Install dependencies:
    cd clarivate_fe_assessment
    npm install

    Environment Setup:
    Create a .env file:
    REACT_APP_API_URL=http://localhost:8000/api/user

📦 Useful Commands
    Backend:
        npm run serve          # Start the backend server
        npm run migration:run  # Run database migrations
        npm run migration:revert # Revert the last migration

    Frontend:
        npm start                   # Start frontend (React)
        npm run build               # Build production bundle

    Shared ORM:
        npm run typeorm migration:run  # Run migrations
        npm run typeorm migration:revert # Revert the last migration

🔐 API Endpoints Summary :

    * Auth
        POST /api/user/add — Signup

        POST /api/user/login — Login

    * Users
        GET /api/user/list?page=1 — User list

        PATCH /api/user/update?userId=1 — Update user

        DELETE /api/user/update?userId=1 — Delete user

✅ Features
    User Registration and Login

    User List with Search

    Edit/Delete Users

    Logout

    React (MUI), Node.js, PostgreSQL, TypeORM

