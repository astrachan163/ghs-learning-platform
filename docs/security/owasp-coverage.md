# OWASP Top 10 Coverage (Baseline)

| Risk | Status | Planned Mitigation | File(s) |
|------|--------|--------------------|---------|
| A01 Access Control | Planned | RBAC middleware | middleware/auth.ts |
| A02 Cryptographic Failures | Planned | crypto_examples | security/crypto_examples.ts |
| A03 Injection | Planned | Validation + escaping | middleware/validate.ts |
| A04 Insecure Design | Ongoing | Threat modeling | docs/threat-models/* |
| A05 Security Misconfig | Planned | Harden headers | backend/src/index.ts |
| A06 Vulnerable Components | Planned | CI SBOM + audit | workflows/security-ci.yml |
| A07 AuthN/AuthZ Failures | Planned | Token claim enforcement | services/roles.ts |
| A08 Integrity Failures | Planned | Manifest + hash | scripts/generate-release-manifest.sh |
| A09 Logging/Monitoring | Planned | logger + trace | utils/logger.ts |
| A10 SSRF | Not Applicable | Avoid arbitrary fetch | N/A |

(End of file)