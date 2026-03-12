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
    {
      name: 'Auth',
      description: 'Authentication and session management endpoints.',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
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
            example: '2026-03-12T10:00:00+07:00',
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
      AdminVisit: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 101,
          },
          path: {
            type: ['string', 'null'],
            example: '/projects',
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
          userAgent: {
            type: ['string', 'null'],
            example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
          deviceType: {
            type: ['string', 'null'],
            example: 'desktop',
          },
          browser: {
            type: ['string', 'null'],
            example: 'Chrome',
          },
          os: {
            type: ['string', 'null'],
            example: 'Windows',
          },
          deviceVendor: {
            type: ['string', 'null'],
            example: 'Dell',
          },
          deviceModel: {
            type: ['string', 'null'],
            example: 'XPS',
          },
          visitedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-03-12T10:00:00+07:00',
          },
        },
        required: ['id', 'visitedAt'],
      },
      AdminVisitListResponse: {
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
            example: 182,
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AdminVisit',
            },
          },
        },
        required: ['page', 'pageSize', 'total', 'items'],
      },
      AuthUser: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'minhdien.dev@gmail.com',
          },
          fullName: {
            type: ['string', 'null'],
            example: 'Dev Dien',
          },
          role: {
            type: 'string',
            example: 'admin',
          },
        },
        required: ['id', 'email', 'role'],
      },
      LoginRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'minhdien.dev@gmail.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'Admin@123',
          },
        },
        required: ['email', 'password'],
      },
      LoginResponse: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/AuthUser',
          },
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access',
          },
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh',
          },
        },
        required: ['user', 'accessToken', 'refreshToken'],
      },
      RefreshRequest: {
        type: 'object',
        properties: {
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh',
          },
        },
        required: ['refreshToken'],
      },
      RefreshResponse: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access',
          },
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh',
          },
        },
        required: ['accessToken', 'refreshToken'],
      },
      LogoutRequest: {
        type: 'object',
        properties: {
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh',
          },
        },
        required: ['refreshToken'],
      },
      LogoutResponse: {
        type: 'object',
        properties: {
          ok: {
            type: 'boolean',
            example: true,
          },
        },
        required: ['ok'],
      },
      MeResponse: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/AuthUser',
          },
        },
        required: ['user'],
      },
      UpdateMeRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'minhdien.dev@gmail.com',
          },
          fullName: {
            type: ['string', 'null'],
            example: 'Dev Dien',
          },
        },
      },
      ChangePasswordRequest: {
        type: 'object',
        properties: {
          currentPassword: {
            type: 'string',
            format: 'password',
            example: 'Admin@123',
          },
          newPassword: {
            type: 'string',
            format: 'password',
            example: 'Admin@1234',
          },
        },
        required: ['currentPassword', 'newPassword'],
      },
      ChangePasswordResponse: {
        type: 'object',
        properties: {
          ok: {
            type: 'boolean',
            example: true,
          },
          requiresLogin: {
            type: 'boolean',
            example: true,
          },
        },
        required: ['ok', 'requiresLogin'],
      },
    },
    parameters: {
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
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
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
            description: 'Missing or invalid bearer token.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '403': {
            description: 'Authenticated user does not have admin access.',
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
    '/api/admin/visits': {
      get: {
        tags: ['Admin'],
        summary: 'List recorded page visits',
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/PageQuery',
          },
          {
            $ref: '#/components/parameters/PageSizeQuery',
          },
        ],
        responses: {
          '200': {
            description: 'Paginated list of recorded page visits.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AdminVisitListResponse',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid bearer token.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '403': {
            description: 'Authenticated user does not have admin access.',
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
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate a user and create a session',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Authentication succeeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse',
                },
              },
            },
          },
          '400': {
            description: 'The login payload is invalid.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'The credentials are invalid.',
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
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Return the authenticated user',
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Authenticated user details.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MeResponse',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid bearer token.',
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
      patch: {
        tags: ['Auth'],
        summary: 'Update the authenticated user profile',
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateMeRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Authenticated user profile updated.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MeResponse',
                },
              },
            },
          },
          '400': {
            description: 'Payload is invalid or empty.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Missing or invalid bearer token.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '409': {
            description: 'Email is already used by another user.',
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
    '/api/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh the current session tokens',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RefreshRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'A new token pair was issued.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RefreshResponse',
                },
              },
            },
          },
          '400': {
            description: 'Refresh token is missing.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Refresh token or session is invalid.',
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
    '/api/auth/password': {
      patch: {
        tags: ['Auth'],
        summary: 'Change the authenticated user password',
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ChangePasswordRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Password changed successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChangePasswordResponse',
                },
              },
            },
          },
          '400': {
            description: 'Payload is invalid or new password does not meet policy.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Missing bearer token or current password is incorrect.',
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
    '/api/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Revoke the current refresh session',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LogoutRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Session revoked successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LogoutResponse',
                },
              },
            },
          },
          '400': {
            description: 'Refresh token is missing.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Refresh token or session is invalid.',
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
