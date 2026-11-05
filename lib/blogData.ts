export interface BlogSection {
  heading: string;
  paragraphs: string[];
  codeSnippet?: {
    label: string;
    code: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  content: string;
  sections: BlogSection[];
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "master-master-mysql-replication-over-tailscale",
    title: "Architecting Master-Master MySQL Replication Over a Zero-Trust Tailscale Mesh",
    date: "October 24, 2024",
    publishedAt: "2024-10-24",
    readTime: "6 min read",
    excerpt:
      "How to eliminate single points of failure and public port exposure when synchronizing distributed Linux database nodes using WireGuard overlays and GTID replication.",
    content: `Deploying active-active database clusters across geographically separated sites traditionally requires complex site-to-site IPsec tunnels, static public IP allocations, and brittle firewall rules. By combining MySQL GTID-based circular replication with a Tailscale mesh network, we can achieve resilient multi-node synchronization with zero public attack surface.

Each Linux node joins a private Tailnet where traffic is authenticated and encrypted end-to-end via WireGuard. Instead of binding MySQL to 0.0.0.0, each mysqld instance binds strictly to its Tailscale interface IP (100.x.y.z), enforced further by Tailnet Access Control Lists (ACLs) that permit port 3306 exclusively between designated database nodes.

To prevent primary key collisions during simultaneous writes on both masters, we configure deterministic auto-increment partitioning: Node A operates with auto_increment_increment = 2 and auto_increment_offset = 1 (generating odd IDs), while Node B uses auto_increment_increment = 2 and auto_increment_offset = 2 (generating even IDs). Coupled with Global Transaction Identifiers (gtid_mode = ON and enforce_gtid_consistency = ON), failover and catch-up synchronization become automatic and deterministic.`,
    sections: [
      {
        heading: "1. The Problem with Traditional WAN Database Replication",
        paragraphs: [
          "Deploying active-active MySQL clusters across separated physical locations traditionally demands static public IPs, site-to-site IPsec tunnels, or exposing TCP port 3306 behind perimeter firewall rules. Any misconfiguration in NAT traversal or TLS certificate rotation introduces either replication downtime or severe security exposure.",
          "By moving the transport layer onto a zero-trust Tailscale WireGuard mesh, each Linux database host receives a stable 100.64.x.y CGNAT address inside an encrypted point-to-point overlay. MySQL never binds to a public interface.",
        ],
        codeSnippet: {
          label: "tailnet-acl.hujson // Zero-Trust Port 3306 Enforcement",
          code: `{
  "tagOwners": {
    "tag:db-master": ["autogroup:admin"]
  },
  "acls": [
    {
      "action": "accept",
      "src": ["tag:db-master"],
      "dst": ["tag:db-master:3306"]
    }
  ]
}`,
        },
      },
      {
        heading: "2. Deterministic Auto-Increment Partitioning & GTID Consistency",
        paragraphs: [
          "In a circular master-master topology where both Node A (100.64.0.1) and Node B (100.64.0.2) accept concurrent writes, standard auto-increment sequences will immediately collide during asynchronous binlog replay.",
          "To guarantee collision-free primary key generation without application-level UUID overhead, we partition the keyspace deterministically at the engine level: Node A generates odd integers (1, 3, 5...) and Node B generates even integers (2, 4, 6...). Combined with Global Transaction Identifiers (GTID), each node tracks applied transaction sets automatically without manual binlog file offset arithmetic.",
        ],
        codeSnippet: {
          label: "/etc/mysql/mysql.conf.d/mysqld.cnf (Node A: 100.64.0.1)",
          code: `[mysqld]
server-id                  = 1
bind-address               = 100.64.0.1
gtid_mode                  = ON
enforce_gtid_consistency   = ON
log_bin                    = mysql-bin
log_slave_updates          = ON
binlog_format              = ROW

# Deterministic Odd Key Partitioning
auto_increment_increment   = 2
auto_increment_offset      = 1`,
        },
      },
      {
        heading: "3. Automatic Failover & Catch-Up Synchronization",
        paragraphs: [
          "With GTID auto-positioning enabled (MASTER_AUTO_POSITION = 1), if a WAN link drops or a node reboots for kernel maintenance, the replica automatically negotiates the exact set of missing GTIDs upon reconnection over the WireGuard tunnel.",
          "This architecture powers our internal production telemetry at Vonotec with sub-20ms inter-node replication lag and zero exposed public database ports.",
        ],
      },
    ],
    tags: ["MySQL", "Tailscale", "Linux", "Networking"],
  },
  {
    slug: "automating-field-defect-logging-with-gemini-and-sharepoint",
    title: "Automating Field Inspection Defect Logging with Gemini Multimodal AI & SharePoint",
    date: "November 2, 2024",
    publishedAt: "2024-11-02",
    readTime: "5 min read",
    excerpt:
      "Bridging unstructured field photography and enterprise Microsoft 365 workflows by extracting structured defect telemetry via the Google Gemini API.",
    content: `Field engineering inspections generate hundreds of high-resolution photographs documenting structural or hardware defects, yet manually transcribing measurements, defect categories, and timestamps into enterprise spreadsheets remains a major operational bottleneck.

To solve this at Vonotec, we architected a Python and Streamlit pipeline powered by the Google Gemini API. When an engineer uploads an inspection image, the application passes the image alongside a strict JSON schema prompt to the multimodal model. Gemini analyzes the visual reference markers, classifies the anomaly, and returns structured dimensional data.

Once validated by the operator, the payload authenticates via Microsoft Entra ID app registrations and writes directly into centralized SharePoint Online Excel workbooks. What previously required hours of manual post-inspection data entry now completes in seconds with standardized audit trails.`,
    sections: [
      {
        heading: "1. Eliminating Field-to-Office Data Latency",
        paragraphs: [
          "Field engineering inspections produce hundreds of photographs documenting physical anomalies, reference rulers, and serial tags. Historically, engineers had to return to the office, manually review each image, read the dimensional markers, and transcribe rows into SharePoint Excel trackers—delaying Odoo ERP approval workflows by days.",
          "To eliminate this bottleneck at Vonotec, we engineered a Python and Streamlit ingestion portal that transforms raw inspection imagery directly into validated enterprise records.",
        ],
      },
      {
        heading: "2. Enforcing Strict Schema Extraction with Gemini Multimodal API",
        paragraphs: [
          "Free-form LLM text outputs are unsuitable for downstream ERP automation. By pairing the Google GenAI SDK with a strict Pydantic response schema, we force the multimodal model to return deterministic, type-safe JSON containing defect classification, millimeter measurements, and confidence scores.",
        ],
        codeSnippet: {
          label: "defect_extractor.py // Structured Multimodal Extraction",
          code: `from google import genai
from google.genai import types
from pydantic import BaseModel

class DefectRecord(BaseModel):
    defect_category: str
    width_mm: float
    length_mm: float
    severity: str
    inspector_notes: str

client = genai.Client()

def extract_defect_telemetry(image_bytes: bytes) -> DefectRecord:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
            "Extract dimensional defect measurements from the reference scale.",
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=DefectRecord,
            temperature=0.1,
        ),
    )
    return DefectRecord.model_validate_json(response.text)`,
        },
      },
      {
        heading: "3. Zero-Touch SharePoint Graph API & Odoo ERP Sync",
        paragraphs: [
          "Once the field operator confirms the extracted preview in Streamlit, the service acquires an OAuth 2.0 client credentials token via Microsoft Entra ID and appends the structured row directly into the target SharePoint Online workbook via Microsoft Graph REST endpoints.",
          "The pipeline cut manual transcription volume by 85% while maintaining a 99.2% schema validation pass rate across field deployments.",
        ],
      },
    ],
    tags: ["Python", "Gemini API", "SharePoint", "Entra ID"],
  },
];
