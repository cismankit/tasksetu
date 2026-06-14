# MP Regional Pack Research

## Official portals (reference links, not integrations)
| Service | Portal |
|---------|--------|
| e-District MP | https://mpedistrict.gov.in/ |
| MP Scholarship | https://scholarshipportal.mp.gov.in/ |
| MPBSE | https://mpbse.nic.in/ |

## Certificate workflows

### Income certificate
- **Authority:** Tehsildar / e-District
- **Typical docs:** Aadhaar, income proof, address proof, photo
- **Validity:** Usually 1 financial year
- **Pain:** Users apply without current-year income proof

### Caste certificate
- **Categories:** SC/ST/OBC
- **Typical docs:** Birth cert, parent caste cert, affidavit
- **Pain:** First-time verification delays

### Domicile
- **Use cases:** State quota admissions, government jobs
- **Typical docs:** 3+ years residence proof, voter ID, school records

### Scholarship pack
- Combines income + caste + marksheet + bank linkage
- Deadlines vary by scheme — reminder-critical

### Student exam pack
- MPBSE board exams + counselling document verification
- Original + photocopy requirement often missed

## Templates shipped in core
See `packages/core/src/region-engine/templates/mp-regional.ts`

## Validation TODO
- 5 student interviews in Bhopal/Indore
- Verify fee amounts and processing times annually
- District-specific Tehsil notes (Phase 2 regional depth)
