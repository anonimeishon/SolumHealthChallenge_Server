import { usersController } from './controllers/users/users.js';
import fastify from 'fastify';
import middie from '@fastify/middie';
import { prismaClient } from './lib/prismaClient.js';
import { buildServer } from './app.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const start = async () => {
  const server = buildServer();

  // Register middleware
  await server.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost:8080',
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header',
          },
        },
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
    },
  });

  // Register swagger UI after swagger plugin
  await server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  await server.register(middie, { hook: 'onRequest' });

  // Add swagger documentation route
  server.ready(() => {
    // This will make the documentation available at http://localhost:8080/documentation
    server.swagger();
    console.log('Swagger documentation available at /documentation');
  });

  // Register routes
  server.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  // Register controllers
  await server.register(usersController, { prefix: '/users' });

  try {
    await server.listen({ port: 8080 });
    console.log(`Server is running at http://localhost:8080`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
