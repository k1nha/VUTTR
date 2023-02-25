import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/routes';

dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// app.use()

app.listen(PORT, () => {
  console.log(`[SERVER] Server is listening on ${PORT}`); 
})