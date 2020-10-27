export default {
  tags: ['Stories'],
  description: 'Return a story',
  operationId: 'getOneStory',
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
  responses: {
    '200': {
      description: 'Story detail.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
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
