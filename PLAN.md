# Plan

## Goal
Turn the prototype into a tool that helps inventors find real suppliers and see
where those suppliers' materials come from.

## Current state
- `docs/index.html` is a working prototype for lithium-ion battery packs.
- All companies, prices, delivery times, and supply links are made up. Only the
  regions are real.
- Delivered cost and delivery time are rough distance estimates. Import taxes
  and battery shipping rules are not included.

## Next steps
1. Show the prototype to two or three inventors. Ask whether they would use it
   to find a supplier, what they would search for first, and where they are.
2. Pick the first real material or component from those answers.
3. Research 10 to 15 real companies along that chain, in the countries the
   inventors need.
4. Replace the sample data with sourced records, showing when each was last
   checked and how sure each link is.
5. Remove the sample-data banner only when no made-up data remains.

## Release check
- Every real company and supply link has a source.
- Confirmed, likely, and unknown links are clearly different.
- Missing information is never presented as a clean supply chain.
- Any data on the site is allowed to be published under its license.
- The site works with a keyboard and on a phone.
