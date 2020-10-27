export default {
  tags: ['Stories'],
  description: 'Retrun all stories',
  operationId: 'getStories',
  responses: {
    '200': {
      description: 'A list of stories and its details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Story'
                }
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
