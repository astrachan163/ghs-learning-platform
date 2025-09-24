
# ADR-0002: Adopt an Abstraction Layer for Secrets Management

## Status

Accepted

## Context

The application requires sensitive credentials (e.g., Firebase service account keys, database passwords, API keys) to operate. Storing these directly in the codebase or in version control is a major security risk (see Risk R-01). The method of providing these secrets differs between local development and deployed cloud environments.

We need a consistent way for the application to access secrets without being tightly coupled to the underlying storage mechanism.

## Decision

1.  **Application-Level Abstraction:** The application will access all secrets through a single, centralized module: `backend/src/config/secrets.ts`. This module reads secrets from environment variables (`process.env`).

2.  **Local Development:** For local development, secrets will be provided to the application by populating a `.env` file in the project root. This file is explicitly listed in `.gitignore` and will never be committed to version control.

3.  **Production Environments (Google Cloud):** In deployed environments (e.g., Cloud Run, GKE), secrets will be stored in **Google Secret Manager**. The infrastructure will be configured to fetch these secrets from Secret Manager and inject them into the application's runtime environment as environment variables. This is a common and secure pattern for cloud-native applications.

## Consequences

-   **Positive:**
    -   **Decoupling:** The application code is decoupled from the secret storage mechanism. We can change the production secret store (e.g., to HashiCorp Vault) with minimal changes to the application code.
    -   **Security:** Sensitive credentials are kept out of the source code repository.
    -   **Consistency:** The application always reads from environment variables, regardless of the environment.
    -   **Auditability:** Google Secret Manager provides audit logs for when secrets are accessed.

-   **Negative:**
    -   Requires infrastructure configuration to map secrets from the chosen provider to environment variables in the runtime.

## Security Considerations

-   Access to the production secret store (Google Secret Manager) must be tightly controlled via IAM policies, adhering to the principle of least privilege.
-   The local `.env` file remains a sensitive file and developers must be instructed on its proper handling.
