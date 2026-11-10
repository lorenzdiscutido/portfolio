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
      "Engineered a production multimodal AI pipeline leveraging the Google Gemini API tuned specifically for high-accuracy OCR and dimensional extraction from physical whiteboard photographs. Built with Python and Streamlit, the system automatically logs structured inspection records directly into enterprise SharePoint Excel workbooks, quantifying over 4,750+ facade defects and 5,100+ linear meters of repairs. The pipeline enforces strict structured JSON schema enforcement with Pydantic type validation and incorporates resilient error handling algorithms for backlit or blurry field photographs.",
    problem:
      "Field engineering inspections historically required manual transcription of defect coordinates and dimensions from whiteboard photos into enterprise spreadsheets, causing severe data latency (often 48–72 hours), human transcription errors, and major operational bottlenecks. Inspection photos taken on scaffolding suffered from extreme sun backlighting, lens blur, perspective tilt, and variable handwritten marker legibility.",
    architecture:
      "Engineered an automated multimodal ingestion and extraction pipeline utilizing Python, Streamlit, and the Google Gemini API. Multimodal prompts were carefully engineered and tuned for OCR and dimensional extraction from physical reference scales, paired with structured JSON schema enforcement to ensure deterministic output. Built-in error handling algorithms for backlit or blurry field photographs execute contrast normalization and perspective correction prior to serializing bounding coordinates and metric measurements into enterprise SharePoint Excel workbooks via the Microsoft Graph API.",
    outcome:
      "Eliminated manual data transcription entirely, accelerated field-to-office defect approvals by over 85%, synchronized real-time repair quantities into enterprise Odoo ERP workflows, and cataloged 4,754 verified facade defects across 104 elevation drops.",
    architectureDetails:
      "Field engineers batch-upload high-resolution inspection whiteboard photographs through a Streamlit client. The ingestion pipeline executes contrast equalization and perspective rectification before dispatching the payload to the Gemini API with strict JSON schema constraints. The model extracts structural defect types (hairline cracks, spalling, honeycombs), metric dimensions (length, width, area), and elevation markers. After schema validation, the service authenticates via Microsoft Entra ID OAuth 2.0 client credentials and writes row-level records with thumbnail previews directly into enterprise SharePoint Excel tables through the Microsoft Graph API, automatically updating Odoo ERP repair orders.",
    techStack: ["Python", "Streamlit", "Gemini API", "SharePoint"],
    liveUrl: "https://vonotec-whiteboard-sharepoint-clean.streamlit.app/",
    outcomes: [
      "Eliminated manual transcription between field inspection imagery and enterprise SharePoint spreadsheets.",
      "Tuned Gemini multimodal prompts for high-accuracy OCR and dimensional extraction from physical scales.",
      "Applied structured JSON schema enforcement to guarantee deterministic, type-safe defect payloads.",
      "Engineered robust error handling algorithms for backlit or blurry field photographs taken on scaffolding.",
      "Integrated service-to-service authentication through Microsoft Entra ID and Microsoft Graph API.",
      "Synchronized real-time repair quantities into enterprise Odoo ERP workflows.",
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
    role: "QA Tester",
    lastModified: "2026-05-15",
    overview:
      "A robust Cyber-Physical System engineered for low-resource academic settings, balancing local-first hardware integration (Dell Wyse 5070 + Arduino Uno + 12V Solenoid + Opto-isolated relay) with an offline-first server environment. As QA Tester, led end-to-end system validation, automated test cases, and ISO/IEC 25010 empirical software quality evaluation across student and faculty cohorts, validating a 91.4% throughput increase (reducing document cycle time from 315s down to 27s) and achieving an overall 3.70/4.00 'Highly Acceptable' rating.",
    problem:
      "Academic document management and clearance retrieval relied on manual logbooks and physical queuing, taking an average of 315 seconds per document transaction with frequent tracking errors and custodial bottlenecks.",
    architecture:
      "Engineered an offline-first Cyber-Physical Terminal combining a local-first software stack with dedicated embedded hardware: Dell Wyse 5070 + Arduino Uno + 12V Solenoid + Opto-isolated relay. Powered by a Dell Wyse 5070 Mini PC running PHP & Laravel with Laragon local database logging, a Node.js real-time serial hardware bridge to an Arduino Uno R3, 2-channel relay modules actuating 12V solenoid dropboxes, HC-SR04 ultrasonic capacity sensors, and a GOOJPRT thermal receipt printer. Outbound security tokens and notifications are dispatched asynchronously via Python and FastAPI hosted on Render.",
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
      "Led comprehensive ISO/IEC 25010 software quality evaluation with students and faculty, scoring 3.70/4.00 across 5 core dimensions.",
      "Conducted comparative time-motion QA studies validating a 91.4% throughput gain (reducing transaction cycle from 315s to 27s).",
      "Designed and executed end-to-end QA test cases covering barcode scanner intake, offline Laragon SQL synchronization, and thermal printer reliability.",
      "Validated physical actuator reliability, opto-isolated relay fail-safes, and ultrasonic capacity detection to eliminate drawer jamming.",
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
        src: "/projects/iskiosk-cad-model.jpg",
        caption: "3D CAD Schematic & Mechanical Blueprints: Primary engineering schematic specifying the 94 cm chassis height, 15\" capacitive touchscreen angled mount (26 cm × 45 cm), opto-isolated relay bays, and dual 40 cm × 35 cm solenoid-locked drop compartments.",
        aspect: "wide",
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
      {
        src: "/projects/iskiosk-flowchart.jpg",
        caption: "System User Flowchart: Decision tree mapping the student authentication pathway (barcode school ID scan vs manual fallback entry) leading to automated document dispatch.",
        aspect: "wide",
      },
      {
        src: "/projects/iskiosk-logo.png",
        caption: "Official IsKiosk: Document Management System project identity & brand emblem.",
        aspect: "standard",
      },
    ],
  },
  {
    slug: "komunikonek",
    title: "Komunikonek: Barangay Digital Hub",
    role: "Mobile Developer",
    lastModified: "2024-09-10",
    githubUrl: "https://github.com/lorenzdiscutido/Komunikonek-app",
    overview:
      "Komunikonek was engineered to digitize and streamline local governance. It serves as a centralized, real-time mobile communication hub for barangay residents, transforming slow, paper-based local administration into an accessible digital dashboard with offline SQLite caching and automated Cloud Function push triggers.",
    problem:
      "Barangay announcements and emergency advisories were historically paper notices pinned to corkboards, resulting in days of information latency, lost dispute tickets, and zero audit trails for citizen grievances. In intermittent rural cellular environments, residents were unable to reliably access centralized web services. Solved through an embedded offline-first SQLite synchronization queue and Cloud Function push notification triggers.",
    architecture:
      "Executed a complete migration to a mobile-first architecture utilizing Dart and Flutter with offline SQLite caching and Cloud Function push triggers. Engineered real-time resident feedback interfaces and interactive administrator dashboards. Leveraged Firebase for secure user authentication and real-time database state management.",
    outcome:
      "Delivered a highly responsive, cross-platform mobile client that streamlined local data monitoring and improved citizen-to-administrator communication.",
    architectureDetails:
      "The mobile architecture establishes a reactive client layer in Flutter connecting to Firebase Cloud Firestore with an embedded offline-first SQLite cache. This guarantees that residents in low-connectivity cellular zones can draft incident reports and review emergency advisories without network dropouts; pending submissions queue locally and synchronize deterministically once connectivity resumes. Real-time document streams hydrate administrator dashboards displaying localized demographic statistics, ticket SLA progression, and community analytics, governed by strict Firebase Security Rules enforcing resident vs administrator access controls.",
    techStack: ["Dart", "Flutter", "Firebase", "SQLite (Offline Cache)", "Mobile UI"],
    outcomes: [
      "Migrated legacy barangay web management workflows to a performant, responsive cross-platform Flutter mobile client.",
      "Engineered an offline-first caching layer ensuring continuous usability during intermittent rural cellular connectivity.",
      "Engineered real-time resident feedback loops and localized administrative reporting dashboards with sub-200ms document synchronization.",
      "Implemented secure Firebase role-based authentication (RBAC) and declarative Cloud Firestore security rules.",
      "Reduced citizen issue reporting cycle latency from days down to minutes with complete end-to-end status transparency.",
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
