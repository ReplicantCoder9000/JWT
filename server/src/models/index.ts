import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  // Production configuration (Railway)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
} else {
  // Local development configuration
  sequelize = new Sequelize({
    database: process.env.DB_NAME || 'kanban_db',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
  });
}

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Initialize models
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Define associations
Ticket.belongsTo(User, {
  foreignKey: 'assignedUserId',
  as: 'assignedUser'
});

User.hasMany(Ticket, {
  foreignKey: 'assignedUserId',
  as: 'assignedTickets'
});

export { sequelize, User, Ticket };
