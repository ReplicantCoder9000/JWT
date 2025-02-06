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

## Deployment

The application is split into frontend and backend deployments:

### Frontend Deployment (Netlify)
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/dist`
3. Set environment variables in Netlify:
   - `VITE_API_URL`: Your backend API URL

### Backend Deployment (Railway)
1. Create a new project in Railway
2. Add a PostgreSQL database
3. Deploy the Node.js backend:
   - Connect your GitHub repository
   - Set build command: `cd server && npm install && npm run build`
   - Start command: `cd server && npm start`
4. Set environment variables in Railway:
   ```
   DB_NAME=railway
   DB_USER=postgres
   DB_PASSWORD=your_railway_db_password
   JWT_SECRET_KEY=your_secret_key
   ```
5. Get your database connection details from Railway and update the environment variables

### Alternative Backend Options
If Railway's free tier is unavailable, consider:
1. Fly.io - Offers a generous free tier
2. Render - Basic free tier available
3. Heroku - Paid options available

### Database Options
1. Railway PostgreSQL (included with Railway deployment)
2. Supabase - Generous free tier with additional features
3. ElephantSQL - Free PostgreSQL hosting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
