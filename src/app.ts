// Modules
import dotenv from 'dotenv';
import express from 'express';

// Routes
import shoesRoutes from './routes';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use('/api', shoesRoutes);

app.listen(PORT, () => {
  console.log(`Listening in ${PORT} port`)
}) 