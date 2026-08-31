/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeamMember, ProductFeature, StrategicGoal, ImpactMilestone, CompanyInfo } from '../types';

export const COMPANY_INFO: CompanyInfo = {
  name: 'AROGYAM TECHNOLOGIES',
  brandName: 'AROGYAM TECHNOLOGIES',
  email: 'arogyamtechpvt@gmail.com',
  phone1: '+91 8002338841',
  phone2: '+91 9110119383',
  phoneDisplay: '+91 8002338841 | +91 9110119383',
  phones: [
    { label: 'Primary', number: '+91 8002338841', raw: '+918002338841' },
    { label: 'Support / Ops', number: '+91 9110119383', raw: '+919110119383' },
  ],
  address: 'Muzaffarpur, Bihar, India 843108',
  incubation: 'IIT Patna Incubation Centre',
};

const LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 320" fill="none">
  <g transform="translate(40, 10)">
    <path d="M 100 25 L 42 165 L 72 165 L 88 126 L 100 95 Z" fill="#002845" />
    <path d="M 100 25 L 100 95 L 112 126 L 128 165 L 158 165 L 109 46 Z" fill="#002845" />
    <path d="M 36 165 L 76 165 L 72 157 L 40 157 Z" fill="#002845" />
    <path d="M 124 165 L 164 165 L 160 157 L 128 157 Z" fill="#002845" />
    <path d="M 94 98 H 106 V 106 H 114 V 118 H 106 V 126 H 94 V 118 H 86 V 106 H 94 Z" fill="#00a396" />
    <path d="M 117 108 L 140 108 L 152 96 L 164 96" stroke="#00a396" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="168" cy="96" r="5" fill="#00a396" />
    <path d="M 117 115 L 156 115" stroke="#00a396" stroke-width="4" stroke-linecap="round" />
    <circle cx="160" cy="115" r="5" fill="#00a396" />
    <path d="M 122 122 L 146 122 L 156 132 L 172 132" stroke="#00a396" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="176" cy="132" r="5" fill="#00a396" />
  </g>
  <text x="140" y="235" text-anchor="middle" fill="#002845" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" letter-spacing="8">AROGYAM</text>
  <line x1="45" y1="262" x2="68" y2="262" stroke="#00a396" stroke-width="1.5" stroke-linecap="round" />
  <text x="140" y="266" text-anchor="middle" fill="#00a396" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="6">TECHNOLOGIES</text>
  <line x1="212" y1="262" x2="235" y2="262" stroke="#00a396" stroke-width="1.5" stroke-linecap="round" />
</svg>
`)}`;

export const BRAND_ASSETS = {
  logo: LOGO_SVG,
  smallLogo: LOGO_SVG,
  labHeritage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf25cj8bnVpNfo7z3EvyjDn8iclyAa3m4KYJEAe-aDMAJmf00rUx7EwSYA3MK_A7pZB-yFEK65H3NxfylnTrdAnjMeF8dLRbszacegTQDx9bR_PGtLOptab0CPjgXC_JX015w-xBwFRzRaGUjFUMhoPrmLQxbYPTG8LdteeXLKIBPwN7-7tZGo6PZpQb4u8sQYHNIfRcLsMtJqLAew4WLbJrEn01bTo4cXIoi9iXIeM1UA0k5GhIOa1w',
  ivProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdmnx0pmR_uXZvJ5Xtl5gA7Nn5UbI6SIlM5zHN4rtYkqbzaQ7dUXrfHAuKTMsVNPovQxSYYx_ehI1rB0Mdk0bR6MZ3JvsNSG1j-zVqJKN_JT5SlbLsRDR4NqMRTPRoJiY_vqFtuFQzxxPksgjJYxdgbbpmFfv3AhJqtgIJGT8hX7w_rx9CjakheAPOkZA3BIui3wa_Tr6lDeRF2292iHDpw0m-uL6844i4U068_-ufTC5uFbjekx5XI7fWcfRGGWGax0A',
  ecgProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiUuZEXyJ1wsRHSyPH76W0ujP5lm9oz9UN9FuViyQMtf_xNy70Zw9frHAQUp5CTvYqrtr0Wlrep92iSiYKtIBVfFrGOcmvfR_hocf53xGDiiZ-Yp0ryhp7TTOsqe4z7jxXAHueRG7IGpgK8e-RhTighfX_Sxr3iK3zjcoRwToGH8GMPcdm5uBij9KjnCIIGv6GoY-UJUJPNuSl9vHGyXlc5FVQ_JB9c48ujJUvz7vMlldhp9XiiC2sa5OBznyREGTCrt0'
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Rounit Kumar Verma',
    role: 'Founder & Lead Engineer',
    badge: 'LEAD',
    bio: 'Architecting the core technical infrastructure and steering the engineering team towards robust, scalable health solutions.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcySd5ONNCHUTN32Cy5-xMJiNfu03r7NRWBSgVZ-ntzDrAyk9l_PDWX8MRaZKCS_NveG-5I3ylIQTCMqIh8WMXuYfPn0MPT7Yp_IC9mKRgNy0WCO62PNMxT7LTpwVbAOByI4X755VObhGCEOHEFtC_gWyMKJX-gCxRFZ3bIza9TckuOMtyQB2_Fmkddi-VHZ1z5lmi6DCkOi8_Kzv1J_qxbdlSsvLj2ROpwkQ0fYlr7-QfIjdvM-jyWsHn2c2B2R2LI70',
    altText: 'Professional headshot of Rounit Kumar Verma, Founder and Lead Engineer at Arogyam Tech.',
    credentials: 'Lead Biomedical Hardware & IoT Architect',
    linkedin: '#'
  },
  {
    name: 'Vivek Kumar',
    role: 'Co-Founder & Product Strategy',
    bio: 'Driving the vision and strategic roadmap for our medical technologies, ensuring market alignment and product excellence.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9zmblGV5VUi_mSH1kIPx1MnjWrHS2eRUuFxfSLaZWZ-b6zYH4wZ7K6Y60fEGX52Bgq5XyjNaI_NAtPPsy-WrVnSEoXstHMKUtlqFWM9mPgfWpueWc7JX25saW87GlZfbSWgPyVqTlP1ZpmRJZx1gUhCwM4oLfi6IAXsI8Q9s_REtWg3-x36gk_MFTIhurcjDKLAqNF2e3Qr6aw4IS6Tmy6Vo8UwwsgqXdPBaV2y5VfOFJXQn8Ii1SexkHueio_wnqfhQ',
    altText: 'Professional headshot of Vivek Kumar, Co-Founder and Product Strategy Lead.',
    credentials: 'IIT Patna Pre-Incubation Fellow',
    linkedin: '#'
  },
  {
    name: 'Shubhichha Srivastava',
    role: 'Head of Medical Operations',
    bio: 'Overseeing clinical workflows and ensuring all technological implementations adhere strictly to medical regulatory standards.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9mGJinNs3fGU5jq5kmMfoYSZm8QYWYqsTmWSNk0B3kX0azUMoNQFjF3NL7WG2DUOKEKK61JD9KHcuvQPkLruqVuAG8G-e1nG2SsqYt4dTEIbV_5eFABMabX4Ws_M-TxepvPe5Ixq_4uwg1c12hHsob6HJt-6mIUKgvOtXF9uBjqZpt0AXdp1-5MvFs3dN-lg5SYXHG6ojmMBFVQ5fzPXKkf8HwiWzQ4mikbuiM1niMRQmCHnQbMYSkpeot1NIsMcwV9w',
    altText: 'Professional headshot of Shubhichha Srivastava, Head of Medical Operations.',
    credentials: 'Clinical Trial Specialist & Regulatory Compliance',
    linkedin: '#'
  }
];

export const PRODUCTS: ProductFeature[] = [
  {
    id: 'iv-drip',
    name: 'Automated IV Drip Monitoring',
    tagline: 'Ensuring absolute patient safety through intelligent fluid dynamics.',
    badge: 'Fluid Management',
    badgeIcon: 'monitor_heart',
    description: 'Ensuring absolute patient safety through intelligent fluid dynamics. Our automated system continuously measures drip patterns with micron-level precision, instantaneously adjusting flow rates to prevent medical complications. Built for both high-dependency units and decentralized care environments.',
    bulletPoints: [
      'Real-time flow rate adjustment with micron-level optical drop counting',
      'Automated safety pattern recognition & air-bubble occlusion detection',
      'Seamless wireless integration with centralized nursing stations & hospital EHRs'
    ],
    imageUrl: BRAND_ASSETS.ivProduct,
    specs: [
      { label: 'Flow Accuracy', value: '± 1.5% micro-precision' },
      { label: 'Battery Backup', value: '36 Hours Active Lithium-Polymer' },
      { label: 'Connectivity', value: 'BLE 5.2 / Wi-Fi / HL7-FHIR' },
      { label: 'Alert Latency', value: '< 250ms immediate trigger' }
    ]
  },
  {
    id: 'cardiocare',
    name: 'Cardiocare: Mobile ECG',
    tagline: 'Democratizing cardiac diagnostics with pocket-sized clinical fidelity.',
    badge: 'Diagnostic Mobility',
    badgeIcon: 'ecg',
    description: 'Democratizing cardiac diagnostics. Cardiocare is a revolutionary pocket-sized device that delivers clinical-grade, real-time ECG monitoring directly via smartphone connectivity. Designed for rapid triage and remote patient monitoring, it brings the cardiology lab to the patient’s location.',
    bulletPoints: [
      'Ultra-compact pocket design engineered for field triage and home care',
      'Seamless smartphone integration with instantaneous automated report generation',
      'Instant secure data transmission encrypted to HIPAA & ISO-27001 standards'
    ],
    imageUrl: BRAND_ASSETS.ecgProduct,
    specs: [
      { label: 'Signal Resolution', value: '24-bit ADC @ 1000 Hz' },
      { label: 'Weight', value: '42 grams ultra-lightweight' },
      { label: 'Channels', value: 'Multi-lead cardiac rhythm stream' },
      { label: 'AI Triage', value: 'Automated arrhythmia classification' }
    ]
  }
];

export const STRATEGIC_GOALS: StrategicGoal[] = [
  {
    title: 'Scale Manufacturing',
    description: 'Rapidly scaling production capabilities for our smart IV monitoring systems to meet growing institutional demand while maintaining strict quality control.',
    icon: 'precision_manufacturing',
    metric: '10k units/quarter capacity'
  },
  {
    title: 'AI Integration',
    description: 'Integrating advanced AI-driven diagnostics into the Cardiocare ecosystem to provide predictive insights and automated anomaly detection.',
    icon: 'memory',
    metric: '99.4% arrhythmia detection'
  },
  {
    title: 'Rural Expansion',
    description: 'Expanding our technological footprint to rural healthcare centers, bridging the gap between advanced diagnostic tools and remote populations.',
    icon: 'public',
    metric: '100+ Primary Health Centers'
  }
];

export const IMPACT_MILESTONES: ImpactMilestone[] = [
  {
    phase: 'Phase 1',
    title: 'IIT Patna Incubation & Prototyping',
    status: 'In Progress',
    date: '2026 - 2027',
    desc: 'Secured institutional grants and finalizing hardware architecture for optical IV drop analysis and miniaturized ECG bio-amplifier.'
  },
  {
    phase: 'Phase 2',
    title: 'Multi-Center Clinical Validation',
    status: 'Upcoming',
    date: '2027 - 2028',
    desc: 'Planning patient trials in secondary and tertiary hospitals to benchmark precision against standard ICU infusion pumps and 12-lead carts.'
  },
  {
    phase: 'Phase 3',
    title: 'CDSCO Regulatory Certification & Mass Scale',
    status: 'Upcoming',
    date: '2027 - 2028',
    desc: 'Filing for ISO 13485 medical device clearance and commencing commercial supply across Indian state health missions and private chains.'
  },
  {
    phase: 'Phase 4',
    title: 'Global South Remote Triage Deployment',
    status: 'Upcoming',
    date: '2027 - 2028',
    desc: 'Deploying low-cost AI telemetry suites to Southeast Asia and Sub-Saharan healthcare missions.'
  }
];
