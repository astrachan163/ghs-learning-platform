
# Georgia Homeschool (GHS) Learning Platform - Foundational Backend

This repository contains the foundational backend, infrastructure, and security architecture for the Georgia Homeschool (GHS) Learning Platform.

**Note:** The purpose of this project is not to present a completed, user-facing application. Instead, its primary goal is to demonstrate a professional, "foundation-first" approach to software engineering, where security, governance, and architectural rigor are established *before* feature development begins.

This repository serves as tangible evidence of a mature DevSecOps methodology applied to a greenfield project.

---

## Project Overview

The GHS Learning Platform is a conceptual application designed to provide a parent-led, K-12 educational experience aligned with Georgia's state standards. This repository establishes the secure and scalable foundation upon which the full application would be built.

The entire development process, from initial commit to the final documentation, has been meticulously structured to follow industry best practices for a Secure Software Development Lifecycle (SDLC).

## Guided Tour & Evidence Collation

To fully understand the scope and methodology of this project, please begin with the master evidence document:

**[➡️ ADMISSIONS APPENDIX: A Guided Tour of the Repository](./docs/ADMISSIONS_APPENDIX.md)**

This central document provides a comprehensive narrative of the project's philosophy and links to all key architectural and security artifacts.

## Key Features of this Foundation

This is not just an empty code skeleton. The `main` branch contains a robust set of integrated, security-focused features:

*   **🔒 Security-First Architecture:** The project's commit history demonstrates that security artifacts (Threat Models, Governance Charters) were created before any application logic.
*   **⚙️ Automated Security CI/CD:** A GitHub Actions workflow (`.github/workflows/security-ci.yml`) automatically performs dependency auditing and security checks.
*   **🔑 Authentication & RBAC:** A complete authentication and Role-Based Access Control system using Firebase JWTs and custom middleware.
*   **🛡️ Proactive Threat Modeling:** A STRIDE-based threat model that was updated as new authentication features were added.
*   **📝 Architectural Decision Records (ADRs):** Formal documentation for key decisions, such as secrets management and the "foundation-first" approach.
*   **🚨 Incident Response Simulation:** A documented simulation of a security incident (`unauthorized role change`) to prove the effectiveness of the logging and response runbook.
*   **🏗️ Infrastructure as Code (IaC):** A baseline Terraform configuration for establishing critical cloud infrastructure, such as a central logging bucket.
*   **🧪 Security-Focused Testing:** Integration tests specifically designed to challenge input validation and prevent injection attacks.

## Navigating the Repository

*   **/docs**: The heart of the project. Contains all security, architecture, and governance documentation.
*   **/backend**: The Node.js (Express) backend service, built with TypeScript.
*   **/frontend**: A placeholder React/Vite application, ready for dashboard development.
*   **/infrastructure**: Terraform IaC for Google Cloud.
*   **Branches**: The numerous branches on this repository are a historical record of the development process, demonstrating the use of isolated feature, security, and documentation branches. The `main` branch represents the stable, integrated result of this work.

---

### Prior Prototype Lineage
This platform supersedes earlier exploratory repositories (like `adaptiveprep2`) which lacked early formal security artifacts. Architectural lessons were distilled here as first-class foundations.
