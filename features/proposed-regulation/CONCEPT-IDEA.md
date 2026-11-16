# Concept Idea: Proposed Regulation Simulation

Research date: November 16, 2026

## Problem
New rules on Chinese-made network and power equipment are announced in
pieces: a final FCC order, a leaked draft, a Senate bill, a Pentagon listing.
Each piece changes what a data center can buy, and when, but no single place
shows how they combine for a real list of parts.

Teams usually notice a rule after it takes effect. By then, the parts in their
design may have no approved replacement. Other analysts are tracking the same
signals, so the advantage goes to whoever can test the effect early.

## Who has this problem
- Students and analysts in the political risk course who need to turn a piece
  of intelligence into a supply chain impact.
- People planning data center deployments: network, power, and procurement
  teams.
- Inventors already using this site, because the same rules reach inverters
  and the battery systems they connect to.

## What people do today instead
They read law-firm alerts and news stories one at a time, then reason about
their own parts in a spreadsheet. Draft rules are hard to model because the
key details, such as the start date or an exemption threshold, are still
unknown.

## What this feature does
A new **Proposed regulation** section lets a user inject a scenario into the
site. A scenario is a set of regulatory signals, each with a status:

| Status | Meaning |
|---|---|
| In force | Final rule with an effective date |
| Proposed bill | Introduced in Congress, not law |
| Reported draft | Reported by press or analysts; no public text |
| Listing | A government list that names a company |

The user then:

1. Turns signals on or off.
2. Sets the unknowns of a draft rule, such as the start year, the first
   transceiver generation covered, and whether a U.S.-content exemption exists.
3. Chooses where the equipment will be used: a commercial data center or a
   federal national security system.
4. Moves a year slider from 2026 to 2032.

The section shows each part in a data center bill of materials with its
status for that year, the rule that causes it, and the evidence behind it.
It also lists design and deployment considerations that follow from the
result.

## Starting scenario: Chinese optical transceivers
This comes from a real concern. The signals and their sources are:

1. **Component rule, in force.** FCC 26-50 (ET Docket 21-232) took effect
   October 13, 2026. The FCC can deny new authorization to a device containing
   a logic-bearing component from a Covered List producer. It applies to new
   authorizations only and does not cover firmware or software.
2. **Transceiver ban, reported draft.** Reuters reported in August and again on
   November 10, 2026 that the FCC is preparing a ban on new Chinese
   transceiver models. The start at the 3.2T generation and the 65% U.S.
   bill-of-materials exemption come from analyst reports, not FCC text.
   InnoLight, Eoptolink, Dongshan Precision, and TFC are not on the Covered
   List.
3. **S. 5548, proposed bill.** Introduced September 24, 2026. It would bar
   InnoLight and Eoptolink transceivers, and products with their firmware,
   software, or components, from federal national security systems five years
   after enactment.
4. **1260H listing.** The Department of War added Zhongji Innolight to the
   1260H list of Chinese military companies on June 8, 2026.
5. **Routers and inverters, in force.** Foreign-produced consumer routers
   (March 23, 2026) and power inverters (July 28, 2026) are on the Covered
   List unless the Department of War or Homeland Security approves them.
   Several router approvals end between October 2027 and February 2028.

The full source list is in [SPECIFICATIONS.md](./SPECIFICATIONS.md#primary-sources).

## What the demo shows
The demo uses a sample data center bill of materials. Parts that name a real
maker show only what public sources state. The U.S.-content shares and
component origins are placeholders, marked as such.

Students will replace the placeholders with their own findings from Sayari
and real part numbers. The section reads its parts from one data block, so a
finished analysis can be pasted in without changing the page's code.

## Data center design considerations this informs
- **Transceiver generation timing.** If restrictions start at 3.2T, designs
  built on 800G and 1.6T optics already authorized are less exposed, while
  3.2T deployments around 2028 to 2029 need a second source.
- **U.S. content.** A 65% threshold would make the source of the DSP and laser
  matter more than where a module is assembled.
- **Vendor lock-in.** S. 5548 says compliance cannot rely on vendor
  authentication features that block other transceivers. Switches that accept
  only one maker's optics make substitution harder.
- **Firmware.** The FCC rule does not cover firmware today. S. 5548 does.
- **Federal and commercial halls.** A site that serves both may need
  separate approved parts lists.
- **Power.** Inverters for on-site solar and battery storage need a
  conditional approval or a domestic source. This links to the site's
  battery chains.
- **Approval end dates.** Router approvals that end in 2027 and 2028 affect
  edge and branch equipment refresh plans.

## What success would look like
- A student can load the scenario, change one assumption, and explain why a
  part's status changed, with the source.
- A student can paste a Sayari-based parts list and get a result without
  editing code.
- Every status traces to a named rule and a primary source, and draft
  assumptions are always labeled as assumptions.

## What I am deliberately not building
- Legal advice or a compliance determination for any company or part.
- A prediction of whether the draft rule will be adopted.
- A rating of any company.
- Live monitoring of the Federal Register or the FCC docket.

## Open questions
- Will the transceiver rule come as a Covered List entry, a new component
  rule, or an equipment class rule? Each would treat existing models
  differently.
- How would "U.S.-sourced" be measured for the 65% threshold, and by whom?
- Do the August 20, 2026 inverter definitions reach data center UPS
  equipment, or only solar and storage inverters?
- Would InnoLight or Eoptolink production in Thailand count as Chinese?
