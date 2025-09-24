
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { UserRole } from '../services/roles';
import { logger } from '../utils/logger';

/**
 * Middleware factory to create a role-based access control middleware.
 * It checks if the authenticated user has one of the allowed roles.
 *
 * @param allowedRoles An array of UserRole enums that are permitted to access the route.
 * @returns An Express middleware function.
 */
export function hasRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const traceId = req.traceId;
    const user = req.user;

    if (!user || !user.role) {
      logger.warn('rbac_fail_no_role', { traceId, userId: user?.uid });
      return res.status(403).json({ message: 'Forbidden: No role assigned.' });
    }

    const userRole = user.role as UserRole;

    if (allowedRoles.includes(userRole)) {
      // User has one of the allowed roles, proceed
      next();
    } else {
      logger.warn('rbac_fail_insufficient_permission', { traceId, userId: user.uid, userRole, allowedRoles });
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }
  };
}
