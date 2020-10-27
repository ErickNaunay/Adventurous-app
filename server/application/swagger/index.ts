import ErrorSchema from './utils/error-schema';

import {
  getOneStory,
  getStories,
  postStory,
  putStory,
  deleteStory,
  schema as Story
} from './story';

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Adventurous API',
    description: 'Adventurous app',
    termsOfService: '',
    contact: {
      name: 'Erick Naunay',
      email: 'erick@gmail.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:9000/api/v1',
      description: 'Local Server'
    }
  ],
  components: {
    schemas: {
      Story,
      ErrorModel: ErrorSchema
    },
    responses: {
      Error: {
        description: 'Unexpected error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorModel'
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Stories'
    }
  ],
  paths: {
    '/stories': {
      get: getStories,
      post: postStory
    },
    '/stories/{id}': {
      get: getOneStory,
      put: putStory,
      delete: deleteStory
    }
  }
};
