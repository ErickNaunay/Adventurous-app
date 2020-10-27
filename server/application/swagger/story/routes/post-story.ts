import { createSchema as schema } from '../schemas';

export default {
  tags: ['Stories'],
  description: 'Create story',
  operationId: 'postStory',
  requestBody: {
    content: {
      'application/json': {
        schema
      }
    }
  },
  responses: {
    '201': {
      description: 'Story detail',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/components/schemas/Story'
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
