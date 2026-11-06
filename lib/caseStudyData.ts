export interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ProjectScreenshot {
  src: string;
  caption: string;
  aspect?: "wide" | "tall" | "standard";
}

export interface IsoMetric {
  characteristic: string;
  score: string;
  interpretation: string;
}

export interface FinancialMetric {
  totalCost: string;
  annualSavings: string;
  roi: string;
  paybackPeriod: string;
}

export interface AcademicAttribution {
  authors: string[];
  institution: string;
  advisers: string[];
  panel: string;
  defenseDate: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  lastModified: string;
  overview: string;
  problem: string;
  architecture: string;
  outcome: string;
  architectureDetails: string;
  techStack: string[];
  outcomes: string[];
  metrics: ProjectMetric[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoEmbedUrl?: string;
  logoUrl?: string;
  screenshots?: ProjectScreenshot[];
  academic?: AcademicAttribution;
  isoEvaluation?: IsoMetric[];
  financials?: FinancialMetric;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "vonotec-defect-logger",
    title: "Vonotec Automated Defect Logger",
    role: "Lead Developer",
    lastModified: "2025-02-15",
    overview:
      "Engineered a production multimodal AI pipeline leveraging the Google Gemini API to extract defect dimensions from field whiteboard photos. Built with Python and Streamlit, the system automatically logs structured inspection records directly into enterprise SharePoint Excel workbooks, quantifying over 4,750+ facade defects and 5,100+ linear meters of repairs.",
    problem:
      "Field inspections required manual data entry of defect dimensions from photographs into enterprise systems, causing operational bottlenecks and data latency.",
    architecture:
      "Engineered a Python and Streamlit pipeline integrating the Google Gemini API to process image data autonomously. Designed the system to extract precise defect dimensions and interface directly with enterprise SharePoint Excel workbooks for automated logging.",
    outcome:
      "Eliminated manual data entry, optimized the approval workflow within the Odoo ERP environment, and established a scalable AI-driven data pipeline.",
    architectureDetails:
      "Field engineers capture inspection frames via a Streamlit interface. The ingestion service preprocesses raw imagery and submits structured extraction prompts to the Gemini API with a strict JSON schema. The model extracts defect types, metric dimensions, and severity ratings. The service authenticates via Microsoft Entra ID and logs rows directly into enterprise SharePoint Excel tables through the Microsoft Graph API, removing manual entry bottlenecks and synchronizing operational status with Odoo ERP.",
    techStack: ["Python", "Streamlit", "Gemini API", "SharePoint"],
    liveUrl: "https://vonotec-whiteboard-sharepoint-clean.streamlit.app/",
    outcomes: [
      "Eliminated manual transcription between field inspection imagery and enterprise SharePoint spreadsheets.",
      "Standardized dimensional defect classification using structured JSON output from Gemini API.",
      "Integrated service-to-service authentication through Microsoft Entra ID and Microsoft Graph API.",
      "Optimized field approval workflows and synchronized operational status within the Odoo ERP environment.",
    ],
    metrics: [
      {
        value: "4,754",
        label: "Defects Processed",
        detail: "104 inspection batches across facade elevations",
      },
      {
        value: "5,102 LM",
        label: "Linear Repair Vol.",
        detail: "Quantified crack & sealant repair scope",
      },
      {
        value: "85%",
        label: "Manual Entry Eliminated",
        detail: "Direct sync to enterprise SharePoint Excel master",
      },
    ],
    screenshots: [
      {
        src: "/projects/vonotec-defect-extraction-ui.jpg",
        caption: "Streamlit Ingestion & Extraction UI: Field engineers batch-upload inspection whiteboard photographs with direct SharePoint folder destinations and automated extraction pipelines.",
        aspect: "standard",
      },
      {
        src: "/projects/vonotec-analytics-dashboard.jpg",
        caption: "Facade Defect Analytics Dashboard: Real-time telemetry monitoring 4,754 total defects, 5,102.50 LM linear repair volume, 672.84 SQM area repairs, and category breakdowns across concrete, bugholes, and sealants.",
        aspect: "standard",
      },
      {
        src: "/projects/vonotec-sharepoint-excel-log.jpg",
        caption: "Enterprise SharePoint Online Excel Master: Automated row-level records detailing elevation, drop, floor, damage dimensions, embedded photo thumbnails, possible causes, and structural repair specifications.",
        aspect: "wide",
      },
    ],
  },
  {
    slug: "iskiosk-terminal",
    title: "IsKiosk: Document Management System",
    role: "Systems Engineer & Hardware Integrator",
    lastModified: "2026-05-15",
    overview:
      "A robust Cyber-Physical System engineered for low-resource academic settings, balancing local-first hardware integration with an offline-first server environment. Reduced document cycle time from 315s down to 27s (91.4% throughput increase) and achieved a 3.70/4.00 'Highly Acceptable' rating in ISO/IEC 25010 software quality evaluation.",
    problem:
      "Academic document management and clearance retrieval relied on manual logbooks and physical queuing, taking an average of 315 seconds per document transaction with frequent tracking errors and custodial bottlenecks.",
    architecture:
      "Engineered an offline-first Cyber-Physical Terminal combining a local-first software stack with dedicated embedded hardware. Powered by a Dell Wyse 5070 Mini PC running PHP & Laravel with Laragon local database logging, a Node.js real-time serial hardware bridge to an Arduino Uno R3, 2-channel relay modules actuating 12V solenoid dropboxes, HC-SR04 ultrasonic capacity sensors, and a GOOJPRT thermal receipt printer. Outbound security tokens and notifications are dispatched asynchronously via Python and FastAPI hosted on Render.",
    outcome:
      "Achieved a 91.4% increase in processing throughput (reducing cycle times from 315s to 27s), an annualized net administrative savings of ₱77,800.00 (159.3% ROI with 4.63-month capital payback), and passed ISO/IEC 25010 software quality compliance with an overall weighted mean of 3.70 / 4.00 ('Highly Acceptable').",
    architectureDetails:
      "Core transaction flows (user credentials, barcode generation, local SQL logging, and physical drawer actuation) execute 100% locally on a Dell Wyse 5070 Mini PC via Laragon, ensuring continuous operation even during campus ISP outages. The Node.js hardware daemon bridges Laravel user actions to an Arduino Uno R3 over serial UART. When a document submission is validated, the Arduino commands a GOOJPRT thermal printer to dispense a Code-128 barcode sticker, trips an opto-isolated relay to energize a 12V solenoid lock, and samples HC-SR04 ultrasonic sensors to audit physical compartment capacity before re-locking.",
    techStack: [
      "PHP & Laravel",
      "Node.js (Serial Bridge)",
      "Arduino Uno (C/C++)",
      "Python & FastAPI",
      "Laragon Local SQL",
      "Tailwind CSS & Blade",
    ],
    outcomes: [
      "Conducted rigorous ISO/IEC 25010 software quality evaluation with students and faculty, scoring 3.70/4.00 across 5 core dimensions.",
      "Reduced document submission cycle time from 315 seconds to 27 seconds, achieving a verified 91.4% throughput gain in comparative time-motion studies.",
      "Engineered 100% offline-first local server reliability via Laragon, keeping kiosk operations fully functional during campus internet downtime.",
      "Designed economic model projecting ₱77,800.00 annual savings, 159.3% ROI, and 4.63-month amortized capital payback on a ₱30,000.00 project budget.",
    ],
    metrics: [
      {
        value: "91.4%",
        label: "Throughput Gain",
        detail: "Cycle reduced from 315s (manual) to 27s",
      },
      {
        value: "3.70 / 4.0",
        label: "ISO/IEC 25010 Score",
        detail: "Overall weighted mean ('Highly Acceptable')",
      },
      {
        value: "159.3%",
        label: "Projected ROI",
        detail: "4.63-month payback on ₱30k total budget",
      },
    ],
    academic: {
      authors: [
        "Jose Lorenzo Miguel P. Discutido",
        "Derick Carlo S. Herrera",
        "Yuan Gaebriel A. Marquez",
        "Jiro Ivan C. Ybanez",
      ],
      institution:
        "Bachelor of Science in Computer Engineering, Polytechnic University of the Philippines (PUP) - Manila",
      advisers: ["Dr. Arvin R. De La Cruz", "Engr. Julius S. Cansino"],
      panel: "Chaired by Engr. Cherry D. Casuat",
      defenseDate: "May 2026",
    },
    isoEvaluation: [
      {
        characteristic: "Functional Suitability",
        score: "3.74 / 4.00",
        interpretation: "Highly Acceptable",
      },
      {
        characteristic: "Usability",
        score: "3.73 / 4.00",
        interpretation: "Highly Acceptable",
      },
      {
        characteristic: "Performance Efficiency",
        score: "3.71 / 4.00",
        interpretation: "Highly Acceptable",
      },
      {
        characteristic: "Security",
        score: "3.71 / 4.00",
        interpretation: "Highly Acceptable",
      },
      {
        characteristic: "Reliability",
        score: "3.63 / 4.00",
        interpretation: "Highly Acceptable",
      },
    ],
    financials: {
      totalCost: "₱30,000.00",
      annualSavings: "₱77,800.00",
      roi: "159.3%",
      paybackPeriod: "4.63 Months",
    },
    liveUrl: "https://drive.google.com/file/d/1YTgg6ct2Wats8rLkGBlsTiJkr8QjnSFy/view?usp=sharing",
    demoVideoEmbedUrl: "https://drive.google.com/file/d/1YTgg6ct2Wats8rLkGBlsTiJkr8QjnSFy/preview",
    logoUrl: "/projects/iskiosk-logo.png",
    screenshots: [
      {
        src: "/projects/iskiosk-flowchart.jpg",
        caption: "System User Flowchart: Decision tree mapping the student authentication pathway (barcode school ID scan vs manual fallback entry) leading to automated document dispatch.",
        aspect: "wide",
      },
      {
        src: "/projects/iskiosk-cad-model.jpg",
        caption: "3D CAD & Dimensional Modeling: Full architectural schematic specifying the 94 cm chassis height, 15\" capacitive touchscreen angled mount (26 cm × 45 cm), and dual 40 cm × 35 cm slide-out compartments.",
        aspect: "wide",
      },
      {
        src: "/projects/iskiosk-logo.png",
        caption: "Official IsKiosk: Document Management System project identity & brand emblem.",
        aspect: "standard",
      },
      {
        src: "/projects/iskiosk-deployed-chassis.jpg",
        caption: "IsKiosk DMS deployed on PUP Manila campus, featuring the 15\" capacitive touchscreen interface, GOOJPRT thermal barcode printer, 2D scanner intake, and dual solenoid-locked drawers.",
        aspect: "tall",
      },
      {
        src: "/projects/iskiosk-internal-controller.jpg",
        caption: "Internal embedded hardware control unit: Arduino Uno microcontroller, 2-channel relay module, DC-DC step-down buck converter with voltage telemetry readout, and custom harness.",
        aspect: "tall",
      },
    ],
  },
  {
    slug: "komunikonek",
    title: "Komunikonek Mobile Dashboard",
    role: "Mobile Developer",
    lastModified: "2024-09-10",
    githubUrl: "https://github.com/lorenzdiscutido/Komunikonek-app",
    overview:
      "Migrated a barangay management web application to a mobile-first architecture. Engineered resident feedback interfaces and interactive administrator dashboards for monitoring local statistics, utilizing Firebase for secure authentication and real-time database management.",
    problem:
      "A barangay management web application suffered from poor mobile accessibility and inefficient resident feedback loops.",
    architecture:
      "Executed a complete migration to a mobile-first architecture utilizing Dart and Flutter. Engineered real-time resident feedback interfaces and interactive administrator dashboards. Leveraged Firebase for secure user authentication and real-time database state management.",
    outcome:
      "Delivered a highly responsive, cross-platform mobile client that streamlined local data monitoring and improved citizen-to-administrator communication.",
    architectureDetails:
      "The mobile architecture establishes a reactive client layer in Flutter connecting to Firebase Cloud Firestore. Residents authenticate and submit localized service requests and community incident reports through intuitive multi-step forms. Real-time document streams hydrate administrator dashboards that display demographic metrics, ticket resolution states, and community analytics, protected by strict Firebase Security Rules.",
    techStack: ["Dart", "Flutter", "Firebase", "Mobile UI"],
    outcomes: [
      "Migrated legacy barangay web management workflows to a performant, responsive cross-platform Flutter mobile client.",
      "Engineered real-time resident feedback loops and localized administrative reporting dashboards.",
      "Implemented secure Firebase role-based authentication and real-time database synchronization.",
      "Reduced citizen issue reporting cycle latency and improved community data visibility.",
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
