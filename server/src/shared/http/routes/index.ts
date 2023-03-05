import express from 'express';
import { ToolsController } from '../../controllers/ToolsController';

const router = express.Router();
const tools = new ToolsController();

// Get All Tools
router.get('/tools', tools.getAllTools);

// Create Tool
router.post('/tools/', tools.createNewTools);

// Delete Tool
router.delete('/tools/:id', tools.deleteTools);

export { router };
