# Specification

This describes what `docs/index.html` must do. If the site and this document
disagree, update one of them in a pull request.

## Goals
- Help an inventor find a real company they could approach for lithium-ion batteries.
- Show how far each supplier can be traced toward the mine.
- Make evidence, sources, and gaps easy to see.

## Non-goals
- Selling, ordering, payment, or price quotes
- Legal or compliance findings about any company
- Full coverage of every material, country, or supplier

## Roles and permissions
| Role | Can do |
|---|---|
| Visitor | Use the public site. No account is needed. |
| Maintainer | Change content through a reviewed pull request. |
| Reviewer | Approve or request changes using `REVIEW-CHECKLIST.md`. |

## User stories
- **US-1:** As an inventor, I want to see who I could approach from my country.
- **US-2:** As an inventor, I want to know which suppliers suit small orders.
- **US-3:** As an inventor, I want to see where a supplier's materials come from.
- **US-4:** As an inventor, I want to know how sure each supply link is.
- **US-5:** As a visitor, I want to check the sources behind a claim.
- **US-6:** As a visitor, I want to look closely at shapes that sit near each other.

## Functional requirements

**FR-1: Stage evidence (US-3, US-5)**
Given the stage map, when a visitor selects a stage, then the page shows that
stage's summary, what the evidence says, what is still unknown, and its sources.

**FR-2: Topic filters (US-3)**
Given the stage map, when a visitor selects a topic, then stages outside that
topic are dimmed.

**FR-3: Country (US-1)**
Given the globe section, when a visitor picks a country from the menu or clicks
it on the globe, then suppliers rank for that country and the top supplier is
selected.

**FR-4: Priority (US-1, US-2)**
Given the supplier list, when a visitor changes what matters most, then the list
sorts by traceability, small orders, or distance.

**FR-5: Search (US-1)**
Given the globe section, when a visitor searches, then the list shows suppliers
matching the term, including materials further up their chain.

**FR-6: No search results (US-1)**
Given a search with no matches, when the results update, then the page says so
and suggests terms that work.

**FR-7: One supply chain (US-3)**
Given the supplier list, when a visitor selects a supplier, then the globe shows
only that supplier's chain.

**FR-8: Several supply chains (US-3)**
Given the option to show more than one chain is on, when a visitor ticks
suppliers, then each chain appears, the latest is followed, and the rest are
faded.

**FR-9: Moving trip (US-3)**
Given a selected supplier, then a numbered shape travels slowly along the chain
once, an arrow leads it on confirmed links, the globe turns gently to follow, and
a caption explains each step. The trip does not zoom on its own. Afterward, the
globe drifts slowly and offers Play again.

**FR-10: Link styles (US-4)**
Given a chain on the globe, then confirmed links show an arrow, likely links
pulse slowly, the route to the visitor is dotted and ends in a check mark after
the trip, and unknown links have no line and appear in the panel below the globe.

**FR-11: Zoom (US-6)**
Given the globe, when a visitor pinches, holds Ctrl or Cmd and scrolls, or uses
the zoom buttons, then the view zooms up to 40x around that spot, flattens, and
switches to detailed outlines. Plain scrolling moves the page and shows a short
hint.

**FR-12: Pause and reset (US-6)**
Given a moving trip, when a visitor drags or zooms, then the trip pauses. When
they press Play trip or reset, then the full globe returns.

**FR-13: Sources (US-5)**
Given any supplier or link, then its sources are one click away, and the page
lists every source.

**FR-14: Companies that cannot sell directly (US-3)**
Given a mine, refiner, or cell maker on the globe, when a visitor selects it,
then the panel explains that inventors usually cannot buy there and lists the
suppliers that trace back to it.

**FR-15: Category picker (US-1)**
Given the globe section, when a visitor picks what they are building, then the
list shows suppliers in that category and a starting tip appears.

**FR-16: Every supplier on the globe (US-1)**
Given the option to show every supplier is on, then all listed suppliers appear
on the globe, and selecting one follows its chain.

**FR-17: Parallax (US-1)**
Given the hero, when a visitor scrolls, then background layers and shapes move
at different speeds while evidence and supplier content stays steady.

**FR-18: Globe speed (US-6)**
Given the globe, when a visitor picks Slow, Medium, or Fast, then the trip, the
globe's turning, and the likely-link pulse change speed. Slow is the default, and
the choice is remembered on that device.

**FR-19: Where materials come from (US-3)**
Given a material, when a visitor selects it, then the page shows top mining
countries and Department of Labor evidence, and the globe shades those countries
and outlines any with confirmed labor entries.

**FR-20: Ethical sourcing check (US-4)**
Given a supplier, then the panel shows what it has published about ethical
sourcing, from an independent audit to nothing found, with sources.

**FR-21: Menu (US-5)**
Given any page, then a menu stays at the top with links to each section and the
methodology page. On phones it opens from a Menu button.

**FR-22: Methodology (US-5)**
Given the methodology page, then a visitor can read where information comes from,
how links and ethics checks are rated, how Sayari is used, and how to report a
mistake.

**FR-23: Source dates (US-5)**
Given any source, then the page shows when it was published and when this project
found it. Sources from 2023 or earlier are marked older, and a page with no date
says so.

## Screens
- **Hero:** title, purpose, and research date.
- **Stage map:** filters, five stage cards, and the evidence panel.
- **Globe:** search, country and priority menus, supplier list, and supply chain panel.
- **Notes:** limits, how to read the trail, and all sources.
- **Empty state:** no search results (FR-6).
- **Error state:** without JavaScript or the map libraries, the globe and stage
  cards do not appear. There is no custom error message yet.

## Data model
Records live in `docs/index.html` and match
`research/battery-supply-chain-snapshot-2026-11.json`.

| Record | Fields |
|---|---|
| `SOURCES` | Label and URL |
| `NODES` | Name, stage, what it handles, place, coordinates, description, sources, and small-order notes for suppliers |
| `LINKS` | From, to, evidence level, note, and sources, or a gap description |
| `STAGE_NOTES` | Status, topics, summary, evidence, unknowns, and sources |

## Business rules
- **BR-1:** Confirmed means a named source states the link.
- **BR-2:** Likely means evidence points to the link but does not establish that step.
- **BR-3:** Unknown means not established here. A gap is never shown as clean or risky.
- **BR-4:** A link describes organizations, not what is inside a particular battery.
- **BR-5:** Prices, minimums, and shipping appear only when a source states them.
- **BR-6:** Best traceability ranks the longest known chain first, then scores a confirmed link as 1 and a likely link as 0.5.
- **BR-7:** Distance is measured from the center of the visitor's country and is not a delivery estimate.
- **BR-8:** Sayari screening flags are not published.
- **BR-9:** Being listed is not an endorsement.
- **BR-15:** Names of individual owners are not published.
- **BR-16:** A serious trade link is left out when the goods cannot be seen.
- **BR-12:** The site never rates a company as ethical or unethical, and it does not claim to prove ethical sourcing.
- **BR-13:** Nothing found means no public statement was found. It is not evidence of poor sourcing.
- **BR-14:** A labor listing applies to a good and country, not to all production there or to a listed supplier.
- **BR-10:** Starting tips are advice and are not presented as sourced facts.
- **BR-11:** A marketplace's place is the company's location, not where parts are made.

## Non-functional requirements
- **Performance:** one static page of about 1 MB, with no build step.
- **Accessibility:** cards, list items, and map markers work with a keyboard, and
  visitors who ask for reduced motion get no parallax, trip, or moving lines.
- **Devices:** works at 390x844 and on desktop with no sideways scrolling.
- **Privacy:** no accounts, cookies, or analytics. The speed choice stays in the visitor's browser.
- **Cost:** free hosting on GitHub Pages.
