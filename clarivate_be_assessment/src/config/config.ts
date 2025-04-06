import dotenv from 'dotenv';

dotenv.config();

const isWildcardOrigin = process.env.CORS_ORIGIN === '*';

const allowedOrigins = isWildcardOrigin
  ? []
  : process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'];

const config = {
  env: process.env.NODE_ENV,
  showErrorStack: process.env.DEV_ENVS?.split(',').includes(process.env.NODE_ENV),
  port: process.env.PORT ?? 8001,
  jwts: {
    secret: process.env.JWT_SECRET || 'your-secret',
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION || '30',
  },
  corsOptions: {
    origin: function (origin, callback) {
      if (isWildcardOrigin || !origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  contentSecurityDirectives: {
    defaultSrc: isWildcardOrigin ? ["*"] : allowedOrigins,
    childSrc: ["'none'"],
    objectSrc: ["'none'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrcElem: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    imgSrc: ["'self'", "'unsafe-inline'"],
  },
  SESSION_EXPIRE_TIME: Number(process.env.SESSION_EXPIRE_TIME) || 10,
  OTP_EXPIRE_TIME: 5,
};

export default config;
