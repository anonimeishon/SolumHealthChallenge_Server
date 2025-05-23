import { userCreateSchema, userGetAllSchema, userGetOneSchema, } from '../../schemas/users.js';
import { usersService } from '../../services/users.js';
export const usersController = (server, opts, done) => {
    server.get('/', {
        schema: {
            ...userGetAllSchema,
            description: 'Get all users',
            tags: ['user'],
            summary: 'Returns a list of all users',
        },
    }, async (request, response) => {
        const users = await usersService.getAllUsers();
        response.send({ users });
    });
    server.get('/:id', { schema: userGetOneSchema }, async (request, response) => {
        const id = Number(request.params.id);
        if (isNaN(id)) {
            return response.status(400).send({ error: 'Invalid user ID' });
        }
        const user = await usersService.getUserById(id);
        if (!user) {
            return response.status(404).send({ error: 'User not found' });
        }
        response.send(user);
    });
    server.post('/', { schema: userCreateSchema }, async (request, response) => {
        const user = await usersService.createUser(request.body);
        return response.code(201).send(user);
    });
    done(); // Don't forget to call done when your plugin is ready
};
