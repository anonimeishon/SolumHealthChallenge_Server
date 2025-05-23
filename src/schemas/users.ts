import { RouteSchema } from 'types/schema-types';

export const userGetAllSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              Project: {
                type: 'array',
                properties: {
                  id: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  createdBy: { type: 'number' },
                },
              },
              UserProjects: {
                type: 'array',
                properties: {
                  id: { type: 'number' },
                  projectId: { type: 'number' },
                  userId: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export const userGetOneSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
} as const;

export const userCreateSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      // password: { typse: 'string' },
      role: { type: 'string' },
    },
    required: ['name', 'email', 'role'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  },
} as const;

export const userUpdateSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' },
    },
    required: ['name', 'email', 'role'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
} as const;
