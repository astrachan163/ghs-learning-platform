
# Incident Simulation Report: Unauthorized Role Change

- **Date:** 2025-09-24
- **Scenario:** P-1 - Unauthorized User Role Change
- **Participants (Simulated):** On-call Engineer

## 1. Simulation Overview

This exercise simulated a response to a report of a user's role being maliciously elevated to `admin`.

The on-call engineer was designated as the Incident Commander and followed the steps outlined in `docs/ir/runbook.md`.

## 2. Simulation Steps & Findings

-   **Triage:** The incident was classified as SEV-2. A simulated communication channel was established.
-   **Investigation:**
    -   The `executions` collection in Firestore was queried. **Finding:** The query was effective. A trace was successfully located showing that admin account `admin-test-01@platform.com` promoted user `student-test-05@platform.com` to `admin`.
    -   Firebase Auth logs were checked. **Finding:** The logs showed a successful login for the admin account from an unrecognized IP address shortly before the incident, indicating a likely credential compromise.
-   **Containment:**
    -   The `admin-test-01` account was successfully disabled in the Firebase console (simulated).
    -   The `revokeRefreshTokens` command was noted as the correct procedure for invalidating the session.
-   **Recovery:**
    -   The `student-test-05` account had its role reverted.
    -   A password reset was forced on the `admin-test-01` account.

## 3. Lessons Learned & Action Items

1.  **Clarity of Logs:** The structured JSON logs and execution traces were critical for a fast investigation. This confirms the value of the existing logging strategy.
2.  **Missing Information:** The execution trace for the `/auth/set-role` action did not include the request body (the target user ID and the new role). This made the query less direct. **Action Item:** Enhance the `recordExecution` service to optionally include a sanitized request body for critical audit events.
3.  **Proactive Alerting:** The incident was discovered via user report. This is too slow. **Action Item:** Plan for a cloud function or other mechanism to create a high-priority alert whenever `setCustomUserClaims` is called to grant an `admin` role.

## 4. Simulation Conclusion

The simulation was successful. The runbook was effective but revealed opportunities for improvement in logging detail and proactive alerting. The action items will be tracked as technical debt and prioritized in a future sprint.
