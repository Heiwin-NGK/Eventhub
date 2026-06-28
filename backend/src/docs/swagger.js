const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "EventHub API",
      version: "1.0.0",
      description:
        "Event Management Platform API",
    },

    servers: [
      {
        url:
          "http://localhost:5000/api",
      },
    ],

components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },

  schemas: {
    User: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },

        name: {
          type: "string",
        },

        email: {
          type: "string",
        },

        role: {
          type: "string",
          example: "attendee",
        },
      },
    },

    Event: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },

        title: {
          type: "string",
        },

        description: {
          type: "string",
        },

        venue: {
          type: "string",
        },

        eventType: {
          type: "string",
        },

        capacity: {
          type: "number",
        },

        startDate: {
          type: "string",
          format: "date-time",
        },

        endDate: {
          type: "string",
          format: "date-time",
        },
      },
    },

    Registration: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },

        status: {
          type: "string",
          example: "registered",
        },

        createdAt: {
          type: "string",
          format: "date-time",
        },
      },
    },

    Ticket: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },

        ticketId: {
          type: "string",
        },

        qrCode: {
          type: "string",
        },
      },
    },

    Notification: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },

        title: {
          type: "string",
        },

        message: {
          type: "string",
        },

        isRead: {
          type: "boolean",
        },
      },
    },
  },
},

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.js",
  ],
};

module.exports =
  swaggerJsDoc(options);