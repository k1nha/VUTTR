import { Request, Response } from 'express';
import * as ToolService from '@shared/models/ToolsModel';

export class ToolsController {
  async getAllTools(req: Request, res: Response) {
    const tools = await ToolService.getAllTools();
    return res.status(200).json(tools);
  }

  async createNewTools(req: Request, res: Response) {
    const tools = await ToolService.createTool(req.body);
    return res.status(201).send();
  }

  async deleteTools(req: Request, res: Response) {
    const { id } = req.params;
    const tools = await ToolService.deleteTool(id);
    return res.status(204).send();
  }
}
