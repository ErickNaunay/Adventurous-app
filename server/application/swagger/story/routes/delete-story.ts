export default {
  tags: ['Stories'],
  description: 'Delete story',
  operationId: 'deleteStory',
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
