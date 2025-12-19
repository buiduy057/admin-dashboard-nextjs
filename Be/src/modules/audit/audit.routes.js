import { Router } from 'express';
import auth from '../../middlewares/auth.middleware.js';
import { checkRole } from '../../middlewares/role.middleware.js';
import { getAuditLogs } from './audit.controller.js';


const router = Router();
router.get("/", auth, checkRole(['ADMIN']), getAuditLogs);

export default router;
