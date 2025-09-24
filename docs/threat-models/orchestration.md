# Threat Model: Orchestration (v0.2)

This document outlines the threat model for the orchestration backend service, updated to include authentication and role management capabilities.

## Current Scope (Sprint 1 & 2)
- **Authentication:** Firebase JWT verification.
- **Authorization:** Admin-only endpoint `/auth/set-role` for setting user roles.
- **Traceability:** All requests are assigned a `traceId` and recorded in a Firestore `executions` collection.

## Assets
- **User Accounts:** Managed by Firebase Auth. Contains user UID, email, etc.
- **User Roles:** Stored as custom claims on the Firebase user object (e.g., `admin`, `teacher`, `parent`).
- **JSON Web Tokens (JWTs):** Short-lived bearer tokens issued by Firebase used to authenticate users.
- **Execution Traces:** Firestore documents containing request metadata, linked to a `userId` if authenticated.

## Threats (STRIDE Model)

| Category | Threat Description | Mitigation | Status |
| :--- | :--- | :--- | :--- |
| **S**poofing | An attacker steals a user's JWT to impersonate them and access the system. | - Use of short-lived JWTs (managed by Firebase).<br>- Communication over HTTPS to prevent token interception. | Mitigated |
| **T**ampering | An attacker modifies the claims within a JWT (e.g., changing their role to `admin`). | - JWT signature verification on every authenticated request (`requireAuth` middleware). The server will reject any tampered token. | Mitigated |
| **T**ampering | A malicious or compromised admin user changes another user's role to an incorrect or harmful value. | - The `/auth/set-role` endpoint is protected and requires the `admin` role.<br>- All executions are traced, providing an audit log of which admin performed the action (though the trace currently lacks the request body). | Partially Mitigated |
| **R**epudiation | A malicious admin denies changing a user's role. | - The execution trace in Firestore logs the `userId` of the authenticated user making the request, providing an audit trail. | Partially Mitigated |
| **I**nformation Disclosure | An attacker intercepts a JWT, exposing the user's UID and role claims. | - Communication exclusively over HTTPS.<br>- JWTs contain minimal, non-sensitive information (no PII). | Mitigated |
| **I**nformation Disclosure | An attacker gains access to the `executions` collection in Firestore, viewing request metadata. | - Firestore security rules must be configured to restrict read access to the `executions` collection to authorized personnel only. | Open |
| **D**enial of Service | An attacker floods the `/auth/set-role` endpoint with valid (but unauthorized) requests, causing high server load. | - The endpoint requires authentication and admin authorization, limiting the attack surface.<br>- Future: Implement rate limiting on sensitive endpoints. | Partially Mitigated |
| **E**levation of Privilege | A non-admin user successfully calls the `/auth/set-role` endpoint to elevate their own or another user's privileges. | - The `hasRole(['admin'])` RBAC middleware explicitly checks the `role` claim in the user's validated JWT, preventing unauthorized access. | Mitigated |
| **E**levation of Privilege | An attacker successfully passes a malicious payload (e.g., NoSQL injection) through the `/auth/set-role` endpoint to tamper with the database. | - Zod schema validation in the `validateBody` middleware ensures that the `uid` and `role` fields are simple strings, rejecting any object-based injection attempts. Security tests verify this. | Mitigated |

(End of file)