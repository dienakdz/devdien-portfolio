const errorSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Invalid contact payload.',
    },
  },
  required: ['message'],
};

export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'DevDien Portfolio API',
    version: '1.0.0',
    description: 'API for contact submissions, visitor tracking, and service health checks.',
  },
  servers: [
    {
      url: '/',
      description: 'Current deployment origin',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'Service availability checks.',
    },
    {
      name: 'Contacts',
      description: 'Contact form submission endpoints.',
    },
    {
      name: 'Visits',
      description: 'Visitor tracking endpoints.',
    },
    {
      name: 'Admin',
      description: 'Protected administrative endpoints.',
    },
  ],
  components: {
    schemas: {
      ErrorResponse: errorSchema,
      HealthResponse: {
        type: 'object',
        properties: {
          ok: {
            type: 'boolean',
            example: true,
          },
          services: {
            type: 'object',
            properties: {
              database: {
                type: 'string',
                enum: ['up', 'down'],
                example: 'up',
              },
              mailer: {
                type: 'string',
                enum: ['configured', 'missing'],
                example: 'configured',
              },
            },
            required: ['database', 'mailer'],
          },
        },
        required: ['ok', 'services'],
      },
      ContactRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            maxLength: 160,
            example: 'Nguyen Minh Dien',
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 320,
            example: 'minhdien678@gmail.com',
          },
          message: {
            type: 'string',
            maxLength: 4000,
            example: 'I would like to discuss a backend role.',
          },
        },
        required: ['email', 'message'],
      },
      ContactResponse: {
        type: 'object',
        properties: {
          ok: {
            type: 'boolean',
            example: true,
          },
          mailDelivered: {
            type: 'boolean',
            example: true,
          },
        },
        required: ['ok', 'mailDelivered'],
      },
      VisitRequest: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            maxLength: 512,
            example: '/',
          },
        },
      },
      VisitResponse: {
        type: 'object',
        properties: {
          ok: {
            type: 'boolean',
            example: true,
          },
        },
        required: ['ok'],
      },
      VisitSummaryResponse: {
        type: 'object',
        properties: {
          totalVisits: {
            type: 'integer',
            example: 182,
          },
          uniqueVisitors: {
            type: 'integer',
            example: 109,
          },
        },
        required: ['totalVisits', 'uniqueVisitors'],
      },
      AdminContact: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 12,
          },
          name: {
            type: ['string', 'null'],
            example: 'Nguyen Minh Dien',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'minhdien678@gmail.com',
          },
          message: {
            type: ['string', 'null'],
            example: 'I would like to discuss a backend role.',
          },
          ip: {
            type: ['string', 'null'],
            example: '203.113.10.12',
          },
          country: {
            type: ['string', 'null'],
            example: 'VN',
          },
          region: {
            type: ['string', 'null'],
            example: 'Ho Chi Minh',
          },
          city: {
            type: ['string', 'null'],
            example: 'Ho Chi Minh City',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-03-12T03:00:00.000Z',
          },
        },
        required: ['id', 'email', 'createdAt'],
      },
      AdminContactListResponse: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            example: 1,
          },
          pageSize: {
            type: 'integer',
            example: 20,
          },
          total: {
            type: 'integer',
            example: 57,
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AdminContact',
            },
          },
        },
        required: ['page', 'pageSize', 'total', 'items'],
      },
    },
    parameters: {
      AdminApiKeyHeader: {
        name: 'x-admin-key',
        in: 'header',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'Administrative API key.',
      },
      PageQuery: {
        name: 'page',
        in: 'query',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          default: 1,
        },
      },
      PageSizeQuery: {
        name: 'pageSize',
        in: 'query',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          maximum: 50,
          default: 20,
        },
      },
    },
  },
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Check backend dependencies',
        responses: {
          '200': {
            description: 'Backend dependencies are available.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthResponse',
                },
              },
            },
          },
          '503': {
            description: 'One or more dependencies are unavailable.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/contact': {
      post: {
        tags: ['Contacts'],
        summary: 'Submit the contact form',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContactRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'The contact request was stored.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ContactResponse',
                },
              },
            },
          },
          '400': {
            description: 'The request payload is invalid.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/visits': {
      post: {
        tags: ['Visits'],
        summary: 'Record a page visit',
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/VisitRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'The visit was recorded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/VisitResponse',
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/visits/summary': {
      get: {
        tags: ['Visits'],
        summary: 'Get aggregated visitor counts',
        responses: {
          '200': {
            description: 'Visitor totals and unique visitor counts.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/VisitSummaryResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/contacts': {
      get: {
        tags: ['Admin'],
        summary: 'List stored contact submissions',
        parameters: [
          {
            $ref: '#/components/parameters/AdminApiKeyHeader',
          },
          {
            $ref: '#/components/parameters/PageQuery',
          },
          {
            $ref: '#/components/parameters/PageSizeQuery',
          },
        ],
        responses: {
          '200': {
            description: 'Paginated list of contact submissions.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AdminContactListResponse',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid admin key.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '500': {
            description: 'Server configuration error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
};
