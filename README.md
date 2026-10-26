# Vape Supply-Chain Traceability

A small, research-first project to make the supply chain behind vapes easier
to understand. Its interactive visual map covers representative stages from
raw materials through distribution. Visitors can filter by topic and select a
stage to inspect public evidence, source links, and unknowns.

## Current status

The map includes sourced industry-level context on vape device components,
cobalt mining, and tobacco-farming labor risks. It also includes a first
product-level trace from Sayari trade records: U.S. import records that name
the shippers of Vuse products (PT Smoore Technology Indonesia and Dongguan
Hongyi Manufacturing) and the U.S. importer (R.J. Reynolds Vapor Company).
Shipping records do not prove which factory made a product, and Sayari risk
flags are screening leads, not findings. An information gap must not be read
as evidence that a risk is absent.

The underlying records, identifiers, and caveats are in
[research/sayari-trade-snapshot-2026-10.json](./research/sayari-trade-snapshot-2026-10.json).

## Project files

- [Concept and project boundaries](./CONCEPT-IDEA.md)
- [First-release specification](./SPECIFICATION.md)
- [Implementation plan](./PLAN.md)
- [Backlog](./BACKLOG.md)
- [Published map source](./docs/index.html)

The static site is in `docs/` and can be published with GitHub Pages. Its
interactions run in the browser and require no build step or external
dependencies. Research claims should be added only with their sources and
limitations.
