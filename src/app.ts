import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import prometheus from 'express-prometheus-middleware';
import 'dotenv/config';

import user from './routes/user';
import post from './routes/post';
import JWT from './routes/jwt';

const app = express();

const corsOptions = {
    origin: process.env.WEBSITE_URL ?? 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
};

app.disable('x-powered-by');

// Global Middleware
app.use(prometheus({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10_240, 51_200, 102_400],
    responseLengthBuckets: [512, 1024, 5120, 10_240, 51_200, 102_400]
}));
app.use(cors(corsOptions));
app.use(cookieParser());

// Routers
app.use('/user', user);
app.use('/post', post);
app.use('/jwt', JWT);

export default app;
