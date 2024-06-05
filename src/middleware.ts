import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { SQUIDALERTS_API_URL, SQUIDALERTS_API_KEY } from './config';

export const sentryWebhookMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sentryIssue = req.body;

        console.log('Received Sentry issue:', sentryIssue);

        await axios.post(`${SQUIDALERTS_API_URL}/sentry`, sentryIssue, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SQUIDALERTS_API_KEY}`
            }
        });

        res.status(200).send('Issue forwarded to SquidAlerts');
    } catch (error) {
        console.error('Error forwarding issue to SquidAlerts:', error);
        res.status(500).send('Error forwarding issue to SquidAlerts');
    }
};