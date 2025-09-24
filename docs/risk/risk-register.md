# Risk Register (Baseline)

| ID | Category | Description | Likelihood | Impact | Mitigation | Status |
|----|----------|-------------|------------|--------|------------|--------|
| R-01 | Secrets | Accidental commit of keys | Medium | High | secrets wrapper + scanning | Open |
| R-02 | Injection | Unvalidated request body | Medium | Medium | validation middleware | Planned |
| R-03 | Supply Chain | Malicious dependency | Medium | High | SBOM + audit CI | Open |

(End of file)