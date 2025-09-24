
import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { setUserRole, UserRole } from '../services/roles';
import { setRoleSchema } from '../schemas/authSchemas';
import { logger } from '../utils/logger';
import { hasRole } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';

const router = Router();

/**
 * @route POST /auth/set-role
 * @description Assigns a role to a user. Requires admin privileges.
 * @access Private (Admin only)
 */
router.post(
  '/set-role',
  requireAuth,
  hasRole([UserRole.ADMIN]),
  validateBody(setRoleSchema),
  async (req: AuthenticatedRequest, res: Response) => {
    const traceId = req.traceId;
    const { uid: adminUid } = req.user!;
    const { uid, role } = req.body;

    try {
      await setUserRole(uid, role);
      logger.info('user_role_set', { traceId, adminUid, targetUid: uid, role });
      res.status(200).json({ message: `Role '${role}' successfully assigned to user ${uid}.` });
    } catch (error: any) {
      logger.error('set_role_failed', { traceId, adminUid, targetUid: uid, error: error.message });
      res.status(500).json({ message: 'Failed to set user role.', error: error.message });
    }
  }
);

export default router;
