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
    createdAt: {
      type: 'string'
    }
  },

  required: ['id', 'title', 'summary']
};

export const createSchema = {
  type: 'object',
  properties: omit(schema.properties, ['id', 'createdAt']),
  required: omit(schema.properties, 'id')
};

export const updateSchema = omit(createSchema, 'required');

export default schema;
