import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
