# Specification

## Purpose
Define a small, research-based project that helps answer whether the vape supply chain has traceability issues and whether ethical sourcing concerns are visible in that chain.

This specification keeps the project narrow and realistic for a few hours per week. It does not assume a full compliance platform, a legal database, or a large global supplier network.

## First release
The first deliverable is a public, browser-based interactive visual map of a representative vape supply chain, from raw materials through distribution. Visitors can filter the stages by topic and select a stage to inspect evidence, source links, and traceability gaps. It will show material and component origins, organizations, and ethical-sourcing evidence as research is added.

The current map includes sourced industry-level context, but it is not a verified account of a product or supplier. Product-specific sourcing gaps must not be interpreted as evidence that a risk is absent. The exact evidence standard and confidence rubric can be refined later; until then, claims must be sourced and uncertainty must be explicit.

The first release does not include logins, an editor, administrative permissions, live data, or automated supplier monitoring. It is a static site whose map interactions run in the browser. The requirements, screens, and data model below describe possible future capabilities, not a prerequisite for publishing the initial map.

## Functional intent
- Give a clear view of the vape supply chain and its major steps
- Highlight where traceability is strong, weak, or unknown
- Surface ethical sourcing concerns and human-rights risk indicators
- Show evidence and source notes in plain language
- Keep the project focused on a research-first workflow instead of a full commercial product

## In-scope
- A static web page mapping representative vape supply-chain stages
- Manual addition of sourced material origins, organizations, and ethical-sourcing evidence
- Clear labels for sourced information, uncertainty, and research gaps
- Cautious language that does not make legal conclusions

## Out-of-scope
- Full compliance auditing for every brand or product in the vaping market
- A complete global supplier database
- Legal advice or formal enforcement decisions
- Real-time supplier monitoring or live data feeds
- Consumer-facing purchasing or product scoring with a final judgment
- Tracking every issue in the wider consumer goods industry
- Accounts, editor/admin workflows, and permission management for the first release

## Potential future user stories
These are longer-term ideas and are not required to publish the first static map.
### Must 1: A user can understand the basic supply-chain traceability story
As a visitor, I must be able to open the project and see the main supply-chain flow for a vape product so I can understand where traceability is clear, weak, or unknown.

1. Functional requirement: Display a traceability map for a selected vape product or supply chain path.
   - Given the user opens the traceability page, when a product or supply chain path is selected, then the page must show each major step in order from sourcing to finished product.
   - Given a step has no confirmed data, when the user views the map, then the step must be marked as unknown rather than silently missing.
   - Given the user views the map on a phone, when the layout is displayed, then the content must remain readable without requiring horizontal scrolling.

### Must 2: A user can see whether ethical sourcing concerns are visible in the chain
As a visitor, I must be able to see whether the project identifies any ethical sourcing or human-rights concerns, and whether they are linked to a specific step in the chain.

2. Functional requirement: Show risk flags and ethical sourcing concerns by supply-chain step.
   - Given a risk flag is recorded for a step, when the user views the step, then the step must display a clear risk label and summary.
   - Given a risk is uncertain or unverified, when the user sees it, then the page must clearly say that it is unconfirmed instead of presenting it as fact.
   - Given the user opens a risk detail, when the record is incomplete, then the page must show what is missing and what evidence is available.

### Must 3: A user can inspect the evidence behind each claim
As a visitor, I must be able to look at the underlying evidence and source notes behind each supply-chain step or risk flag so I can judge the quality of the information.

3. Functional requirement: Show evidence records and notes for each step or risk flag.
   - Given a supply-chain step has evidence, when the user opens that item, then the page must show the evidence source name, note, and whether it is public or not.
   - Given an evidence record has no URL or source detail, when it is displayed, then the page must show that the source is missing instead of leaving it blank.
   - Given a user opens an item with multiple evidence records, when the records are listed, then they must be sorted in a readable order with the newest or most relevant first. (inferred)

### Must 4: A user can tell the difference between confirmed, uncertain, and missing information
As a visitor, I must be able to distinguish between confirmed data, uncertain data, and missing data so I do not mistake an unknown for a fact.

4. Functional requirement: Indicate status for each step and each evidence item.
   - Given a step is fully confirmed, when the user sees it, then the status must show a confirmed state.
   - Given a step is only partially known, when the user sees it, then the status must show it as uncertain or incomplete.
   - Given a step has no data at all, when the user views the map, then the item must show a missing/unknown state and a note that the data is not yet available.

### Must 5: A contributor can add or update records without breaking the project structure
As a researcher or editor, I must be able to add or edit supply-chain records and notes in a controlled way so the project stays organized.

5. Functional requirement: Provide a simple editorial flow for adding or editing items.
   - Given a logged-in editor opens the admin or editor view, when they add a new supply-chain step, then the system must require a name, a step type, and a status.
   - Given a user submits incomplete data, when validation runs, then the system must show a field-level error instead of saving a broken record.
   - Given a user tries to save a record without permission, when the request is processed, then the system must reject it and show a permission message.

### Must 6: The project must show where the evidence is weak or absent
As a visitor, I must be able to understand where the project has not yet answered a question, so the limits of the research are clear.

6. Functional requirement: Surface missing data and open questions in the interface.
   - Given a question remains unanswered, when the user views the relevant item, then the page must show it as an open question instead of a conclusion.
   - Given there is no supporting source for a record, when the user opens it, then the page must say that no evidence has been recorded yet.
   - Given the user needs to know the map limitations, when they open the project home page, then they must see the project boundary and uncertainty clearly.

## Screens and states
### 1. Project home / overview screen
Purpose: Introduce the project, explain the problem, and surface the research boundary.

- Empty state: If no project details are entered yet, show a simple message saying the project is being researched and no final conclusions are available.
- Error state: If the project metadata cannot load, show a readable error and advise the user to try again later.
- Permissions: Read access for public visitors; write access only for authorized editors.

### 2. Traceability map screen
Purpose: Show supply-chain steps and their status.

- Empty state: If no supply-chain steps exist, show a message explaining that no traceability data has been added yet.
- Error state: If the data cannot be loaded, show a clear error message and a retry option.
- Permissions: Public read; editor write.

### 3. Step detail screen
Purpose: Show the details of one supply-chain step, any evidence, and any risk notes.

- Empty state: If the selected step has no data, show “No information recorded yet” and the step status as unknown.
- Error state: If a step record cannot be loaded, show a friendly error and return to the map.
- Permissions: Public read; editor write.

### 4. Risk detail screen
Purpose: Explain a concern and the evidence behind it.

- Empty state: If no risk records exist, show a message saying no risk flags have been added yet.
- Error state: If a risk flag cannot load, show an error and a link back to the traceability map.
- Permissions: Public read; editor write.

### 5. Editor / admin record form
Purpose: Add or update supply-chain steps, evidence, and risk notes.

- Empty state: If no records exist, show a blank form with required fields and helper text.
- Error state: Show field validation errors for missing required values, invalid URLs, or duplicate records. (inferred)
- Permissions: Only authorized editors or admins can access and save.

## Data model
The model below is intentionally small and only supports the screens described above. It does not include unused fields.

### Product
- id: unique identifier
- name: product name or label
- description: plain-language description
- created_at: date created
- updated_at: date last updated

### SupplyChainStep
- id: unique identifier
- product_id: linked product
- step_name: short label such as “raw material sourcing” or “battery component”
- step_order: integer order in the chain
- status: enum: confirmed | uncertain | unknown
- description: plain-language explanation
- notes: optional extra detail
- created_at: date created
- updated_at: date last updated

### EvidenceRecord
- id: unique identifier
- target_type: enum: product | step | risk
- target_id: linked record id
- source_name: source name or organization
- source_type: enum: public | private | internal_note
- source_url: optional URL
- summary: short note about what the evidence shows
- evidence_date: optional date
- created_at: date created
- updated_at: date last updated

### RiskFlag
- id: unique identifier
- target_type: enum: product | step
- target_id: linked record id
- risk_type: short label such as child labor or ethical sourcing concern
- risk_level: enum: low | medium | high | unknown
- status: enum: confirmed | unverified | denied | unknown
- summary: plain-language description
- created_at: date created
- updated_at: date last updated

### ProjectNote
- id: unique identifier
- title: short title
- body: plain-language note
- note_type: enum: overview | limitation | open_question
- created_at: date created
- updated_at: date last updated

### UserRole
- id: unique identifier
- username: user name or login
- role: enum: viewer | editor | admin
- created_at: date created

## Requirements for screens and permissions
- Public visitors can view the project home page, traceability map, step details, and risk details.
- Editors can add, edit, and delete records that support the research project.
- Admins can manage user permissions and final publication decisions.
- If a user does not have permission, the system must show a permission message and prevent the action.

## Open questions
The first deliverable and broad supply-chain scope have been chosen: a visual map of a representative vape supply chain. These decisions are no longer open questions. Details that can be refined as the research grows:
- Who is the primary audience for the map?
- Which public source types should be prioritized, and what evidence is enough to describe a claim as supported or uncertain?
- Which product or brand, if any, should a later product-specific trace focus on?
- What measurable milestone should define a successful research update?
- How should “ethical sourcing” be bounded beyond the initial focus on labor and human-rights evidence?

## Constraints and scope cuts
The project is intentionally constrained to a few hours per week and no defined budget. The following items are larger than the current constraints and should be cut from the first version unless the user explicitly wants them back:

- Full compliance and audit workflows for every product and supplier
- A global supplier database or a comprehensive industry map
- Real-time updates from supplier systems
- Full legal analysis or regulatory reporting
- A large consumer-facing app with user accounts and a scoring system
- Automated scraping or data collection at scale

If a feature is larger than this scope, the project should defer it to a later phase and keep the first version focused on a small research dataset and a readable visual summary.

## Acceptance summary
This specification is successful when a user can understand the supply chain, see where information is uncertain or missing, inspect the evidence behind the conclusions, and understand the boundary of the project without making unsupported claims.
