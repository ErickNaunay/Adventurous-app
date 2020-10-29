import omit from 'lodash/omit';

export const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    story: {
      type: 'object',
      $ref: '#/components/schemas/Story'
    },
    sequence: {
      type: 'integer'
    },
    content: {
      type: 'string'
    },
    connections: {
      type: 'array',
      items: {
        type: 'integer'
      }
    },
    createdAt: {
      type: 'string'
    }
  },

  required: ['id', 'sequence', 'content', 'connections']
};

export const createSchema = {
  type: 'object',
  properties: omit(schema.properties, ['id', 'story', 'createdAt']),
  required: omit(schema.required, 'id')
};

export const updateSchema = omit(createSchema, 'required');

export default schema;
