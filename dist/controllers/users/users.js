import { prismaClient } from '../../lib/prismaClient';
import { userCreateSchema, userGetAllSchema, userGetOneSchema, } from 'schemas/users';
import { usersService } from 'services/users';
export const usersController = (server, opts, done) => {
    server.get('/', {
        schema: {
            ...userGetAllSchema,
            description: 'Get all users',
            tags: ['user'],
            summary: 'Returns a list of all users',
        },
    }, async (request, response) => {
        const users = await prismaClient.user.findMany({
            include: {
                Project: true,
                UserProjects: true,
            },
        });
        response.send({ users });
    });
    server.get('/:id', { schema: userGetOneSchema }, async (request, response) => {
        const { id } = request.params;
        const user = await prismaClient.user.findFirst({
            where: { id: Number(id) },
        });
        if (!user) {
            return response.status(404).send({ error: 'User not found' });
        }
        response.send(user);
    });
    server.post('/', { schema: userCreateSchema }, async (request, response) => {
        const user = await usersService.createUser(request.body);
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('done');
            }, 1000);
        });
        return response.code(201).send(user);
    });
    done(); // Don't forget to call done when your plugin is ready
};
