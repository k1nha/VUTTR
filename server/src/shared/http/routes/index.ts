import express from 'express';
import { ToolsController } from '../../controllers/ToolsController';

const router = express.Router();
const tools = new ToolsController();

// Get All Tools
router.get('/tools', tools.getAllTools);

// Get One Tool
router.get('/tools/:id', tools.getTools);

// Create Tool
router.post('/tools/', tools.createNewTools);

export { router };
