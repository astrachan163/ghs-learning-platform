
import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { setUserRole, UserRole } from '../services/roles';
import { setRoleSchema } from '../schemas/authSchemas';
import { logger } from '../utils/logger';
import { hasRole } from '../middleware/rbac';

const router = Router();

/**
 * @route POST /auth/set-role
 * @description Assigns a role to a user. Requires admin privileges.
 * @access Private (Admin only)
 */
router.post('/set-role', requireAuth, hasRole([UserRole.ADMIN]), async (req: AuthenticatedRequest, res: Response) => {
  const traceId = req.traceId;
  const { uid: adminUid } = req.user!;

  // 1. Validate request body
  const validation = setRoleSchema.safeParse(req.body);
  if (!validation.success) {
    logger.warn('set_role_validation_failed', { traceId, errors: validation.error.issues });
    return res.status(400).json({ message: 'Invalid request body', errors: validation.error.issues });
  }

  const { uid, role } = validation.data;

  try {
    // 2. Call the service to set the role
    await setUserRole(uid, role);
    logger.info('user_role_set', { traceId, adminUid, targetUid: uid, role });
    res.status(200).json({ message: `Role '${role}' successfully assigned to user ${uid}.` });
  } catch (error: any) {
    logger.error('set_role_failed', { traceId, adminUid, targetUid: uid, error: error.message });
    res.status(500).json({ message: 'Failed to set user role.', error: error.message });
  }
});

export default router;
