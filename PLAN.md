# Plan

## Approach
Start with one component, publish what the evidence supports, and let inventors'
feedback decide what to research next. Lithium-ion batteries come first because
many hardware products need them and the vape project had already researched
their materials.

## Technical decisions
| Decision | Reason | Rejected |
|---|---|---|
| One static page | No build step, easy to host and change | A web app with a database, which is more than this stage needs |
| GitHub Pages from `main` and `/docs` | Free, and already set up | A paid host |
| D3 globe in SVG | Handles rotation, routes, and clicks with one library | A map service, which adds cost and accounts |
| Map outlines inside the page | Works without another data request | Downloading outlines at load |
| Records stored in the page | Simple while there are few records | A separate data file, for later |
| Show unpublished details as unknown | Keeps the site honest | Estimated prices and delivery times |
| Leave Sayari flags out | Many are product-level leads, not company findings | Publishing them with a caveat |

## Architecture and repository layout
- `docs/index.html`: the site, including styles, script, and records.
- `research/`: the research snapshot and its caveats.
- `scripts/`: local tools, not part of the site.
- `.vscode/mcp.json`: MCP servers for this project.
- `CONCEPT-IDEA.md`, `SPECIFICATION.md`, `PLAN.md`, `BACKLOG.md`: project documents.
- `REVIEW-CHECKLIST.md`: what reviewers check.

## Milestones
Each milestone ends in a demo.

| ID | Milestone | Demo | Status |
|---|---|---|---|
| M0 | Live page | The site loads at the public URL | Done |
| M1 | Globe prototype | Follow a sample chain from mine to inventor | Done |
| M2 | Real research | Follow a sourced chain with visible gaps | Done |
| M3 | Reviewed release | A reviewer approves the site and documents | Next |
| M4 | Inventor test | Two or three inventors try to find a supplier | Next |
| M5 | Small-order trace | One chain reaches a supplier that suits small orders | Later |
| M6 | Second material or component | Chosen from what inventors ask for | Later |

## Dependencies and blockers
- A reviewer is needed for M3.
- Access to inventors is needed for M4.
- Suppliers must answer questions about cell brands and minimum orders for M5.
- The Sayari license decides whether its references can stay on the public site.

## Environments
- **Local:** open `docs/index.html` in a browser.
- **Preview:** a pull request branch, checked before review.
- **Production:** https://jmayes14.github.io/my-first-project/

## Quality bar
- Every requirement in `SPECIFICATION.md` passes.
- The live site passes Playwright checks at 390x844 and desktop with no console errors.
- Every company and link has a source.
- A person reviews each change using `REVIEW-CHECKLIST.md`.

## Risks
| Risk | Effect | Response |
|---|---|---|
| A supply claim is wrong | Misleads inventors or harms a company | Show sources and evidence levels, and have a person review |
| Sayari license does not allow public use | References must come off | Check the license, and use public sources instead |
| Supplier details go out of date | Inventors act on old facts | Show the research date and refresh the snapshot |
| Companies do not reply | Gaps stay open | Keep showing them as unknown |
| Prompt injection through web research | An agent could act on bad instructions | Review tool calls and treat web content as data |

## Cut list
If time runs short, cut these first: more materials, more countries, and moving
records into a data file. Do not cut sources or visible gaps.
