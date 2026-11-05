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
    title: "Vonotec Whiteboard & Automated Defect Logger",
    role: "Lead Developer / Systems Engineer",
    description: "An AI-integrated Streamlit application for field inspections.",
    overview:
      "An AI-integrated Streamlit application for field inspections. Leverages the Google Gemini API to process field inspection photographs, extract defect dimensions, and automatically log structured data into SharePoint Excel workbooks.",
    architectureDetails:
      "Field engineers capture inspection frames via a Streamlit interface. The ingestion service preprocesses raw imagery and submits structured extraction prompts to the Gemini API with a strict JSON schema. The model extracts defect types, metric dimensions, and severity ratings. The service authenticates via Microsoft Entra ID and logs rows directly into enterprise SharePoint Excel tables through the Microsoft Graph API, removing manual entry bottlenecks.",
    techStack: ["Python", "Streamlit", "Gemini API", "SharePoint", "Pandas"],
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
    description: "Automated hardware document management system.",
    overview:
      "Automated hardware document management system. Designed and evaluated a physical kiosk integrating barcode sticker printing and solenoid drawer locks. Conducted full ISO/IEC 25010 compliance testing for system reliability.",
    architectureDetails:
      "The terminal architecture links a local user interface to a microcontroller hardware abstraction layer over serial UART. The transaction sequence issues an on-demand Code-128 barcode sticker via thermal printer, drives a 12V relay to actuate a fail-secure solenoid drawer latch, and verifies physical closure via magnetic reed-switch feedback sensors. The system was validated against ISO/IEC 25010 criteria for functional suitability and reliability.",
    techStack: [
      "C/C++",
      "Microcontrollers",
      "IoT Relays",
      "Database Management",
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
    slug: "tailscale-db-cluster",
    title: "Distributed Database Replication Network",
    role: "Network & Database Engineer",
    description: "Secure multi-node database architecture.",
    overview:
      "Secure multi-node database architecture. Implemented a multi-node, master-master MySQL database replication cluster across Linux devices utilizing Tailscale for encrypted peer-to-peer networking.",
    architectureDetails:
      "Each Linux node is meshed over Tailscale WireGuard point-to-point tunnels, binding MySQL replication traffic exclusively to private Tailnet IP addresses (100.64.0.0/10) with zero open public ports. Master-master GTID replication is configured with distinct auto_increment_increment and auto_increment_offset values to avoid write collisions across distributed nodes. Systemd timers and bash monitoring scripts verify replication lag and connection health.",
    techStack: ["MySQL", "Linux", "Tailscale", "Networking"],
    outcomes: [
      "Deployed active-active database replication across geographically distributed Linux nodes.",
      "Isolated replication traffic over encrypted WireGuard peer-to-peer mesh with zero public internet port exposure.",
      "Prevented primary key collisions during concurrent multi-master writes using deterministic auto-increment partitioning.",
    ],
    metrics: [
      {
        value: "0 Ports",
        label: "Public Exposure",
        detail: "Zero public internet ports exposed",
      },
      {
        value: "< 18ms",
        label: "Replication Lag",
        detail: "Encrypted peer-to-peer WireGuard sync",
      },
      {
        value: "Active-Active",
        label: "Cluster Topology",
        detail: "Multi-node circular GTID replication",
      },
    ],
  },
];
