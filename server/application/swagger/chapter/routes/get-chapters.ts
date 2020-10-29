export default {
  tags: ['Chapters'],
  description: 'Return all chapters',
  operationId: 'getChapters',
  responses: {
    '200': {
      description: 'A list of chapters and its details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: '#/components/schemas/Chapter'
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
