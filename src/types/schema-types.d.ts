import { RouteShorthandOptions } from 'fastify';

declare module '*/*.schema.*' {
  export const schemas: RouteHandler['schema'];
}

declare type RouteSchema = RouteShorthandOptions['schema'];
