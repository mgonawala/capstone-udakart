import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import { AuthRouter, requireAuth } from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

// Health check URL
router.get('/healthz', async (req: Request, res: Response) => {
    console.log('Health Check');
    res.status(200).send('OK');
});

router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await User.findByPk(id);
    res.send(item);
});

export const UserRouter: Router = router;