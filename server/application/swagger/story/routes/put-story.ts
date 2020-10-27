import { updateSchema as schema } from '../schemas';

export default {
  tags: ['Stories'],
  description: 'Update story',
  operationId: 'putStory',
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
