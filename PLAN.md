# Plan

## Goal
Help inventors find real suppliers and see where those suppliers' materials come
from, with sources and known gaps made visible.

## Current state
- `docs/index.html` shows real lithium-ion battery companies from a November
  2026 research snapshot.
- `research/battery-supply-chain-snapshot-2026-11.json` holds the records and
  caveats.
- One chain is traced from a mine to a pack maker, but that pack maker builds
  for industrial and commercial mobility. Suppliers that suit small orders do not yet trace upstream.

## Next steps
1. Show the site to two or three inventors. Ask whether they would contact a
   listed supplier, what they would search for first, and where they are.
2. Ask the listed pack makers which cell brands they use and their real minimum
   orders.
3. Add suppliers in the countries inventors need.
4. Add the next material or component based on what inventors ask for.
5. Refresh the snapshot and its date when records change.

## Release check
- Every company and supply link has a source.
- Confirmed, likely, and unknown links are clearly different.
- Missing information is never presented as a clean supply chain.
- Prices, minimums, and shipping appear only when a source states them.
- Any data on the site is allowed to be published under its license.
- The site works with a keyboard and on a phone.
