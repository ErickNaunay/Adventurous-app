export default {
  tags: ['Chapters'],
  description: 'Delete chapter',
  operationId: 'deleteChapter',
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
    '204': {
      description: 'The resource was deleted successfully.'
    },
    default: {
      $ref: '#/components/responses/Error'
    }
  }
};
