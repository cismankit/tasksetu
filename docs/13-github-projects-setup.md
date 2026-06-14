# GitHub Projects Setup — TaskSetu Product OS

## Create project
1. GitHub repo → **Projects** → **New project**
2. Name: **TaskSetu Product OS**
3. Template: **Board** or **Table**

## Recommended views

| View | Filter | Purpose |
|------|--------|---------|
| Inbox | Status = Idea | Un triaged inputs |
| Opportunity Map | Label `type: idea` | Prioritize pain points |
| MVP Sprint | `stage: mvp` + In Progress | Current sprint |
| Regional Packs | Label `region: mp` | MP template work |
| Design Sprint | `type: design` | Figma, UX |
| Engineering Sprint | `type: engineering` | Build tasks |
| Research | `type: research` | Validation |
| Launch | Milestone = Launch | GTM tasks |
| Roadmap | Group by Release | Quarterly planning |

## Custom fields
- **Status:** Idea → Researching → Validated → Ready for Design → Ready for Build → In Progress → Testing → Launched → Rejected
- **Priority:** high / medium / low
- **Region:** india / mp / global
- **User Type:** student, parent, shopkeeper, etc.
- **Task Category:** documents, forms, reminders, etc.
- **Complexity:** S / M / L
- **MVP Fit:** yes / no / partial
- **Evidence Level:** anecdotal / interviewed / validated
- **Owner:** assignee
- **Target Date:** date
- **Release:** mvp / beta / v1

## Labels to create
```
type: idea, feature, research, design, engineering, content, bug
region: india, mp, global
user: student, parent, shopkeeper, farmer, gig-worker, senior-citizen, family
module: documents, forms, reminders, payments, status-tracker, whatsapp, recommendations
priority: high, medium, low
stage: mvp, beta, v1
```

## Import first issues
Copy from `product/first-issues.md` into GitHub Issues, then add to project via bulk select.

## Automation (optional)
- Auto-add issues with `stage: mvp` to MVP Sprint
- Move to Testing when PR linked
- Move to Launched when release tag cut
