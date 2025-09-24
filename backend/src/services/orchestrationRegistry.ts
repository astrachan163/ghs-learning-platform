
import { db } from '../config/firebase';
import { logger } from '../utils/logger';

const REGISTRY_COLLECTION = 'executions';

export interface ExecutionTrace {
  traceId: string;
  timestamp: FirebaseFirestore.FieldValue;
  method: string;
  path: string;
  headers: Record<string, string | string[] | undefined>;
  userId?: string;
}

/**
 * Records an execution trace in the Firestore registry.
 * Uses the traceId as the document ID to ensure idempotency.
 *
 * @param trace The execution trace data to record.
 */
export async function recordExecution(trace: Omit<ExecutionTrace, 'timestamp'>) {
  try {
    const docRef = db.collection(REGISTRY_COLLECTION).doc(trace.traceId);

    const traceWithTimestamp: ExecutionTrace = {
      ...trace,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await docRef.set(traceWithTimestamp);
  } catch (error) {
    logger.error('firestore_record_execution_failed', {
      traceId: trace.traceId,
      error: error instanceof Error ? error.message : String(error),
    });
    // We log the error but don't throw, as tracing should not fail the request.
  }
}

// We need to import admin for the FieldValue type.
// This is a bit of a workaround to avoid a circular dependency if db was in its own file.
import admin from 'firebase-admin';
