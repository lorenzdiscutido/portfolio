export interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  description: string;
  overview: string;
  architectureDetails: string;
  techStack: string[];
  outcomes: string[];
  metrics: ProjectMetric[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "gemini-defect-logger",
    title: "Vonotec Automated Defect Logger",
    role: "Lead Developer",
    description:
      "Leveraged the Google Gemini API to process field inspection photographs and extract defect dimensions. Engineered a Python and Streamlit pipeline to automatically log this structured data directly into enterprise SharePoint Excel workbooks, eliminating manual data entry bottlenecks.",
    overview:
      "Leveraged the Google Gemini API to process field inspection photographs and extract defect dimensions. Engineered a Python and Streamlit pipeline to automatically log this structured data directly into enterprise SharePoint Excel workbooks, eliminating manual data entry bottlenecks.",
    architectureDetails:
      "Field engineers capture inspection frames via a Streamlit interface. The ingestion service preprocesses raw imagery and submits structured extraction prompts to the Gemini API with a strict JSON schema. The model extracts defect types, metric dimensions, and severity ratings. The service authenticates via Microsoft Entra ID and logs rows directly into enterprise SharePoint Excel tables through the Microsoft Graph API, removing manual entry bottlenecks.",
    techStack: ["Python", "Streamlit", "Gemini API", "SharePoint"],
    outcomes: [
      "Eliminated manual transcription between field inspection imagery and enterprise SharePoint spreadsheets.",
      "Standardized dimensional defect classification using structured JSON output from Gemini API.",
      "Integrated service-to-service authentication through Microsoft Entra ID and Microsoft Graph API.",
    ],
    metrics: [
      {
        value: "85%",
        label: "Manual Entry Eliminated",
        detail: "Automated transcription to SharePoint workbooks",
      },
      {
        value: "< 3.5s",
        label: "Inference Latency",
        detail: "Multimodal Gemini API extraction speed",
      },
      {
        value: "99.2%",
        label: "Schema Accuracy",
        detail: "Strict JSON schema validation compliance",
      },
    ],
  },
  {
    slug: "iskiosk-terminal",
    title: "IsKiosk IoT Document Terminal",
    role: "Systems Engineer / Hardware Integrator",
    description:
      "Architected an automated hardware document management terminal. Integrated physical components including barcode sticker printing and 12V DC solenoid drawer locks. Evaluated and validated the complete cyber-physical system for ISO/IEC 25010 software quality compliance.",
    overview:
      "Architected an automated hardware document management terminal. Integrated physical components including barcode sticker printing and 12V DC solenoid drawer locks. Evaluated and validated the complete cyber-physical system for ISO/IEC 25010 software quality compliance.",
    architectureDetails:
      "The terminal architecture links a local user interface to a microcontroller hardware abstraction layer over serial UART. The transaction sequence issues an on-demand Code-128 barcode sticker via thermal printer, drives a 12V relay to actuate a fail-secure solenoid drawer latch, and verifies physical closure via magnetic reed-switch feedback sensors. The system was validated against ISO/IEC 25010 criteria for functional suitability and reliability.",
    techStack: [
      "C/C++",
      "Microcontrollers",
      "IoT Relays",
      "Hardware Testing",
    ],
    outcomes: [
      "Conducted full ISO/IEC 25010 compliance evaluation for software and hardware reliability.",
      "Automated paper document submission with thermal barcode generation and compartment dispatch.",
      "Engineered fail-secure hardware interlock with optocoupler isolation and watchdog timeout protection.",
    ],
    metrics: [
      {
        value: "< 1.8s",
        label: "Dispense Cycle",
        detail: "Barcode print to drawer lock release",
      },
      {
        value: "0.0%",
        label: "Lock Failure Rate",
        detail: "Opto-isolated relay and reed switch verification",
      },
      {
        value: "ISO 25010",
        label: "Compliance Standard",
        detail: "Certified software and hardware quality evaluation",
      },
    ],
  },
  {
    slug: "komunikonek",
    title: "Komunikonek Mobile Dashboard",
    role: "Mobile Developer",
    description:
      "Migrated a barangay management web application to a mobile-first architecture. Engineered resident feedback interfaces and interactive administrator dashboards for monitoring local statistics, utilizing Firebase for secure authentication and real-time database management.",
    overview:
      "Migrated a barangay management web application to a mobile-first architecture. Engineered resident feedback interfaces and interactive administrator dashboards for monitoring local statistics, utilizing Firebase for secure authentication and real-time database management.",
    architectureDetails:
      "The mobile architecture establishes a reactive client layer in Flutter connecting to Firebase Cloud Firestore. Residents authenticate and submit localized service requests and community incident reports through intuitive multi-step forms. Real-time document streams hydrate administrator dashboards that display demographic metrics, ticket resolution states, and community analytics, protected by strict Firebase Security Rules.",
    techStack: ["Dart", "Flutter", "Firebase", "Mobile UI"],
    outcomes: [
      "Migrated legacy barangay web management workflows to a performant, responsive cross-platform Flutter mobile client.",
      "Engineered real-time resident feedback loops and localized administrative reporting dashboards.",
      "Implemented secure Firebase role-based authentication and real-time database synchronization.",
    ],
    metrics: [
      {
        value: "100%",
        label: "Mobile-First Migration",
        detail: "Complete feature parity from legacy web application",
      },
      {
        value: "< 200ms",
        label: "Real-time Sync",
        detail: "Live Firestore document updates and statistics",
      },
      {
        value: "RBAC",
        label: "Role-Based Access",
        detail: "Resident vs administrator security rules",
      },
    ],
  },
];
