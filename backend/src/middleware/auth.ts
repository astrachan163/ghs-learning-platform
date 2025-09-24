
import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

// Extend the Express Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized: No token provided.' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  if (!idToken) {
    return res.status(401).send({ message: 'Unauthorized: Malformed token.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying auth token:', error);
    return res.status(401).send({ message: 'Unauthorized: Invalid token.' });
  }
}
