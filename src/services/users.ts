import { Prisma } from 'generated/prisma';
import usersRepository from 'repositories/users';

export const usersService = {
  getAllUsers: async () => {
    return await usersRepository.getAll();
  },

  getUserById: async (id: number) => {
    return await usersRepository.findById(id);
  },

  createUser: async (userData: Prisma.UserCreateInput) => {
    const user = await usersRepository.create(userData);

    return { user, message: 'User created successfully' };
  },

  updateUser: async (id: number, userData: Prisma.UserUpdateInput) => {
    return await usersRepository.update(id, userData);
  },

  deleteUser: async (id: number) => {
    return await usersRepository.delete(id);
  },
};
