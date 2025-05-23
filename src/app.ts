import fastify from 'fastify';

export const buildServer = () => {
  const server = fastify({
    logger: true,
  });

  return server;
};
