import { Prisma } from '../generated/prisma';
import { prismaClient } from '../lib/prismaClient';
export const usersRepository = {
  findByEmail: async (email: string) => {
    return prismaClient.user.findUnique({
      where: { email },
      include: {},
    });
  },
  create: async (data: Prisma.UserCreateInput) => {
    return prismaClient.user.create({
      data,
    });
  },
  findById: async (id: number) => {
    return prismaClient.user.findUnique({
      where: { id },
      include: {},
    });
  },
  getAll: async () => {
    return prismaClient.user.findMany({
      include: {},
    });
  },
  update: async (id: number, data: Prisma.UserUpdateInput) => {
    return prismaClient.user.update({
      where: { id },
      data,
    });
  },
  delete: async (id: number) => {
    return prismaClient.user.delete({
      where: { id },
    });
  },
};
export default usersRepository;
