# Inventor Sourcing Map

An interactive globe that helps inventors and early startups answer two
questions: who can supply what I need from where I am, and where do that
supplier's materials come from?

A five-stage map explains what the evidence shows at each step, from mines to
distributors, and what is still unknown. Below it, visitors choose their country
and priority on the globe. The site ranks suppliers for them and
follows each selected supply chain as far back as the evidence goes.

## Current status

The site lists 28 real suppliers from a November 2026 research snapshot, covering
batteries, electronic parts, circuit boards, 3D printing and machining, metals,
and motors. Batteries have the deepest research, including one traced chain from
the Salar de Atacama in Chile, through SQM's Carmen plant and LG Energy Solution,
to American Battery Solutions in Michigan. Most other suppliers do not yet trace
back to raw materials. Links show evidence between organizations; they do not
prove what is inside a particular product.

No chain yet runs from a mine to a supplier that clearly serves small orders.
Prices, minimum orders, and shipping are shown only when a source states them,
so inventors should confirm them with each company. A gap must not be read as
evidence that a chain is clean or risky.

The records, identifiers, and caveats are in
[research/battery-supply-chain-snapshot-2026-11.json](./research/battery-supply-chain-snapshot-2026-11.json).

## How to read the map

| Shape | Step |
|---|---|
| Triangle (1) | Mine |
| Diamond (2) | Refiner |
| Square (3) | Cell maker |
| Circle (4) | Pack assembler, where inventors can buy |
| Star (5) | Distributor, where inventors can buy |

A moving arrow marks a confirmed link, and a flashing line marks a likely one.
A dotted line with an arrow and a check mark shows a possible route to the
inventor. Unknown links have no line and appear in the panel below the map.

## Project files

- [Concept and project boundaries](./CONCEPT-IDEA.md)
- [Prototype specification](./SPECIFICATION.md)
- [Implementation plan](./PLAN.md)
- [Backlog](./BACKLOG.md)
- [Published site source](./docs/index.html)

The site is one file in `docs/`, published with GitHub Pages at
<https://jmayes14.github.io/my-first-project/>. It has no build step. It loads
D3 and topojson-client from public CDNs, and the map outlines are embedded in
the page.

## Earlier project

This repository previously held a vape supply-chain map. It is saved under the
git tag `vape-map-final`.

## Sayari API access (local only)

`scripts/check_sayari.py` confirms that Sayari API credentials work. It uses
only the Python standard library and is not part of the published site.

1. Copy `.env.example` to `.env` and add your Sayari client ID and secret.
   `.env` is gitignored; never commit it.
2. Run `python3 scripts/check_sayari.py`.

It requests a token and reads the account's usage summary. It does not run
searches or add any data to the map. The site links to a few Sayari records;
check that your Sayari license allows this.
