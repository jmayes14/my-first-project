# Prototype Specification

This describes what `docs/index.html` does today.

## Inputs
- **Search:** filters suppliers by material, part, company, or place, including
  materials further up their chain.
- **Country:** set with the menu or by clicking the globe.
- **Quantity:** 1, 10, 100, or 1,000 units.
- **Priority:** best overall, lowest cost, fastest delivery, or best
  traceability.

## Supplier ranking
Only pack assemblers and distributors are ranked, because those are the steps
where inventors can buy. Suppliers that cannot ship to the chosen country, or
whose minimum order is too high, are listed below the matches with the reason.

## Globe
- The globe shows only the selected supply chain. A checkbox lets visitors add
  more chains. One chain is followed at a time, and the others are faded.
- Numbered shapes mark the five steps, with the city and country beside them.
  Labels hide when they would overlap.
- A numbered shape travels along the chain while the globe turns to follow it,
  and a caption explains each step. The route shown is the longest known path
  from a mine to the supplier.
- Dragging or zooming pauses the trip. Choosing a supplier or country, Play
  trip, or the reset button returns to the full globe.
- Zoom reaches 40x and centers on the cursor or fingers. The view flattens and
  switches to detailed map outlines as it closes in.

## Link styles
| Link | Style |
|---|---|
| Confirmed | Faint solid line with a moving arrow |
| Likely | Flashing line |
| Delivery | Dotted line with a moving arrow, ending in a check mark |
| Unknown | No line; listed in the panel below the globe |

Line color matches the step the line leaves. Visitors who ask their device to
reduce motion see still lines.

## Supply chain panel
The panel lists every step of the followed chain and how sure each link is.
Selecting a mine, refiner, or cell maker explains that inventors usually cannot
buy there and lists the suppliers that trace back to it.

## Data
Sample records are in the page's script as `NODES` and `LINKS`. They are made
up, and the site says so in a banner. Delivered cost and delivery time are
simple distance estimates, and shipping reach is a distance limit.
