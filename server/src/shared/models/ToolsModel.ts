import { prisma } from '@services/prisma';
import { z } from 'zod';

export const getAllTools = () => {
  return prisma.tool.findMany();
};

export const createTool = (toolDTO: any) => {
  // TODO: Use Zod to validate
  const createToolSchema = z.object({
    title: z.string(),
    link: z.string().url(),
    description: z.string(),
    tags: z.string(),
  });

  const newDataTool = createToolSchema.parse(toolDTO);

  return prisma.tool.create({ data: toolDTO, include: { tags: true } });
};

export const deleteTool = (id: string) => {
  // TODO: Use Zod to validate
  return prisma.tool.delete({
    where: {
      id: +id,
    },
  });
};
