export default {
  tags: ['Chapters'],
  description: 'Return a chapter',
  operationId: 'getOneChapter',
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
      description: 'Chapter detail.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
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
