// All website copy lives here, so text can be changed without touching layout code.

export const site = {
  name: 'Codon Labs',
  url: 'https://codonlabs.si',
  description:
    'Codon Labs is an AI-first consultancy for the pharmaceutical industry. We find where your processes lag and translate them into compliant AI systems that run themselves.',
  bookingUrl:
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0c3WjtMjcgxMstVzrR0oe1ZozVC2Gj0uQ6HAtA62n8nMxkjn1zu4yggscYTqJ3lauzCvH8de_g?gv=true',
  formEndpoint:
    'https://script.google.com/macros/s/AKfycbymh8XM3kQ3lI2_7Y7tjkSxhN0lhxqMwpP_ooTNg9PEy6AR0Nq1HT7IKjSZyBPw6gqe/exec',
  email: 'connect@codonlabs.si',
};

export const nav = [
  { href: '#services', label: 'Services' },
  { href: '#use-cases', label: 'Use cases' },
  { href: '#approach', label: 'Approach' },
  { href: '#founders', label: 'Founders' },
];

export const hero = {
  tag: 'AI-first consultancy for the pharmaceutical industry',
  lede: 'We find where your processes lag and translate them into compliant AI systems that run themselves, from the lab bench to the market.',
};

export const decoderPairs: [string, string][] = [
  ['ATG', 'Automate'],
  ['GCA', 'Validate'],
  ['TTC', 'Accelerate'],
  ['CAG', 'Comply'],
  ['GAT', 'Discover'],
  ['CCT', 'Scale'],
];

export const manifesto = {
  text: 'Pharma runs on processes designed before AI existed. Every handover, every manual check, every spreadsheet holds value that is waiting to be',
  highlight: 'expressed.',
  shifts: [
    { from: 'Pilots that stall', to: 'AI in production' },
    { from: 'Line-by-line manual review', to: 'Review by exception' },
    { from: 'Scattered tools', to: 'One governed system' },
  ],
};

export const services = [
  {
    title: 'AI readiness & roadmap',
    text: 'We assess your processes, data and governance, then rank every AI opportunity by value, risk and effort. You leave with a roadmap your quality team can sign off.',
    items: ['Process and data maturity map', 'Prioritised use-case portfolio', 'Business case per use case', '90-day implementation plan'],
  },
  {
    title: 'Automation & AI agents',
    text: 'We design and build the workflows and AI agents that take repetitive, document-heavy work off your experts’ desks, connected to the systems you already use.',
    items: ['Agentic workflows', 'Document drafting and review', 'Integration with QMS, RIM, safety and ERP', 'Human-in-the-loop controls'],
  },
  {
    title: 'GxP-ready AI & validation',
    text: 'AI an inspector can follow. Risk-based validation, audit trails and data integrity are built in from day one, aligned with GAMP 5, EU GMP Annex 11, draft Annex 22 and the EU AI Act.',
    items: ['AI risk classification', 'Risk-based validation strategy', 'AI governance framework', 'Inspection readiness'],
  },
  {
    title: 'Enablement & operating model',
    text: 'Tools only stick when people trust them. We train your teams, set clear ownership and measure results, so value keeps growing after we hand over.',
    items: ['AI literacy training', 'Centre of excellence set-up', 'KPI and value tracking', 'Change management'],
  },
];

export const useCases = [
  {
    code: 'ATG',
    area: 'R&D and clinical',
    items: [
      ['Protocol and study documents', 'First drafts of protocols, consent forms and study plans from approved templates and prior studies.'],
      ['Clinical study reports', 'CSR sections assembled from tables, listings and figures, ready for expert review.'],
      ['Evidence synthesis', 'Screen and summarise the literature for reviews, dossiers and background sections.'],
      ['Data review', 'Flag inconsistencies in study data and draft queries for your data managers.'],
    ],
  },
  {
    code: 'GCA',
    area: 'Regulatory affairs',
    items: [
      ['Submission authoring', 'Draft CTD content and keep it consistent across every document in the dossier.'],
      ['Health authority queries', 'Find precedent answers across past submissions and draft responses in hours.'],
      ['Regulatory intelligence', 'Monitor new guidance and summarise what changes for your portfolio.'],
      ['Labelling changes', 'Track label updates across markets and flag where they fall out of sync.'],
    ],
  },
  {
    code: 'TAC',
    area: 'Pharmacovigilance',
    items: [
      ['Case intake and triage', 'Extract adverse-event data from emails, forms and calls into structured cases.'],
      ['Case narratives', 'Draft narratives from structured case data for safety physician review.'],
      ['Literature screening', 'Screen scientific literature for safety-relevant reports, every week, at scale.'],
      ['Signal detection support', 'Surface emerging patterns across case data for medical evaluation.'],
    ],
  },
  {
    code: 'TTC',
    area: 'Quality and compliance',
    items: [
      ['Deviation triage', 'Classify new deviations, suggest risk levels and pull up similar past cases.'],
      ['Root cause and CAPA', 'Analyse historical records to propose root causes and track CAPA effectiveness.'],
      ['SOP management', 'Draft, compare and update SOPs, and keep training records aligned.'],
      ['Audit readiness', 'Answer auditor questions fast with search across your quality documentation.'],
    ],
  },
  {
    code: 'CAG',
    area: 'Manufacturing and supply',
    items: [
      ['Batch record review', 'Review by exception: only the entries that need a human get a human.'],
      ['Demand planning', 'Forecasts that learn from orders, tenders and market signals.'],
      ['Predictive maintenance', 'Spot equipment problems in sensor data before they stop a line.'],
      ['Tech transfer', 'Keep process knowledge structured as products move between sites.'],
    ],
  },
  {
    code: 'GAT',
    area: 'Commercial and medical',
    items: [
      ['Content pre-review', 'Check promotional material against approved claims and references before MLR.'],
      ['Medical information', 'Draft answers to HCP enquiries from approved standard responses.'],
      ['Field insights', 'Turn field medical and sales notes into themes leadership can act on.'],
      ['Market access dossiers', 'Assemble value dossiers and keep evidence current across markets.'],
    ],
  },
] as const;

export const approach = [
  {
    name: 'Read',
    text: 'We sit with your teams and map how work really flows. Then we pinpoint where time, money and accuracy leak, and which of those leaks AI can fix safely.',
    outputs: ['Process maps', 'Opportunity scorecard', 'Data and risk assessment'],
  },
  {
    name: 'Translate',
    text: 'We turn what we find into a clear plan: what to automate first, what it is worth, which tools fit, and how it stays compliant in your quality system.',
    outputs: ['Prioritised roadmap', 'Solution design', 'Validation approach'],
  },
  {
    name: 'Express',
    text: 'We build and launch alongside your people, validate the system, and train the teams who will run it, so the change lasts long after we leave.',
    outputs: ['Working, validated solution', 'Trained owners', 'Measured results'],
  },
];

export const principles = [
  ['Human in the loop', 'AI drafts, experts decide. Every workflow has clear review and sign-off points.'],
  ['Validated by design', 'Audit trails, version control and risk-based validation are built in, not bolted on.'],
  ['Your data stays yours', 'We design around your security and data-residency rules, and keep your data out of public model training.'],
  ['Measured, not promised', 'Every project starts with a baseline and ends with numbers: cycle time, error rates, hours returned.'],
  ['Vendor-neutral', 'We choose tools on fit, not partnerships, and build so you are never locked in.'],
  ['Built for EU and global rules', 'Aligned with GAMP 5, EU GMP Annex 11 and draft Annex 22, the EU AI Act and FDA 21 CFR Part 11.'],
];

export const engagements = [
  {
    name: 'Discovery sprint',
    text: 'Map one function, find the highest-value opportunities and leave with a costed roadmap.',
    tag: 'Start here',
  },
  {
    name: 'Pilot',
    text: 'Build one high-value use case end to end: validated, adopted and measured in your environment.',
    tag: 'Prove it',
  },
  {
    name: 'Scale partnership',
    text: 'Roll out across functions, set up governance and grow your own in-house AI capability.',
    tag: 'Grow it',
  },
];

export const founders = [
  { initials: 'RV', name: 'Rohan Vyas', role: 'Founder', linkedin: 'https://www.linkedin.com/in/rohan-vyas/', email: 'rohan@codonlabs.si' },
  { initials: 'SJ', name: 'Shambhavi Jha', role: 'Co-founder', linkedin: 'https://www.linkedin.com/in/shambhavijha15/', email: 'shambhavi@codonlabs.si' },
];
