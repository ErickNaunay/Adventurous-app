export default {
  type: 'object',
  properties: {
    message: {
      type: 'string'
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          property: {
            type: 'string'
          },
          constraints: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};
