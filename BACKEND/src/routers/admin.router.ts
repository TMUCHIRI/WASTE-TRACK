import express from 'express';
import { getAdminAnalytics } from '../controllers/admin.controller';

const admin_router = express.Router();

admin_router.get('/analytics', getAdminAnalytics);

export default admin_router;