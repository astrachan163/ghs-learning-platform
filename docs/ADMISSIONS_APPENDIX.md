
# Admissions Appendix: A Guided Tour of Foundational Security

## 1. Introduction

This document serves as a guided tour of the `georgia-homeschool-platform` repository, specifically for the purpose of academic review. It provides a narrative and collates evidence to demonstrate a deliberate, security-first approach to modern software engineering. The goal is to show not just *what* was built, but *how* and *why* it was built in a manner that aligns with professional DevSecOps best practices.

## 2. The "Foundation-First" Philosophy

The most critical decision made at the project's inception was to establish a comprehensive security and governance baseline *before* implementing any application features. This "foundation-first" approach is documented in [**ADR-0001: Initialize with Foundation-First Structure**](./architecture/adr/adr-0001-initialize-foundation-first.md).

By creating architectural decision records, threat models, CI pipelines, and security documentation from the very first commit, the project established a culture of security as a prerequisite, not an afterthought.

## 3. Evidence of Secure Development Practices

The following table maps key secure development concepts to the artifacts and code within this repository.

| Security Concept | Evidence & Artifacts |
| :--- | :--- |
| **Threat Modeling as Code** | The project includes a living threat model ([`docs/threat-models/`](./threat-models/)) that is updated with each new feature. This proactive approach to identifying risks is demonstrated by the [**Incident Response Simulation**](./ir/simulation-2025-09-24-role-change.md), where the threat model was used to create a realistic test scenario. |
| **Secure Authentication** | Authentication is handled using industry-standard JWTs via Firebase. A dedicated middleware ([`backend/src/middleware/auth.ts`](../backend/src/middleware/auth.ts)) is responsible for validating tokens on every protected request, ensuring that unauthenticated users cannot access sensitive endpoints. |
| **Secure Authorization (RBAC)** | Authorization is implemented via Role-Based Access Control. A generic `hasRole` middleware ([`backend/src/middleware/rbac.ts`](../backend/src/middleware/rbac.ts)) checks for specific role claims within a user's token, enforcing the Principle of Least Privilege. |
| **Input Validation & Injection Resistance** | A centralized validation middleware ([`backend/src/middleware/validate.ts`](../backend/src/middleware/validate.ts)) uses Zod schemas to strictly enforce the shape and type of all incoming data. This is the primary defense against injection attacks. The effectiveness of this control is verified by [**security tests**](../backend/src/tests/security/injection.test.ts). |
| **Traceability and Auditing** | Every request is assigned a unique `traceId` by [`backend/src/middleware/trace.ts`](../backend/src/middleware/trace.ts). This ID is used in all structured logs and is recorded in a central `executions` collection in Firestore by the [**Orchestration Registry Service**](../backend/src/services/orchestrationRegistry.ts). This provides a robust audit trail for all system activity. |
| **Secrets Management** | The secrets management strategy is formally documented in [**ADR-0002**](./architecture/adr/adr-0002-secrets-management.md). The application uses an abstraction layer ([`backend/src/config/secrets.ts`](../backend/src/config/secrets.ts)) to read secrets from environment variables, decoupling the code from the storage mechanism (e.g., local `.env` file vs. Google Secret Manager in production). |
| **Infrastructure as Code (IaC)** | All cloud infrastructure, such as the central logging bucket, is defined declaratively using Terraform in the [`infrastructure/`](../infrastructure/) directory. This ensures a repeatable, auditable, and version-controlled environment. |
| **CI/CD Security & Supply Chain** | The CI pipeline ([`.github/workflows/security-ci.yml`](../.github/workflows/security-ci.yml)) automatically runs a dependency audit (`npm audit`) and generates a Software Bill of Materials (SBOM) on every build, helping to secure the software supply chain. |
| **Incident Response Preparedness** | The project includes a detailed [**Incident Response Runbook**](./ir/runbook.md) with specific playbooks for potential security events. This plan was proactively tested in a [**simulated incident**](./ir/simulation-2025-09-24-role-change.md), demonstrating operational readiness. |
| **OWASP Top 10 Coverage** | A dedicated document, [`docs/security/owasp-coverage.md`](./security/owasp-coverage.md), explicitly maps the implemented controls back to the OWASP Top 10 2021 risks. |

## 4. Evolution From Prototype

This repository represents a professional evolution of ideas that originated in earlier, more experimental projects (e.g., `adaptiveprep2`). Those prototypes served to validate core concepts but lacked the rigorous, secure foundation established here. The decision to start a new repository was a deliberate choice to build a platform from the ground up using industry best practices, rather than attempting to retrofit security onto an existing codebase.

## 5. Conclusion

This repository is designed to be a testament to a modern, professional, and secure software development lifecycle. Every step, from the initial commit to the implementation of features, has been taken with intention and a focus on creating a robust, trustworthy, and well-documented platform.
