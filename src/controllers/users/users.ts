import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from 'fastify';
import { prismaClient } from '../../lib/prismaClient';
import {
  userCreateSchema,
  userGetAllSchema,
  userGetOneSchema,
} from 'schemas/users';
import { usersService } from 'services/users';
import { Prisma } from 'generated/prisma';
import { FromSchema } from 'json-schema-to-ts';

export const usersController: FastifyPluginCallback = (
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done
) => {
  server.get(
    '/',
    {
      schema: {
        ...userGetAllSchema,
        description: 'Get all users',
        tags: ['user'],
        summary: 'Returns a list of all users',
      },
    },
    async (request, response) => {
      const users = await usersService.getAllUsers();
      response.send({ users });
    }
  );

  server.get(
    '/:id',
    { schema: userGetOneSchema },
    async (request, response) => {
      const id = Number((request.params as { id: string }).id);
      if (isNaN(id)) {
        return response.status(400).send({ error: 'Invalid user ID' });
      }

      const user = await usersService.getUserById(id);
      if (!user) {
        return response.status(404).send({ error: 'User not found' });
      }
      response.send(user);
    }
  );

  server.post<{ Body: FromSchema<typeof userCreateSchema.body> }>(
    '/',
    { schema: userCreateSchema },
    async (request, response) => {
      const user = await usersService.createUser(
        request.body as Prisma.UserCreateInput
      );

      return response.code(201).send(user);
    }
  );

  done(); // Don't forget to call done when your plugin is ready
};
