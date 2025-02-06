import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

// Use Railway's DATABASE_URL in production, fallback to local config in development
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(
      process.env.DB_NAME || 'kanban_db',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || 'postgres',
      {
        host: 'localhost',
        dialect: 'postgres'
      }
    );

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
