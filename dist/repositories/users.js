import { prismaClient } from '../lib/prismaClient.js';
export const usersRepository = {
    findByEmail: async (email) => {
        return prismaClient.user.findUnique({
            where: { email },
            include: {},
        });
    },
    create: async (data) => {
        return prismaClient.user.create({
            data,
        });
    },
    findById: async (id) => {
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
    update: async (id, data) => {
        return prismaClient.user.update({
            where: { id },
            data,
        });
    },
    delete: async (id) => {
        return prismaClient.user.delete({
            where: { id },
        });
    },
};
export default usersRepository;
