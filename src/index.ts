import express from 'express';
import bodyParser from 'body-parser';
import { sentryWebhookMiddleware } from './middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('sentry-webhook', sentryWebhookMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});