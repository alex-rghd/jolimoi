import { Router } from 'express';
import romanRoutes from './roman.routes';

const router = Router();

router.use('/roman', romanRoutes);

export default router;