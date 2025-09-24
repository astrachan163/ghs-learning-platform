import { recordExecution } from '../services/orchestrationRegistry';
import { AuthenticatedRequest } from './auth';

export function injectTraceId(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const incoming = req.headers['x-trace-id'];
  const traceId = typeof incoming === 'string' && incoming.trim() !== '' ? incoming : uuid();

  // Assign traceId to the request object for downstream use
  req.traceId = traceId;

  // Record the execution in a fire-and-forget manner
  recordExecution({
    traceId,
    method: req.method,
    path: req.path,
    headers: req.headers,
    userId: req.user?.uid, // Will be undefined if auth middleware hasn't run yet
  });

  next();
}