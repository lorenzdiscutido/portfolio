export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  overview: string;
  architectureDetails: string;
  techStack: string[];
  outcomes: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "gemini-defect-logger",
    title: "Gemini Defect Logger",
    role: "Lead Developer",
    overview:
      "Developed an automated defect logging application that utilizes the Google Gemini API to process field inspection photographs. The system extracts defect dimensions and logs the structured data directly into enterprise SharePoint Excel workbooks, eliminating manual data entry bottlenecks.",
    architectureDetails:
      "Field engineers upload inspection imagery through a Python Streamlit interface. The backend preprocesses each image and invokes the multimodal Gemini API using a strict structured-output schema to extract defect classifications, severity ratings, and dimensional measurements. Validated payloads are then authenticated against Microsoft Entra ID and appended directly into centralized SharePoint Online Excel tables via Microsoft Graph API.",
    techStack: [
      "Python",
      "Streamlit",
      "Google Gemini API",
      "Microsoft SharePoint",
      "Microsoft Entra ID",
      "Pandas",
    ],
    outcomes: [
      "Eliminated manual transcription bottlenecks between field inspection photos and enterprise SharePoint tracking sheets.",
      "Standardized defect classification and dimensional logging through deterministic multimodal schema extraction.",
      "Integrated seamlessly with existing Microsoft 365 enterprise permissions and SharePoint Online storage.",
    ],
  },
  {
    slug: "iskiosk-terminal",
    title: "IsKiosk Terminal",
    role: "Systems Engineer / Hardware Integrator",
    overview:
      "IsKiosk is an automated physical document management and tracking terminal engineered to streamline academic and institutional document submissions. By combining an intuitive touchscreen interface with on-demand barcode sticker printing and microcontroller-driven solenoid drawer locks, the terminal bridges digital workflow validation with secure physical storage.",
    architectureDetails:
      "The system architecture decouples the user-facing kiosk interface from the low-level hardware control layer via serial UART communication. When a user authenticates and registers a document, the application layer generates a unique tracking payload, triggers the thermal barcode printer, and dispatches a signed command to the microcontroller unit (MCU). The MCU energizes the appropriate relay-controlled 12V solenoid drawer lock and monitors reed-switch feedback sensors to confirm physical compartment closure before committing the transaction state.",
    techStack: [
      "C / C++",
      "Microcontrollers (MCU)",
      "Solenoid Lock Integration",
      "Thermal Barcode Printing",
      "Serial UART Protocol",
      "ISO/IEC 25010 Framework",
    ],
    outcomes: [
      "Validated and evaluated against ISO/IEC 25010 software product quality standards across functional suitability, reliability, and usability.",
      "Eliminated manual receiving bottlenecks by automating barcode labeling and physical compartment routing.",
      "Engineered fail-safe hardware interlocks ensuring drawers remain mechanically secured during power or communication faults.",
    ],
  },
  {
    slug: "tailscale-db-cluster",
    title: "Tailscale DB Cluster",
    role: "Network & Database Engineer",
    overview:
      "Designed and deployed a resilient, multi-node master-master MySQL database replication cluster distributed across geographically separated Linux hosts. Using a zero-trust Tailscale mesh VPN overlay, the architecture provides encrypted, low-latency database synchronization without exposing database ports to the public internet.",
    architectureDetails:
      "Each Linux database node participates in a peer-to-peer WireGuard mesh managed by Tailscale, binding MySQL replication traffic exclusively to private Tailnet IPv4 addresses (`100.x.y.z`). Circular master-master GTID-based replication is configured with staggered `auto_increment_increment` and `auto_increment_offset` parameters to prevent primary key collisions during concurrent writes. Automated health checks and systemd service watchdogs monitor replication lag and tunnel availability across nodes.",
    techStack: [
      "MySQL (GTID Replication)",
      "Tailscale (WireGuard Mesh)",
      "Linux (Ubuntu / Debian)",
      "Systemd & Bash Automation",
      "Access Control Lists (ACLs)",
    ],
    outcomes: [
      "Achieved active-active high availability and continuous data synchronization across distributed sites without complex site-to-site hardware VPNs.",
      "Eliminated primary key collision risks during multi-site concurrent writes using deterministic auto-increment partitioning.",
      "Hardened database attack surface to zero public exposure via strict Tailnet ACL policies and encrypted point-to-point WireGuard tunnels.",
    ],
  },
];
