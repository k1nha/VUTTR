import { Request, Response } from 'express';
import { prisma } from '@services/prisma';
import { z } from 'zod';

export class ToolsController {
  async getAllTools(req: Request, res: Response) {
    const tools = await prisma.tool.findMany();
    return res.status(200).json(tools);
  }

  async createNewTools(req: Request, res: Response) {
    const createToolSchema = z.object({
      title: z.string(),
      link: z.string().url(),
      description: z.string(),
      tags: z.string(),
    });

    const { title, link, description, tags } = createToolSchema.parse(req.body);

    await prisma.tool.create({
      data: {
        title,
        link,
        description,
        tags,
      },
    });

    return res.status(201).send();
  }

  async deleteTools(req: Request, res: Response) {
    // TO-DO: Use Zod to validate
    const { id } = req.params;

    await prisma.tool.delete({
      where: {
        id: +id,
      },
    });

    return res.status(204).send();
  }
}
