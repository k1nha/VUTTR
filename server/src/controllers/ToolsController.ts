import { Request, Response } from "express";

export class ToolsController{
  async getAllTools(req: Request, res: Response){
    return res.status(200).json({products: "All tools"})
  }

  async createNewTools(req: Request, res: Response) {
    const createdTool = req.body;
    return res.status(201).json({message: 'Tool has created successfully'})
  }

  async getTools(req: Request, res: Response) {
    return res.status(200).json({product: 'Tool 1'})
  }

  async deleteTools(req: Request, res: Response) {
    return res.status(204).json({message: "Tool Delected"})
  }
}