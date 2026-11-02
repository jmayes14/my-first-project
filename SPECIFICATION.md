# Site Specification

This describes what `docs/index.html` does today.

## Inputs
- **Search:** filters suppliers by material, part, company, or place, including
  materials further up their chain.
- **Country:** set with the menu or by clicking the globe.
- **Priority:** best traceability, small orders, or closest.

## Supplier ranking
Only pack assemblers and distributors are ranked, because those are the steps
where inventors can buy. Best traceability counts a confirmed link as one and a
likely link as a half. Small orders uses what sources say: single units, then
samples or small runs, then not stated. Closest uses straight-line distance from
the center of the visitor's country, which is not a delivery estimate.

## Globe
- The globe shows only the selected supply chain. A checkbox lets visitors add
  more chains. One chain is followed at a time, and the others are faded.
- Numbered shapes mark the five steps, with the city and country beside them.
  Labels hide when they would overlap.
- A numbered shape travels along the chain while the globe turns to follow it,
  and a caption explains each step. The route shown is the longest known path
  to the supplier.
- Dragging or zooming pauses the trip. Choosing a supplier or country, Play
  trip, or the reset button returns to the full globe.
- Zoom reaches 40x and centers on the cursor or fingers. The view flattens and
  switches to detailed map outlines as it closes in.

## Link styles
| Link | Style |
|---|---|
| Confirmed | Faint solid line with a moving arrow |
| Likely | Flashing line |
| Possible route to the visitor | Dotted line with a moving arrow, ending in a check mark |
| Unknown | No line; listed in the panel below the globe |

Line color matches the step the line leaves. Visitors who ask their device to
reduce motion see still lines.

## Supply chain panel
The panel describes the chosen supplier and lists each step of its chain, how
sure each link is, why, and its sources. Selecting a mine, refiner, or cell
maker explains that inventors usually cannot buy there and lists the suppliers
that trace back to it.

## Data
Records are in the page's script as `SOURCES`, `NODES`, and `LINKS`, and they
match `research/battery-supply-chain-snapshot-2026-11.json`. Prices, minimum
orders, and shipping appear only when a source states them. Sayari screening
flags are not shown, because many are product-level leads rather than findings
about a company.
