import { prisma } from '@services/prisma';
import { z } from 'zod';

export const getAllTools = () => {
  return prisma.tool.findMany({});
};

export const createTool = (toolDTO: any) => {
  // TODO: Use Zod to validate
  return prisma.tool.create({ data: toolDTO });
};

export const deleteTool = (id: string) => {
  // TODO: Use Zod to validate
  return prisma.tool.delete({
    where: {
      id: +id,
    },
  });
};
