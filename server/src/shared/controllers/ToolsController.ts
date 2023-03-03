import { Request, Response } from 'express';
import { prisma } from '@services/prisma/prisma';
import { z } from 'zod';

export class ToolsController {
  async getAllTools() {
    const tools = await prisma.tools.findMany();
    return { tools };
  }

  async createNewTools(req: Request, res: Response) {
    const createToolSchema = z.object({
      title: z.string(),
      link: z.string().url(),
      description: z.string(),
      tags: z.string(),
    });

    const { title, link, description, tags } = createToolSchema.parse(req.body);

    await prisma.tools.create({
      data: {
        title,
        link,
        description,
        tags,
      },
    });

    return res.status(201).send();
  }

  async getTool(req: Request, res: Response) {
    const toolSchema = z.object({
      id: z.number().positive(),
    });

    const { id } = toolSchema.parse(req.body);

    const idSearch = await prisma.tools.findUnique({
      where: {
        id,
      },
    });

    return { idSearch };
  }

  async deleteTools(req: Request, res: Response) {
    return res.status(204).json({ message: 'Tool Delected' });
  }
}
