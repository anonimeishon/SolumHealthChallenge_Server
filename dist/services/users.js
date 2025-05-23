import usersRepository from 'repositories/users';
export const usersService = {
    getAllUsers: async () => {
        return await usersRepository.getAll();
    },
    getUserById: async (id) => {
        return await usersRepository.findById(id);
    },
    createUser: async (userData) => {
        const user = await usersRepository.create(userData);
        console.log('🚀 ~ users.ts:28 ~ createUser: ~ user:', user);
        return { user, message: 'User created successfully' };
    },
    updateUser: async (id, userData) => {
        return await usersRepository.update(id, userData);
    },
    deleteUser: async (id) => {
        return await usersRepository.delete(id);
    },
};
