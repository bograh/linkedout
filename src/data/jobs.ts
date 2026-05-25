import type { Job } from '../types'

export const seedJobs: Job[] = [
  {
    id: 'j1',
    company: 'Startupify Inc.',
    title: 'Senior Excel Ninja (Unpaid)',
    salary: '0 — exposure',
    requirements: [
      '10+ years experience with pivot tables',
      'Black belt in VLOOKUP',
      'Willing to work for "culture"',
      'Must provide your own laptop',
    ],
    description:
      'We\'re looking for a rockstar who lives and breathes spreadsheets. You\'ll be managing our entire financial model (we have none) and creating reports nobody will read.',
    applicants: 847,
    posted: '2h ago',
    urgent: true,
  },
  {
    id: 'j2',
    company: 'Synergy Corp',
    title: 'Chief Happiness Officer',
    salary: 'Free snacks',
    requirements: [
      'Must smile constantly',
      'No experience necessary',
      'Must bring your own happiness',
      'Knowledge of "fun" required',
    ],
    description:
      'We need someone to stand by the coffee machine and ask people how their weekend was. You will report to the CEO (also the intern).',
    applicants: 231,
    posted: '5h ago',
    urgent: false,
  },
  {
    id: 'j3',
    company: 'DisruptCo',
    title: 'Professional Meeting Attender',
    salary: '$15/hr (capped at 10hrs/week)',
    requirements: [
      'Available 9-5 for meetings about meetings',
      'Must say "circle back" at least 3x per meeting',
      'Can type "noted" convincingly',
      'No actual decision-making allowed',
    ],
    description:
      'Join our agile, lean, synergistic team! You\'ll attend 8 hours of meetings daily and produce zero deliverables. Must be comfortable with ambiguity and cold coffee.',
    applicants: 156,
    posted: '1d ago',
    urgent: false,
  },
  {
    id: 'j4',
    company: 'Venture Capital Vibes',
    title: 'Junior Blockchain Evangelist',
    salary: 'Unpaid (equity: 0.0001%)',
    requirements: [
      'Must use "Web3" in every sentence',
      'NFT collection preferred but not required',
      'Can explain why the company needs a blockchain for their lemonade stand',
      'Hoodie mandatory',
    ],
    description:
      'We\'re disrupting the lemonade industry with blockchain technology. You\'ll be responsible for tweeting about our paradigm shift and copy-pasting whitepapers from the internet.',
    applicants: 412,
    posted: '3d ago',
    urgent: false,
  },
  {
    id: 'j5',
    company: 'HR Nightmares Ltd',
    title: 'Talent Acquisition Specialist (Ghosting)',
    salary: 'Based on "vibes"',
    requirements: [
      'Must enjoy reading applications and never responding',
      'Proficient in auto-generated rejection emails',
      'Can make candidates complete 5 rounds of interviews for no reason',
      'Must use the phrase "we\'ll keep your resume on file"',
    ],
    description:
      'Do you love power? Do you enjoy getting people\'s hopes up? Join our HR team where you\'ll post fake job listings and ghost qualified candidates for sport.',
    applicants: 89,
    posted: '4d ago',
    urgent: true,
  },
]
