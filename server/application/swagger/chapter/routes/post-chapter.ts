import { createSchema as schema } from '../schemas';

export default {
  tags: ['Chapters'],
  description: 'Create chapter',
  operationId: 'postChapter',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema
      }
    }
  },
  responses: {
    '201': {
      description: 'Chapter detail',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/components/schemas/Chapter'
              }
            }
          }
        }
      }
    },
    default: {
      $ref: '#/components/responses/Error'
    }
  }
};
