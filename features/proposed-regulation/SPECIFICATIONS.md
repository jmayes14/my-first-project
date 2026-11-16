# Specifications: Proposed Regulation Simulation

This describes the **Proposed regulation** section added to `docs/index.html`
(`#regulation`). The concept and its limits are in
[CONCEPT-IDEA.md](./CONCEPT-IDEA.md).

## Placement
- A new `map-shell` panel after the supply chain panel (`#trace`) and before
  the research notes (`#sources`).
- A **Proposed regulation** link in the site menu.
- It has its own script block and data block. It does not change the globe,
  the supplier ranking, or the existing records.

## Data
The scenario lives in
[research/proposed-regulation-scenario-2026-11.json](../../research/proposed-regulation-scenario-2026-11.json)
and is copied into the page as `<script type="application/json" id="reg-data">`.
The two must match, as with the battery snapshot.

### Signals
Each signal is one piece of intelligence.

| Field | Meaning |
|---|---|
| `id` | Short key used by the rules |
| `title` | Plain name |
| `status` | `in-force`, `proposed-bill`, `reported-draft`, or `listing` |
| `date` | Date of the action or report |
| `summary` | One or two sentences |
| `confidence` | What is confirmed and what is assumed |
| `sources` | Source ids |

### Parts
Each part is one line of a data center bill of materials.

| Field | Meaning |
|---|---|
| `id`, `name` | Key and plain name |
| `category` | `transceiver`, `switch`, `server`, `inverter`, or `router` |
| `generation` | For transceivers: `800G`, `1.6T`, or `3.2T` |
| `maker` | Company, or a description if the maker is unknown |
| `chinaLinked` | Maker is a Chinese company or controlled by one |
| `namedInBill` | Maker is named in S. 5548 |
| `on1260H` | Maker is on the 1260H list |
| `newModel` | Needs a new FCC authorization (not authorized before the rule) |
| `firstYear` | Year the part enters the design |
| `coveredComponent` | Has a logic-bearing component from a Covered List producer: `yes`, `no`, or `unknown` |
| `namedFirmware` | Uses firmware, software, or parts from a maker named in S. 5548: `yes`, `no`, or `unknown` |
| `usBomShare` | U.S.-sourced share of bill-of-materials value, 0 to 1, or `null` if unknown |
| `foreignProduced` | For routers and inverters |
| `approvalUntil` | End date of a DoW or DHS conditional approval, if any |
| `placeholders` | Fields that are demo values, not research |
| `sources`, `note` | Evidence and caveats |

A field listed in `placeholders` is shown with a **placeholder** tag.

### Sources
`{ id, title, publisher, date, url, kind }`, where `kind` is `primary`
(government text) or `secondary` (law firm, press, or analyst).

## Controls
| Control | Default | Effect |
|---|---|---|
| Signal switches | All on | Turns each rule on or off |
| Year | 2028 | The year being evaluated, 2026 to 2032 |
| Where it will be used | Commercial data center | Or federal national security system |
| Draft rule start year | 2028 | First year the transceiver ban applies |
| First generation covered | 3.2T | Or 1.6T, or all generations |
| U.S.-content exemption | On, 65% | Threshold from 50% to 80% |
| Year S. 5548 is enacted | Not enacted | Or 2027 to 2030 |

Draft assumptions are labeled **assumption** wherever they appear.

## Rules
Each rule checks one part for the chosen year. A part takes the most severe
result. All reasons are listed.

Severity, from most to least: **Barred** (red), **Needs approval**
(orange), **Watch** (yellow), **No signal applies** (green).

1. **Component rule (FCC 26-50), in force from October 13, 2026.**
   For a new model: `coveredComponent = yes` gives **Barred** (new
   authorization denied). `unknown` gives **Watch**. Firmware is not counted.
2. **Transceiver draft, reported.** Applies from the chosen start year to new
   transceiver models from a China-linked maker at or above the chosen
   generation.
   - With the exemption on, a part at or above the threshold gives **Watch**
     (exempt if the share holds up). A part below it gives **Barred**. An
     unknown share gives **Barred** with "U.S. share unknown."
   - With the exemption off, it gives **Barred**.
   - Before the start year, a part that will be covered gives **Watch**.
3. **S. 5548, proposed bill.** Only for federal national security systems,
   and only if an enactment year is set. Takes effect five years after
   enactment. A part from a named maker, or with `namedFirmware = yes`, gives
   **Barred** from that year and **Watch** during the transition.
   `namedFirmware = unknown` gives **Watch**.
4. **1260H listing.** For federal use, a part from a listed maker gives
   **Watch**, because the Department of War may not contract directly with
   listed companies. It never bars a part by itself.
5. **Routers and inverters, in force.** A new foreign-produced model gives
   **Needs approval** unless it has a conditional approval that is still
   running in the chosen year. If the approval ends before or during that
   year, it gives **Needs approval** with "approval ended."

A part with no matching rule shows **No signal applies**. This is not a
finding that the part is safe.

## Outputs
- **Summary count** of parts at each severity for the chosen year.
- **Parts table:** part, maker, status, reasons, and sources. Placeholder
  values are tagged.
- **Timeline grid:** one row per part and one column per year from 2026 to
  2032, colored by status, so changes over time can be seen at once.
  Each cell has a text label for screen readers.
- **Design considerations:** shown only when the result triggers them, for
  example a barred 3.2T part, unknown components in a new switch, an approval
  ending, or federal use with named firmware.
- **Signal cards:** each signal with its status, date, what is confirmed,
  what is assumed, and its sources.

## Loading a student parts list
- A **Load your parts list** panel accepts JSON: an array of parts in the
  format above.
- The list is checked before use. Missing required fields (`id`, `name`,
  `category`) are reported by line, and nothing is replaced.
- **Back to the demo list** restores the sample.
- A loaded list stays in the browser only, for that visitor. It is not saved
  or shared.

## Wording rules
- Never say a part or company is compliant, banned, or safe. Say what a rule
  would do under the stated assumptions.
- Every reported-draft result says it is based on reporting, not rule text.
- Gaps are shown as gaps, as on the rest of the site.

## Accessibility
- All controls work with a keyboard and have labels.
- Status uses text as well as color.
- The results region is announced politely when it changes.
- Works at phone width, with the table scrolling inside its own box.

## Primary sources
| Signal | Primary source | Status in source |
|---|---|---|
| Component rule | FCC 26-50, Third Report and Order, ET Docket 21-232, 91 FR 57798 (Sept. 11, 2026), effective Oct. 13, 2026. [govinfo](https://www.govinfo.gov/content/pkg/FR-2026-09-11/html/2026-18535.htm) | Final. Excludes software and firmware. Applies to new authorizations. Keeps open further questions on all components and foreign-adversary producers. |
| Transceiver ban | **No primary source found.** Reuters reports of Aug. 4 and Nov. 10, 2026, as cited by [Fierce Network](https://www.fierce-network.com/broadband/proposed-us-ban-chinese-optical-transceivers-threatens-ai-data-center-boom) and the [Daily Caller](https://dailycaller.com/2026/11/10/microsoft-trump-chinese-optical-transceivers-fcc-ban-ai-data-centers-dave-mccormick-ruben-gallego/). The 3.2T start and 65% figure come from analyst notes ([404K Research](https://404kresearch.substack.com/p/fcc-optical-transceiver-restrictions), [ROC Telecom](https://roctelecom.com/insights/fcc-optical-module-rules-update/)). | Reported only. Some outlets wrongly call it a final rule. |
| S. 5548 | Bill text, 119th Congress. [govinfo](https://www.govinfo.gov/content/pkg/BILLS-119s5548is/html/BILLS-119s5548is.htm). Sponsor's [press release](https://www.mccormick.senate.gov/news/press-releases/senators-mccormick-gallego-cornyn-fetterman-introduce-bill-to-keep-chinese-transceivers-out-of-u-s-national-security-systems/) | Introduced Sept. 24, 2026; referred to Homeland Security and Governmental Affairs. Takes effect five years after enactment. Includes firmware and component parts. FAR rule within three years. |
| 1260H | June 8, 2026 update, per [WilmerHale](https://www.wilmerhale.com/en/insights/client-alerts/20260611-pentagon-adds-65-new-entities-to-the-1260h-list-of-chinese-military-companies) and [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/07/department-of-war-updates-section-1260h). The Department of War list itself should be checked. | Zhongji Innolight added. |
| Routers | FCC fact sheet on adding foreign-made consumer routers to the Covered List (March 23, 2026) [DOC-420034A1](https://docs.fcc.gov/public/attachments/DOC-420034A1.pdf); approvals, e.g. Netgear to Oct. 1, 2027 ([Tom's Hardware](https://www.tomshardware.com/networking/routers/netgear-secures-conditional-approval-from-the-fcc-following-router-ban-company-can-continue-importing-foreign-made-routers-through-october-2027)), SpaceX to Feb. 1, 2028 ([Light Reading](https://www.lightreading.com/broadband/fcc-exempts-new-starlink-devices-from-router-ban)) | In force. Consumer-grade only. |
| Inverters | FCC Public Notice DA 26-786 (July 28, 2026) [PDF](https://docs.fcc.gov/public/attachments/DA-26-786A1.pdf); approval notices DA 26-1089, 26-1114, 26-1154, 26-1181 | In force. Definitions narrowed August 20, 2026. |

The page should be checked against the primary sources before each refresh.
