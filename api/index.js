import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from '../server/config/db.js';
import tareaRoutes from '../server/routes/tareaRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Inicializar la conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ DB conectada'))
  .catch(err => console.error('❌ Error DB:', err));

sequelize.sync({ alter: true });

app.use('/api/tareas', tareaRoutes);

export default app;
