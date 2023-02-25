import express, {Request, Response} from 'express';
import { ToolsController } from '../controllers/ToolsController';


const router = express.Router();
const tools = new ToolsController();

router.get('/tools', tools.getAllTools);

router.get('/tools/:id', tools.getTools);

router.post('/tools/', tools.createNewTools);

router.use((err: Error,req: Request, res: Response) => {
  res.status(404).json({
    message: "Ohh you are lost, read the API documentation to find your way back home :)",
    error: err.message
  });
});

export { router };