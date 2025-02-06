# Kanban Board with JWT Authentication

A full-stack Kanban board application with secure JWT authentication.

## Features

- User authentication with JWT
- Protected routes and API endpoints
- Secure password hashing
- Persistent data storage with PostgreSQL
- Responsive design with CSS modules
- Real-time task management

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - CSS Modules
  - Vite
- Backend:
  - Node.js
  - Express
  - PostgreSQL
  - Sequelize ORM
  - JWT for authentication

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ReplicantCoder9000/JWT.git
cd JWT
```

2. Install dependencies for both client and server:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:
   - Copy `.env.EXAMPLE` to `.env` in the server directory
   - Update the following variables:
     ```
     DB_NAME='kanban_db'
     DB_USER='postgres'
     DB_PASSWORD='your_password'
     JWT_SECRET_KEY='your_secret_key'
     ```

4. Create and seed the database:
```bash
# Create database
psql -U postgres -f db/schema.sql

# Run migrations and seeds
cd server
npm run seed
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client in a new terminal:
```bash
cd client
npm run dev
```

3. Access the application at `http://localhost:3000`

### Test Credentials

- Username: JollyGuru
- Password: password

## Deployment Options

### Option 1: Railway
- Deploy both backend and PostgreSQL database
- Single platform solution
- Free tier available

### Option 2: Supabase + Netlify/Vercel
- Use Supabase for database
- Deploy frontend to Netlify/Vercel
- Free tiers available

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
