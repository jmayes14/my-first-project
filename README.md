# Inventor Sourcing Map

An interactive globe that helps inventors and early startups answer two
questions: who can supply what I need from where I am, and where do that
supplier's materials come from?

Visitors choose their country, order size, and priority. The site ranks
suppliers for them and follows the selected supply chain from the mine to the
inventor.

## Current status

This is a prototype for lithium-ion battery packs. **Every company, price,
delivery time, and supply link on the site is made up** to show how the tool
works, and the site says so. The regions are real. Do not use it for real
sourcing yet.

## How to read the map

| Shape | Step |
|---|---|
| Triangle (1) | Mine |
| Diamond (2) | Refiner |
| Square (3) | Cell maker |
| Circle (4) | Pack assembler, where inventors can buy |
| Star (5) | Distributor, where inventors can buy |

A moving arrow marks a confirmed link, and a flashing line marks a likely one.
A dotted line with an arrow and a check mark shows delivery to the inventor.
Unknown links have no line and appear in the panel below the map.

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
searches or add any data to the map. Check that your Sayari license allows
publication before adding its records to the public site.
