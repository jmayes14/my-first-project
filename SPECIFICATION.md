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
Given a selected supplier, when the page is idle, then a numbered shape travels
along the chain, the globe turns to follow it, and a caption explains each step.

**FR-10: Link styles (US-4)**
Given a chain on the globe, then confirmed links show a moving arrow, likely
links flash, the route to the visitor is dotted and ends in a check mark, and
unknown links have no line and appear in the panel below the globe.

**FR-11: Zoom (US-6)**
Given the globe, when a visitor scrolls, pinches, or uses the zoom buttons, then
the view zooms up to 40x around that spot, flattens, and switches to detailed
outlines. Scrolling over the globe does not scroll the page.

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
- **BR-6:** Traceability scores a confirmed link as 1 and a likely link as 0.5.
- **BR-7:** Distance is measured from the center of the visitor's country and is not a delivery estimate.
- **BR-8:** Sayari screening flags are not published.
- **BR-9:** Being listed is not an endorsement.

## Non-functional requirements
- **Performance:** one static page of about 1 MB, with no build step.
- **Accessibility:** cards, list items, and map markers work with a keyboard, and
  visitors who ask for reduced motion see still lines.
- **Devices:** works at 390x844 and on desktop with no sideways scrolling.
- **Privacy:** no accounts, cookies, or analytics.
- **Cost:** free hosting on GitHub Pages.
