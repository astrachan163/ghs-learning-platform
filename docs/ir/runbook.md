# Incident Response Runbook (v0.2)

This document provides actionable procedures for responding to security incidents. It is a living document and will be updated as the system evolves.

## 1. Incident Commander

The on-call engineer is the default Incident Commander (IC) until the incident is escalated.

## 2. Severity Levels

-   **SEV-1 (Critical):** System-wide impact, data breach, or loss of service.
-   **SEV-2 (High):** Significant feature failure, partial data loss, or security vulnerability.
-   **SEV-3 (Medium):** Minor feature failure, isolated issue.
-   **SEV-4 (Low):** Cosmetic issue, documentation error.

---

## Playbook: P-1 - Unauthorized User Role Change (SEV-2)

This playbook is activated when a user reports that their role has been changed without authorization, or when an alert fires for a suspicious role change.

### 1. Triage & Assessment

-   **Declare Incident:** Create a communication channel (e.g., Slack room) and start an incident document.
-   **Confirm Report:** Contact the reporting user to confirm the details of the unauthorized change.
-   **Assess Impact:** Determine the user's original and new role. An escalation from `student` to `admin` is a critical vulnerability.

### 2. Investigation

-   **Query Execution Registry:** The primary source of truth is the `executions` collection in Firestore. Filter for documents where the `targetUid` matches the affected user's ID.
    -   **Query:** `db.collection('executions').where('body.uid', '==', '[AFFECTED_USER_ID]').where('path', '==', '/auth/set-role').get()`
    -   **Analyze:** Examine the `traceId`, `timestamp`, and especially the `adminUid` from the trace to identify which administrator account performed the action.
-   **Check Authentication Logs:** In the Google Cloud console, review Firebase Authentication logs for the `adminUid` identified in the previous step. Look for suspicious login events (e.g., multiple failed logins, logins from unusual IP addresses or locations).
-   **Review Admin Activity:** Query the `executions` collection for all recent actions performed by the suspect `adminUid` to determine if other unauthorized actions have occurred.

### 3. Containment

-   **Disable Suspect Account:** In the Firebase Auth console, immediately disable the account that performed the unauthorized action (the `adminUid`). This prevents further malicious activity.
-   **Force Sign-out:** Force a token revocation for the disabled account to invalidate any active sessions.
    -   `admin.auth().revokeRefreshTokens(adminUid)`
-   **Revert Role Change:** Manually or using a trusted admin account, revert the affected user's role to its correct state.

### 4. Eradication & Recovery

-   **Secure Compromised Account:** Once the threat is contained, begin the recovery process for the compromised admin account. This involves forcing a password reset and requiring multi-factor authentication (MFA) to be re-established.
-   **Verify System Integrity:** Run checks to ensure no other unauthorized changes were made by the compromised account.

### 5. Post-Mortem & Follow-up

-   **Root Cause Analysis (RCA):** Conduct a post-mortem to determine the root cause of the incident (e.g., compromised admin credentials via phishing, weak password, etc.).
-   **Improve Alerting:** Implement or improve alerts for sensitive actions. For example, an alert should fire whenever a user's role is changed to `admin`.
-   **Update Documentation:** Update this runbook and any other relevant documentation with lessons learned.