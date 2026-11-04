export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "master-master-mysql-replication-over-tailscale",
    title: "Architecting Master-Master MySQL Replication Over a Zero-Trust Tailscale Mesh",
    date: "October 24, 2026",
    excerpt:
      "How to eliminate single points of failure and public port exposure when synchronizing distributed Linux database nodes using WireGuard overlays and GTID replication.",
    content: `Deploying active-active database clusters across geographically separated sites traditionally requires complex site-to-site IPsec tunnels, static public IP allocations, and brittle firewall rules. By combining MySQL GTID-based circular replication with a Tailscale mesh network, we can achieve resilient multi-node synchronization with zero public attack surface.

Each Linux node joins a private Tailnet where traffic is authenticated and encrypted end-to-end via WireGuard. Instead of binding MySQL to 0.0.0.0, each mysqld instance binds strictly to its Tailscale interface IP (100.x.y.z), enforced further by Tailnet Access Control Lists (ACLs) that permit port 3306 exclusively between designated database nodes.

To prevent primary key collisions during simultaneous writes on both masters, we configure deterministic auto-increment partitioning: Node A operates with auto_increment_increment = 2 and auto_increment_offset = 1 (generating odd IDs), while Node B uses auto_increment_increment = 2 and auto_increment_offset = 2 (generating even IDs). Coupled with Global Transaction Identifiers (gtid_mode = ON and enforce_gtid_consistency = ON), failover and catch-up synchronization become automatic and deterministic.`,
    tags: ["MySQL", "Tailscale", "Linux", "Networking"],
  },
  {
    slug: "automating-field-defect-logging-with-gemini-and-sharepoint",
    title: "Automating Field Inspection Defect Logging with Gemini Multimodal AI & SharePoint",
    date: "November 2, 2026",
    excerpt:
      "Bridging unstructured field photography and enterprise Microsoft 365 workflows by extracting structured defect telemetry via the Google Gemini API.",
    content: `Field engineering inspections generate hundreds of high-resolution photographs documenting structural or hardware defects, yet manually transcribing measurements, defect categories, and timestamps into enterprise spreadsheets remains a major operational bottleneck.

To solve this at Vonotec, we architected a Python and Streamlit pipeline powered by the Google Gemini API. When an engineer uploads an inspection image, the application passes the image alongside a strict JSON schema prompt to the multimodal model. Gemini analyzes the visual reference markers, classifies the anomaly, and returns structured dimensional data.

Once validated by the operator, the payload authenticates via Microsoft Entra ID app registrations and writes directly into centralized SharePoint Online Excel workbooks. What previously required hours of manual post-inspection data entry now completes in seconds with standardized audit trails.`,
    tags: ["Python", "Gemini API", "SharePoint", "Entra ID"],
  },
];
