# Review Checklist

Use this when reviewing a pull request in this project. Start each comment with
`BLOCKING:`, `NIT:`, or `QUESTION:`.

## Every pull request
- [ ] Facts are verified, and nothing is invented.
- [ ] Every source exists, and the link opens.
- [ ] Failure paths are covered, such as no search results.
- [ ] No placeholders are left behind.
- [ ] Guesses are labeled as guesses.
- [ ] Terms are used the same way throughout.
- [ ] Requirement and task IDs exist in the documents they refer to.
- [ ] No secrets, keys, or personal data are included.

## Supplier and evidence changes
- [ ] The source says what the site says it does.
- [ ] A confirmed link has a named source that states that link.
- [ ] Prices, minimums, and shipping appear only when a source states them.
- [ ] Wording does not accuse a company or imply an endorsement.
- [ ] Any Sayari content is allowed on a public site under the license.

## By document
- [ ] `CONCEPT-IDEA.md`: the problem and audience are real, and the boundaries are clear.
- [ ] `SPECIFICATION.md`: each requirement can be tested and matches the site.
- [ ] `PLAN.md`: decisions give reasons, and milestones end in something to demo.
- [ ] `BACKLOG.md`: the top item is the most important, and each item can be finished.

## Code and site
- [ ] The site was checked at phone size (390x844) and desktop size.
- [ ] The live page has no console errors.
- [ ] The site works with a keyboard.

## Red flags
| If you see | Do this |
|---|---|
| A claim with no source | Mark it `BLOCKING:` |
| A source that does not support the claim | Mark it `BLOCKING:` |
| A gap presented as a clean supply chain | Mark it `BLOCKING:` |
| A real-looking number with no source | Mark it `BLOCKING:` |
| An AI-written change nobody can explain | Ask the author to explain it before approving |

## Verdict
Approve, request changes, or leave comments only. AI-written work needs a person
to review it before it merges.
