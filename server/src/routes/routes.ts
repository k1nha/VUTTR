import express from 'express';
import { ToolsController } from '../controllers/ToolsController';
import { ErrorRequestHandle } from '../middlewares/ErrorMiddleware';


const router = express.Router();
const tools = new ToolsController();

// Get All Tools
router.get('/tools', tools.getAllTools);

// Get One Tool
router.get('/tools/:id', tools.getTools);

// Create Tool
router.post('/tools/', tools.createNewTools);

// Error
router.use(ErrorRequestHandle);


export { router };