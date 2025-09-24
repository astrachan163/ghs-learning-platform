import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export function injectTraceId(req: Request, _res: Response, next: NextFunction) {
  const incoming = req.headers['x-trace-id'];
  (req as any).traceId = typeof incoming === 'string' && incoming.trim() !== '' ? incoming : uuid();
  next();
}