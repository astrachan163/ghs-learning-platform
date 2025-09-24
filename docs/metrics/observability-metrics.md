# Observability Strategy (v0.2)

This document outlines the strategy for logging, metrics, and tracing to ensure the system is observable, secure, and performant.

## 1. Structured Logging

All log output is structured as JSON to enable easy parsing, searching, and analysis by a logging provider (e.g., Google Cloud Logging, Datadog).

The core logger (`utils/logger.ts`) produces logs with a consistent format:

```json
{
  "level": "info",
  "message": "user_role_set",
  "ts": "2025-09-24T18:00:00.000Z",
  "traceId": "unique-trace-id",
  "adminUid": "admin-user-id",
  "targetUid": "user-id-that-was-changed",
  "role": "student"
}
```

Key log messages include:
- `backend_started`: Service startup.
- `health_check`: Health probe access.
- `set_role_validation_failed`: A request to a sensitive endpoint failed schema validation.
- `admin_role_required`: A non-admin attempted to access an admin-only endpoint.
- `user_role_set`: An admin successfully changed a user's role (audit trail).
- `set_role_failed`: An error occurred during a role change operation.

## 2. Execution Tracing

Every request is assigned a unique `traceId` which is logged with all related messages. The full request metadata is recorded in the `executions` collection in Firestore, providing a complete audit trail.

This allows us to trace the full lifecycle of a request through the system.

## 3. Key Metrics

The following metrics are critical for monitoring the health and security of the application. They can be derived from structured logs or emitted directly by the application in the future.

### Security Metrics
| Metric | Description | Log Source / Emitter |
| :--- | :--- | :--- |
| `auth.token.validation.failure` | Count of invalid JWTs presented to the system. A spike could indicate an attempt to breach authentication. | `middleware/auth.ts` |
| `auth.token.missing` | Count of requests to protected endpoints that are missing a bearer token. | `middleware/auth.ts` |
| `rbac.access.denied` | Count of times a validly authenticated user was denied access to a resource due to insufficient role permissions. | `middleware/rbac.ts` |
| `admin.action.count` | Count of sensitive administrative actions, such as `user_role_set`. Provides an audit and velocity check on admin activity. | `routes/authRoutes.ts` |
| `validation.failure.rate` | The percentage of requests that fail schema validation. A high rate could indicate a malfunctioning client or an attack. | `middleware/validate.ts` |

### Performance & Reliability Metrics
| Metric | Description | Log Source / Emitter |
| :--- | :--- | :--- |
| `request.latency.p95` | The 95th percentile of request-response latency. | API Gateway / Load Balancer |
| `http.status.5xx.rate` | The rate of server-side errors (500-599). | API Gateway / Load Balancer |
| `http.status.4xx.rate` | The rate of client-side errors (400-499, excluding auth failures). | API Gateway / Load Balancer |
| `firestore.write.latency` | Latency for writing documents to the `executions` collection. | `services/orchestrationRegistry.ts` |

(End of file)