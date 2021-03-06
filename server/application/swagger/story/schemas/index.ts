import omit from 'lodash/omit';
export const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    summary: {
      type: 'string'
    },
    chapters: {
      type: 'array',
      items: {
        type: 'object',
        $ref: '#/components/schemas/Chapter'
      }
    },
    createdAt: {
      type: 'string'
    }
  },

  required: ['id', 'title', 'summary']
};

export const createSchema = {
  type: 'object',
  properties: omit(schema.properties, ['id', 'createdAt', 'chapters']),
  required: omit(schema.properties, 'id')
};

export const updateSchema = omit(createSchema, 'required');

export default schema;
