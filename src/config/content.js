/**
 * Product and marketing copy.
 *
 * All copy is written for this build from the assignment brief. It is kept in
 * one file so wording can be reviewed and adjusted without touching layouts.
 */

/** End-to-end solutions: software that runs a whole process start to finish. */
export const SOLUTIONS = [
  {
    id: 'budget-review',
    name: 'Budget review',
    summary: 'A complete review of a proposed budget, line by line, before it is approved.',
    detail:
      'The budget is read as submitted, compared against prior periods, contracts and agreed limits, and every line that moves without explanation is put in front of a reviewer with its context attached.',
    points: [
      'Line-by-line comparison with prior-period and contract figures',
      'Variances outside agreed tolerances surfaced, not buried',
      'Commentary and supporting evidence attached to each exception',
      'A review-ready output your team can sign off or send back',
    ],
    audience: 'Finance teams, owners and approvers signing off a budget cycle',
  },
  {
    id: 'escrow-audit',
    name: 'Escrow audit',
    summary: 'Every movement of escrow money traced back to the document that authorised it.',
    detail:
      'Deposits, withdrawals and transfers are matched to contracts, statements and approvals, so the audit answers a simple question with evidence: does every movement out of the account have a reason to exist?',
    points: [
      'Bank activity matched to contracts and authorisations',
      'Unexplained or duplicated movements flagged for enquiry',
      'Balances reconciled across statements and the ledger',
      'A complete, evidenced trail for each period reviewed',
    ],
    audience: 'Auditors and property managers responsible for client funds',
  },
  {
    id: 'financial-audit',
    name: 'Financial audit',
    summary: 'The core audit workflow — evidence gathered, vouched and prepared for review.',
    detail:
      'Populations are pulled together, samples selected against your approach, supporting documents located and vouched, and working papers drafted with the figures and cross-references already in place.',
    points: [
      'Populations assembled and sampled to your methodology',
      'Transactions vouched to supporting documentation',
      'Cross-references and tie-outs prepared in the working papers',
      'Exceptions listed with the evidence a reviewer needs',
    ],
    audience: 'Audit teams running a statutory or internal audit',
  },
  {
    id: 'interim-audit',
    name: 'Interim audit',
    summary: 'Evidence gathered through the year, so the year-end is not a surprise.',
    detail:
      'Work is spread across the period instead of compressed into a deadline. Evidence is collected and tested while it is current, and issues are raised early enough to be dealt with properly.',
    points: [
      'Testing scheduled across the period rather than at year end',
      'Evidence captured while records and people are still current',
      'Issues raised early, with time to investigate',
      'Year-end work reduced to what genuinely remains open',
    ],
    audience: 'Audit teams that want a continuous, not a rushed, process',
  },
  {
    id: 'property-budgeting',
    name: 'Budget preparation for property management',
    summary: 'Service charge and property budgets built from actuals, contracts and forecasts.',
    detail:
      'Last year’s actuals, standing contracts and known commitments are brought together into a draft budget with each assumption visible — ready for the review and owner approval that a property budget needs.',
    points: [
      'Built from prior actuals, contracts and scheduled works',
      'Assumptions visible and adjustable line by line',
      'Draft prepared for owner or committee review',
      'Consistent structure across a whole property portfolio',
    ],
    audience: 'Property management companies preparing service charge budgets',
  },
]

/** Standalone tools: each solves one specific job and works on its own. */
export const TOOLS = [
  {
    id: 'po-extraction',
    name: 'Purchase-order extraction',
    summary: 'Figures and details lifted out of purchase orders and invoices, in bulk.',
    detail:
      'Hand it a stack of purchase orders or invoices and it returns structured data — vendor, dates, line items, totals and tax — with the source document and location of every figure kept alongside it.',
    points: [
      'Vendor, dates, line items, totals and tax captured',
      'Every field traceable back to its place in the document',
      'Hundreds of documents handled in a single run',
      'Export ready to match against your ledger or PO register',
    ],
    works: 'Feeds directly into matching, reconciliation and audit workflows.',
  },
  {
    id: 'vouching',
    name: 'Vouching automation',
    summary: 'Transactions matched to their supporting documents, and the gaps flagged.',
    detail:
      'Each transaction is paired with the invoice, receipt or approval that supports it. Matches are recorded with their evidence; anything missing, partial or contradictory is raised for a person to look at.',
    points: [
      'Transactions paired to their supporting documentation',
      'Missing, partial and mismatched support flagged',
      'Evidence retained with every match',
      'Sample and full-population testing both supported',
    ],
    works: 'Used inside audit engagements or on its own for a spot check.',
  },
  {
    id: 'expense-working',
    name: 'Expense working automation',
    summary: 'Expense populations classified and tested against your policy and sampling rules.',
    detail:
      'Expenses are categorised, tested against policy and sampling rules, and summarised into a working paper — so the tester starts from an organised population rather than a spreadsheet.',
    points: [
      'Automatic categorisation of expense populations',
      'Policy and sampling rules applied consistently',
      'Exceptions surfaced with the reason they were flagged',
      'Working paper produced ready for review',
    ],
    works: 'Stands alone, or slots into a wider audit workflow.',
  },
  {
    id: 'report-review',
    name: 'Financial report review',
    summary: 'Draft statements read end to end, with everything inconsistent listed.',
    detail:
      'The draft report is checked across periods, across statements and against the underlying figures. Cross-references, movement explanations and arithmetic are tested, and the items needing a second look are listed.',
    points: [
      'Consistency tested across periods and statements',
      'Cross-references and tie-outs verified',
      'Unexplained movements and arithmetic errors listed',
      'A review list, not a black box — every flag shows its reasoning',
    ],
    works: 'Sits alongside your reviewer rather than replacing them.',
  },
  {
    id: 'tender-verification',
    name: 'Tender verification',
    summary: 'Bids checked against the tender documents and against each other.',
    detail:
      'Submissions are compared with the tender requirements and with the other bids received — completeness, arithmetic, mandatory declarations and material differences between prices.',
    points: [
      'Compliance checked against mandatory tender requirements',
      'Arithmetic and total-price discrepancies caught',
      'Comparisons across bids on a like-for-like basis',
      'Deviation and clarification points listed for the committee',
    ],
    works: 'Prepares the comparison pack; the committee makes the award decision.',
  },
  {
    id: 'reconciliation',
    name: 'Reconciliation',
    summary: 'Two records matched, and every difference explained.',
    detail:
      'Records from two sources are matched item by item. Agreed items are cleared, differences are grouped and explained, and what remains is a short list of genuine exceptions instead of a spreadsheet of noise.',
    points: [
      'Item-level matching across two record sets',
      'Agreed items cleared automatically',
      'Differences grouped and explained rather than dumped',
      'Result is an evidenced reconciliation you can hand over',
    ],
    works: 'Bank, ledger, intercompany and supplier statement matching.',
  },
]

/** The five things the technology does. */
export const CAPABILITIES = [
  {
    n: '01',
    title: 'Read documents',
    body: 'Figures and details extracted from invoices, purchase orders, contracts and statements — into structured data you can actually work with.',
    detail: 'Extraction',
  },
  {
    n: '02',
    title: 'Compare and match',
    body: 'Documents checked against ledgers, quotes against each other, transactions against the evidence that supports them.',
    detail: 'Matching',
  },
  {
    n: '03',
    title: 'Check against rules',
    body: 'Missing items, mismatched totals, duplicates and anything outside agreed limits — flagged the same way every single time.',
    detail: 'Controls',
  },
  {
    n: '04',
    title: 'Prepare drafts',
    body: 'Schedules, working papers and reports produced ready for review, with the figures and cross-references already in place.',
    detail: 'Drafting',
  },
  {
    n: '05',
    title: 'Handle bulk work',
    body: 'Hundreds of documents processed in one run, so the size of a population stops deciding your deadline.',
    detail: 'Scale',
  },
]

/** The loop: what the software does, and where a person stays involved. */
export const LOOP_STEPS = [
  {
    n: '01',
    who: 'software',
    title: 'Prepare',
    body: 'Documents are read, compared against your records and tested against your rules. Drafts and schedules are produced with the evidence attached.',
  },
  {
    n: '02',
    who: 'software',
    title: 'Surface',
    body: 'Everything that does not agree — missing, duplicated, out of limit or simply odd — is gathered into one review list with the reason it was flagged.',
  },
  {
    n: '03',
    who: 'human',
    title: 'Review',
    body: 'A professional works the list, sees the source document behind every figure, and applies the judgement the rules cannot encode.',
  },
  {
    n: '04',
    who: 'human',
    title: 'Decide & sign off',
    body: 'Accept, adjust or reject. The decision and the sign-off stay with your people — every time, on every engagement.',
  },
]

export const AUDIENCES = [
  {
    title: 'Accountants',
    body: 'Bookkeeping, schedules and reconciliations that repeat every period, prepared before you sit down to review them.',
  },
  {
    title: 'Auditors',
    body: 'Vouching, sampling and working papers prepared to your methodology, with exceptions already isolated.',
  },
  {
    title: 'Finance teams',
    body: 'Matching, checking and reporting handled across the population, so month-end stops being a fire drill.',
  },
  {
    title: 'Property management',
    body: 'Service charge budgets, escrow movements and property records kept in order across a whole portfolio.',
  },
]

/** Honest framing of the problem — no invented statistics. */
export const PROBLEMS = [
  {
    title: 'Reading the same document twice',
    body: 'Invoices, purchase orders and statements are read once to key them in, and again to check them. Both passes take time a professional should be spending elsewhere.',
  },
  {
    title: 'Matching by hand',
    body: 'Figures are lined up against ledgers and supporting documents one row at a time, and the rows that do not agree are the ones that need the most attention.',
  },
  {
    title: 'Checking the same rules every time',
    body: 'Missing items, duplicates, mismatched totals and out-of-limit amounts are tested the same way on every job — which is exactly the kind of work that should not depend on who is doing it.',
  },
  {
    title: 'Deadline, not judgement',
    body: 'The hours lost to repetitive work are the hours that should have gone into the questions that actually need a professional.',
  },
]

export const PRINCIPLES = [
  {
    title: 'Reliability before novelty',
    body: 'Our users trust us with financial data and deadlines. A feature that is occasionally wrong is not a feature — so we build for the run where nothing goes wrong, not the demo where everything does.',
  },
  {
    title: 'Clarity over cleverness',
    body: 'Every flag shows the figure it found, the document it came from and the rule that fired. If a reviewer cannot see why something was raised, we have not finished the job.',
  },
  {
    title: 'The sign-off stays human',
    body: 'We prepare the work. A professional reviews it and decides. That boundary is a product requirement, not a disclaimer — it is what makes the output usable in an audit.',
  },
  {
    title: 'Built by people who do the work',
    body: 'Endloops grew out of the technology team inside an accounting and audit firm, where these processes were run for real clients before they were ever automated.',
  },
]

export const ROADMAP = [
  {
    n: '01',
    title: 'Rooted in practice',
    body: 'Every product starts as a workflow that was performed by hand, for real clients, inside an accounting and audit firm.',
  },
  {
    n: '02',
    title: 'Growing the three capabilities',
    body: 'Engineering, design and quality are being built up together — because automation that finance teams can trust needs all three, not just the first.',
  },
  {
    n: '03',
    title: 'The GCC and beyond',
    body: 'The ambition is to become the trusted automation partner for accounting, audit and property finance teams across the region — and then further.',
  },
]
