"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DiagramNode {
  id: string;
  label: string;
  sublabel: string;
  protocol: string;
  summary: string;
  configSnippet: string;
  payloadSnippet: string;
  latencyMs: number;
  securityDomain: string;
}

interface DiagramSpec {
  topologyTitle: string;
  subtitle: string;
  nodes: DiagramNode[];
}

const DIAGRAMS: Record<string, DiagramSpec> = {
  "gemini-defect-logger": {
    topologyTitle: "Multimodal AI → Enterprise SharePoint Pipeline",
    subtitle: "Click any pipeline stage below to inspect its data contract, live payload, and security boundary",
    nodes: [
      {
        id: "capture",
        label: "1. Streamlit Field UI",
        sublabel: "Image & Metadata Capture",
        protocol: "HTTPS / Multipart Upload",
        summary:
          "Field engineers capture or upload inspection photographs directly from mobile or tablet browsers. Images are normalized and buffered in memory prior to inference.",
        latencyMs: 120,
        securityDomain: "Client Browser / HTTPS TLS 1.3",
        configSnippet: `# Streamlit image intake & preprocessing
uploaded_file = st.file_uploader("Upload Inspection Photo", type=["jpg", "png"])
if uploaded_file:
    image_bytes = preprocess_inspection_frame(uploaded_file.read())
    metadata = {
        "inspector_id": st.session_state.user_id,
        "site_code": "MNL-TOWER-04",
        "timestamp": datetime.utcnow().isoformat()
    }`,
        payloadSnippet: `{
  "event": "INSPECTION_FRAME_BUFFERED",
  "batch_id": "BATCH_20261111_042",
  "filename": "facade_crack_purok3.jpg",
  "mime_type": "image/jpeg",
  "byte_size": 4410294,
  "dimensions": { "width": 3024, "height": 4032 },
  "exif_gps": { "lat": 14.5995, "lng": 120.9842 },
  "client_auth": "Bearer eyJhbGciOi..."
}`,
      },
      {
        id: "gemini",
        label: "2. Google Gemini API",
        sublabel: "Multimodal Schema Extraction",
        protocol: "gRPC / REST (JSON Schema)",
        summary:
          "Invokes Gemini multimodal inference with a strict response schema to deterministically extract defect classification, dimensions (mm), and severity.",
        latencyMs: 840,
        securityDomain: "Google Cloud / VPC Service Controls",
        configSnippet: `response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image_part, EXTRACTION_PROMPT],
    config={
        "response_mime_type": "application/json",
        "response_schema": DefectExtractionSchema,
        "temperature": 0.1
    }
)`,
        payloadSnippet: `{
  "model_version": "gemini-2.5-flash-001",
  "inference_latency_ms": 842,
  "schema_validated": true,
  "extracted_defects": [
    {
      "defect_id": "DEF-001",
      "classification": "Concrete Spall / Surface Crack",
      "severity": "CRITICAL",
      "linear_meters": 5.102,
      "width_mm": 4.8,
      "confidence_score": 0.9942,
      "requires_patching": true
    }
  ],
  "token_usage": { "prompt_tokens": 1280, "output_tokens": 142 }
}`,
      },
      {
        id: "auth",
        label: "3. Microsoft Entra ID",
        sublabel: "OAuth 2.0 Client Credentials",
        protocol: "MSAL / Bearer Token",
        summary:
          "Authenticates service-to-service requests against the enterprise tenant using scoped application permissions before touching SharePoint storage.",
        latencyMs: 140,
        securityDomain: "Microsoft Entra ID / Conditional Access",
        configSnippet: `app = msal.ConfidentialClientApplication(
    CLIENT_ID, authority=f"https://login.microsoftonline.com/{TENANT_ID}",
    client_credential=CLIENT_SECRET
)
token = app.acquire_token_for_client(
    scopes=["https://graph.microsoft.com/.default"]
)`,
        payloadSnippet: `{
  "token_type": "Bearer",
  "expires_in": 3599,
  "ext_expires_in": 3599,
  "scope": "https://graph.microsoft.com/.default",
  "audience": "https://graph.microsoft.com",
  "tenant_id": "72f988bf-86f1-41af-91ab-2d7cd011db47",
  "client_app_id": "9b1e4a81-2291-4e4b-9118-vonotec-logger",
  "token_cached": true
}`,
      },
      {
        id: "sharepoint",
        label: "4. SharePoint Online",
        sublabel: "Automated Workbook Logging",
        protocol: "Microsoft Graph REST API",
        summary:
          "Appends validated defect rows directly into the target SharePoint Excel workbook table, preserving enterprise audit trails and eliminating manual entry.",
        latencyMs: 230,
        securityDomain: "Microsoft 365 Enterprise Security",
        configSnippet: `POST https://graph.microsoft.com/v1.0/sites/{site-id}/drive/items/{item-id}/workbook/tables/DefectLog/rows/add
{
  "values": [
    [timestamp, defect_type, width_mm, height_mm, severity, inspector_id]
  ]
}`,
        payloadSnippet: `{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#workbookTableRow",
  "id": "row_4755",
  "index": 4754,
  "values": [
    [
      "2026-11-11T05:22:14Z",
      "Concrete Spall / Surface Crack",
      4.8,
      5102,
      "CRITICAL",
      "ENG-VONOTEC-089"
    ]
  ],
  "status": "HTTP_201_CREATED",
  "enterprise_sync_ack": true
}`,
      },
    ],
  },
  "iskiosk-terminal": {
    topologyTitle: "Offline-First Cyber-Physical Pipeline & Actuation Flow",
    subtitle: "Click any hardware module or software service to inspect its data contract",
    nodes: [
      {
        id: "kiosk-ui",
        label: "1. Dell Wyse Mini PC",
        sublabel: "Laravel MVC & Laragon Local Server",
        protocol: "Localhost / Offline-First SQL",
        summary:
          "Runs 100% locally on a Dell Wyse 5070 Mini PC driving a 15-inch capacitive touchscreen. Handles form validations, barcode generation, and transaction state machines even during campus ISP outages.",
        latencyMs: 45,
        securityDomain: "Local Isolated Mini PC / No Public Ports",
        configSnippet: `// Laravel Document Transaction Engine (Localhost Laragon)
$tx = DocumentTransaction::create([
    'tracking_code' => Str::upper(Str::random(10)),
    'compartment_id' => $assignedDrawer,
    'status' => 'PENDING_PHYSICAL_DISPATCH',
]);
$hardwareDaemon->dispatchPrintAndActuate($tx);`,
        payloadSnippet: `{
  "transaction_id": "TX_ISKIOSK_88294",
  "student_id": "2021-09412-MN-0",
  "document_type": "Official Transcript of Records (OTR)",
  "assigned_compartment": 1,
  "timestamp": "2026-11-11T05:23:01Z",
  "offline_mode": true,
  "sync_state": "LOCAL_JOURNAL_COMMITTED"
}`,
      },
      {
        id: "printer",
        label: "2. GOOJPRT Thermal Printer",
        sublabel: "Code-128 Barcode & 2D Scanner",
        protocol: "ESC/POS over USB-HID",
        summary:
          "Generates on-demand Code-128 barcode stickers containing human-readable tracking identifiers before drawer release. USB-HID scanner verifies returned tokens.",
        latencyMs: 380,
        securityDomain: "Local USB-HID Bus (Vendor 0x0483 / Product 0x5743)",
        configSnippet: `// GOOJPRT Thermal Barcode Command Stream
const escpos = require('escpos');
const device = new escpos.USB(0x0483, 0x5743);
printer.barcode(trackingCode, "CODE128", { width: 2, height: 60 })
       .feed(2)
       .cut();`,
        payloadSnippet: `{
  "printer_status": "READY_PAPER_OK",
  "print_job_id": "PRN_00482",
  "symbology": "CODE128_SUBSET_B",
  "encoded_data": "TX-ISKIOSK-88294",
  "feed_lines": 2,
  "cutter_tripped": true,
  "print_duration_ms": 382
}`,
      },
      {
        id: "mcu",
        label: "3. Arduino Uno R3 & Relays",
        sublabel: "Node.js Serial Bridge & 12V Solenoid",
        protocol: "UART Serial (115200 baud)",
        summary:
          "Node.js serial bridge dispatches actuation packets to the Arduino Uno R3. Optocoupled 2-channel relay energizes the 12V solenoid lock with watchdog cutoff protection.",
        latencyMs: 12,
        securityDomain: "PC817 Galvanic Opto-Isolation (5kV Barrier)",
        configSnippet: `// Arduino Uno R3 Relay Actuation Routine
if (Serial.available()) {
  String cmd = Serial.readStringUntil('\\n');
  if (cmd.startsWith("UNLOCK:D7")) {
    digitalWrite(RELAY_CH1_PIN, HIGH); // Energize 12V Solenoid
    delay(2500);
    digitalWrite(RELAY_CH1_PIN, LOW);  // Return to Fail-Secure
  }
}`,
        payloadSnippet: `{
  "uart_command": "UNLOCK:D7\\n",
  "baud_rate": 115200,
  "pin_target": "DIGITAL_PIN_7",
  "relay_closure_ms": 12,
  "solenoid_voltage": 12.0,
  "flyback_diode": "1N4007_CLAMP_ACTIVE",
  "watchdog_timeout_ms": 2500,
  "status": "COMPARTMENT_UNLOCKED"
}`,
      },
      {
        id: "sensors-cloud",
        label: "4. HC-SR04 & FastAPI Cloud",
        sublabel: "Ultrasonic Audit & Email Dispatch",
        protocol: "Pulse Timing & HTTPS (Render)",
        summary:
          "HC-SR04 ultrasonic sensors measure physical compartment fill depth to prevent overflow. Outbound security tokens and email receipts are dispatched asynchronously via Python FastAPI on Render.",
        latencyMs: 190,
        securityDomain: "TLS 1.3 / Render Cloud Worker",
        configSnippet: `# FastAPI Async Notification Dispatch (Hosted on Render)
@app.post("/api/v1/notify-transaction")
async def send_receipt(payload: TransactionReceipt, background_tasks: BackgroundTasks):
    background_tasks.add_task(dispatch_smtp_email, payload)
    return {"status": "ENQUEUED", "tracking_code": payload.tracking_code}`,
        payloadSnippet: `{
  "sensor_id": "HC-SR04-CH1",
  "echo_duration_us": 1070,
  "measured_distance_cm": 18.4,
  "compartment_capacity": "35%_OCCUPIED",
  "notification_dispatch": {
    "recipient": "student@pup.edu.ph",
    "smtp_server": "smtp.gmail.com:587",
    "delivery_status": "DELIVERED_QUEUED"
  }
}`,
      },
    ],
  },
  komunikonek: {
    topologyTitle: "Mobile-First Barangay Management & Real-Time Sync Pipeline",
    subtitle: "Click any architecture stage below to inspect its data flow and configuration",
    nodes: [
      {
        id: "client-ui",
        label: "1. Flutter Mobile Client",
        sublabel: "Resident Feedback & Admin Views",
        protocol: "Dart / Flutter Reactive UI",
        summary:
          "Cross-platform mobile client provides dedicated interfaces for resident feedback and high-level administrative dashboards for community statistics.",
        latencyMs: 16,
        securityDomain: "Client Android / iOS Sandboxed App",
        configSnippet: `// Flutter reactive state stream provider
final residentFeedbackStream = FirebaseFirestore.instance
    .collection('barangay_reports')
    .orderBy('timestamp', descending: true)
    .snapshots();`,
        payloadSnippet: `{
  "client_platform": "Flutter_3.24_Android",
  "report_type": "CIVIC_INFRASTRUCTURE_HAZARD",
  "purok": "Purok 4 - Lower Riverside",
  "incident_desc": "Damaged streetlight posing nocturnal risk.",
  "image_url": "https://res.cloudinary.com/.../streetlight_0891.jpg",
  "geo_point": { "lat": 14.5995, "lng": 120.9842 },
  "offline_cached": false
}`,
      },
      {
        id: "auth-guard",
        label: "2. Firebase Authentication",
        sublabel: "Role-Based Access Control",
        protocol: "OAuth / JWT Token Verification",
        summary:
          "Enforces secure role differentiation (resident vs barangay officer) with fine-grained custom claims and security rule verification.",
        latencyMs: 95,
        securityDomain: "Firebase Auth / RS256 JWT Verification",
        configSnippet: `// Firebase Auth token claims inspection
final user = FirebaseAuth.instance.currentUser;
final idTokenResult = await user?.getIdTokenResult();
final isOfficer = idTokenResult?.claims?['role'] == 'administrator';`,
        payloadSnippet: `{
  "iss": "https://securetoken.google.com/komunikonek-app",
  "aud": "komunikonek-app",
  "auth_time": 1731301200,
  "sub": "usr_citizen_99148",
  "custom_claims": {
    "role": "resident",
    "barangay_id": "BRGY-72-MANILA",
    "verified_voter": true
  }
}`,
      },
      {
        id: "firestore-db",
        label: "3. Cloud Firestore",
        sublabel: "Real-Time Document Database",
        protocol: "gRPC Streaming / HTTPS",
        summary:
          "Maintains low-latency synchronized collections for resident feedback, status tracking, and statistical aggregations across mobile clients.",
        latencyMs: 140,
        securityDomain: "Cloud Firestore Security Rules",
        configSnippet: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /barangay_reports/{reportId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth.token.role == 'administrator';
    }
  }
}`,
        payloadSnippet: `{
  "document_path": "barangay_reports/rpt_4819_lower_riverside",
  "create_time": "2026-11-11T05:24:00Z",
  "fields": {
    "status": { "stringValue": "PENDING_OFFICER_REVIEW" },
    "assigned_purok": { "stringValue": "Purok 4" },
    "priority_score": { "integerValue": "3" },
    "upvotes": { "integerValue": "42" }
  },
  "replication_nodes": 3
}`,
      },
      {
        id: "analytics",
        label: "4. Real-Time Admin Dashboard",
        sublabel: "Demographics & Statistical Stream",
        protocol: "Reactive Query Aggregations",
        summary:
          "Aggregates community feedback trends, resolved ticket volumes, and emergency alerts into responsive administrative visualization charts.",
        latencyMs: 75,
        securityDomain: "Role-Gated Administrative Console",
        configSnippet: `// Real-time metric tally aggregation
int pendingReports = snapshot.docs.where((d) => d['status'] == 'pending').length;
int resolvedReports = snapshot.docs.where((d) => d['status'] == 'resolved').length;`,
        payloadSnippet: `{
  "admin_telemetry_batch": {
    "total_reports_month": 482,
    "resolved_tickets": 421,
    "active_solar_ballot_votes": 1821,
    "average_resolution_hours": 14.2,
    "live_active_citizens": 89
  }
}`,
      },
    ],
  },
  "tailscale-db-cluster": {
    topologyTitle: "Zero-Trust WireGuard Mesh & Circular GTID Replication",
    subtitle: "Click any cluster node or mesh layer to inspect its replication config",
    nodes: [
      {
        id: "node-alpha",
        label: "1. MySQL Master Node A",
        sublabel: "Primary Site (100.64.0.1)",
        protocol: "MySQL 8.0 / Odd Key Partition",
        summary:
          "Active read/write master bound strictly to its Tailscale interface IP. Configured with odd auto-increment offsets to guarantee zero primary-key collisions.",
        latencyMs: 15,
        securityDomain: "Linux Host / Tailscale Interface Only",
        configSnippet: `# /etc/mysql/mysql.conf.d/mysqld.cnf (Node A)
server-id                  = 1
bind-address               = 100.64.0.1
gtid_mode                  = ON
enforce_gtid_consistency   = ON
auto_increment_increment   = 2
auto_increment_offset      = 1`,
        payloadSnippet: `{
  "server_id": 1,
  "node_host": "mnl-dc01.tailscale.net",
  "tailscale_ip": "100.64.0.1",
  "gtid_executed": "3a9f-44a1-bc01:1-1420",
  "auto_inc_offset": 1,
  "auto_inc_increment": 2,
  "master_status": "READ_WRITE_ACTIVE"
}`,
      },
      {
        id: "tailscale-mesh",
        label: "2. Tailscale WireGuard Mesh",
        sublabel: "Encrypted Peer-to-Peer Overlay",
        protocol: "WireGuard UDP / Tailnet ACLs",
        summary:
          "Establishes point-to-point encrypted tunnels across NAT boundaries without exposing port 3306 to the public internet. Enforced by strict Tailnet ACL policies.",
        latencyMs: 18,
        securityDomain: "ChaCha20-Poly1305 WireGuard Overlay",
        configSnippet: `// Tailnet ACL Policy Excerpt
"acls": [
  {
    "action": "accept",
    "src": ["tag:db-cluster"],
    "dst": ["tag:db-cluster:3306"]
  }
]`,
        payloadSnippet: `{
  "tunnel_protocol": "WireGuard / Noise Protocol",
  "encryption": "ChaCha20-Poly1305",
  "endpoint_ping_ms": 18.2,
  "public_open_ports": 0,
  "nat_traversal": "DIRECT_DERP_BYPASS",
  "acl_enforcement": "STRICT_TAG_MATCH"
}`,
      },
      {
        id: "node-beta",
        label: "3. MySQL Master Node B",
        sublabel: "Remote Site (100.64.0.2)",
        protocol: "MySQL 8.0 / Even Key Partition",
        summary:
          "Peer active read/write master at the secondary site. Generates even primary keys and replicates binlog GTID transactions bidirectionally with Node A.",
        latencyMs: 15,
        securityDomain: "Linux Host / Tailscale Interface Only",
        configSnippet: `# /etc/mysql/mysql.conf.d/mysqld.cnf (Node B)
server-id                  = 2
bind-address               = 100.64.0.2
gtid_mode                  = ON
enforce_gtid_consistency   = ON
auto_increment_increment   = 2
auto_increment_offset      = 2`,
        payloadSnippet: `{
  "server_id": 2,
  "node_host": "sgp-dc02.tailscale.net",
  "tailscale_ip": "100.64.0.2",
  "gtid_executed": "3a9f-44a1-bc01:1-1420",
  "auto_inc_offset": 2,
  "auto_inc_increment": 2,
  "replica_status": {
    "io_thread": "RUNNING",
    "sql_thread": "RUNNING",
    "seconds_behind_master": 0
  }
}`,
      },
      {
        id: "watchdog",
        label: "4. Systemd Health Watchdog",
        sublabel: "Lag & Tunnel Telemetry",
        protocol: "Bash / Systemd Timer",
        summary:
          "Continuously verifies Tailscale peer reachability (tailscale ping) and MySQL Seconds_Behind_Master, triggering automated alerts if replication drifts.",
        latencyMs: 25,
        securityDomain: "Local Root Daemon / Alert Webhook",
        configSnippet: `#!/usr/bin/env bash
tailscale status --json | jq -e '.Peer[] | select(.HostName=="node-alpha") | .Online'
mysql -e "SHOW REPLICA STATUS\\G" | grep -E "Replica_IO_Running|Replica_SQL_Running"`,
        payloadSnippet: `{
  "watchdog_check": "PASS_HEALTHY",
  "tailscale_peer_online": true,
  "replication_drift_seconds": 0,
  "split_brain_risk": "0.0%_DETERMINISTIC",
  "uptime_days": 182.4
}`,
      },
    ],
  },
};

export default function ArchitectureDiagram({ slug }: { slug: string }) {
  const normalizedSlug =
    slug === "vonotec-defect-logger"
      ? "gemini-defect-logger"
      : slug === "komunikonek-mobile-dashboard"
      ? "komunikonek"
      : slug;

  const diagram = DIAGRAMS[normalizedSlug] ?? DIAGRAMS["gemini-defect-logger"];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"code" | "payload" | "telemetry">("code");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % diagram.nodes.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isSimulating, diagram.nodes.length]);

  const activeNode = diagram.nodes[activeIndex];

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPipelineLatency = diagram.nodes.reduce((acc, curr) => acc + curr.latencyMs, 0);

  return (
    <div className="w-full bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-12 shadow-none font-sans">
      {/* Header Deck */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/5">
        <div>
          <span className="text-[#0052FF] dark:text-[#38bdf8] font-mono text-xs uppercase tracking-widest block mb-1 font-semibold">
            Interactive Signal Flow &amp; Architecture
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-primary">
            {diagram.topologyTitle}
          </h3>
          <p className="text-xs text-muted font-mono mt-1">
            Total End-to-End Pipeline SLA:{" "}
            <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold">
              ~{totalPipelineLatency}ms
            </span>{" "}
            • 4 Orchestrated Stages
          </p>
        </div>

        {/* Simulation Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 border shadow-none ${
              isSimulating
                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-[0_0_15px_rgba(0,82,255,0.3)]"
                : "bg-[#0052FF]/10 text-primary hover:bg-[#0052FF]/20 border-[#0052FF]/30"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isSimulating ? "bg-white animate-ping" : "bg-[#0052FF]"
              }`}
            />
            <span>{isSimulating ? "Pause Signal Stream" : "▶ Simulate End-to-End Flow"}</span>
          </button>
        </div>
      </div>

      {/* Animated Pipeline Interconnect Bus (Desktop) */}
      <div className="hidden md:block relative mb-3 px-6">
        <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full relative overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0052FF] via-[#38bdf8] to-[#0052FF] rounded-full shadow-[0_0_10px_rgba(0,82,255,0.5)]"
            animate={{
              width: `${((activeIndex + 1) / diagram.nodes.length) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          />
        </div>
        {/* Packet Marker on the line */}
        <div className="flex justify-between items-center text-[10px] font-mono text-muted mt-1.5 px-1">
          <span>01 Ingestion</span>
          <span>02 Processing</span>
          <span>03 Verification</span>
          <span>04 Storage Commit</span>
        </div>
      </div>

      {/* 4 Interactive Stage Cards */}
      <div className="relative mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {diagram.nodes.map((node, index) => {
            const isSelected = index === activeIndex;
            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => {
                  setIsSimulating(false);
                  setActiveIndex(index);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`text-left p-4 rounded-xl border transition-all duration-200 relative flex flex-col justify-between cursor-pointer shadow-none ${
                  isSelected
                    ? "bg-surface border-[#0052FF] ring-2 ring-[#0052FF]/20 shadow-[0_0_15px_rgba(0,82,255,0.15)]"
                    : "bg-base/40 border-black/10 dark:border-white/5 hover:border-[#0052FF]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold uppercase ${
                        isSelected
                          ? "text-[#0052FF] dark:text-[#38bdf8]"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      Stage 0{index + 1}
                    </span>
                    <span className="flex h-2.5 w-2.5 relative">
                      {isSelected ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] dark:bg-[#38bdf8] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0052FF] dark:bg-[#38bdf8]" />
                        </>
                      ) : (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/20" />
                      )}
                    </span>
                  </div>
                  <p className="text-primary font-bold text-sm mb-1 font-sans">
                    {node.label}
                  </p>
                  <p className="text-slate-700 dark:text-slate-200 text-xs leading-snug font-sans">
                    {node.sublabel}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#0052FF] dark:text-[#38bdf8] font-semibold">
                    ~{node.latencyMs}ms
                  </span>
                  <span
                    className={`text-xs font-mono font-bold transition-transform ${
                      isSelected
                        ? "text-[#0052FF] dark:text-[#38bdf8] translate-x-1"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Live Active Protocol Bar */}
        <div className="hidden md:flex items-center justify-between px-6 mt-4 pt-3 border-t border-[#0052FF]/30 text-[11px] font-mono text-muted">
          <div className="flex items-center gap-2">
            <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold">Active Signal Protocol:</span>
            <span className="text-primary font-semibold">{activeNode.protocol}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
            <span className="text-primary">Security: {activeNode.securityDomain}</span>
          </div>
        </div>
      </div>

      {/* Selected Node Deep-Dive Inspection Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="bg-base/90 rounded-2xl border border-black/10 dark:border-white/5 p-6 shadow-none"
        >
          {/* Node Header & Interactive Inspector Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-black/5 dark:border-white/5">
            <div>
              <h4 className="text-lg font-bold text-primary font-sans">
                {activeNode.label}{" "}
                <span className="text-muted font-normal text-sm font-sans">
                  — {activeNode.sublabel}
                </span>
              </h4>
              <p className="text-xs text-muted font-mono mt-0.5">
                Protocol: <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold">{activeNode.protocol}</span>
              </p>
            </div>

            {/* Inspector Mode Tabs */}
            <div className="flex items-center gap-1 bg-black/10 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/10 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "code"
                    ? "bg-[#0052FF] text-white font-semibold"
                    : "text-muted hover:text-primary dark:hover:text-frost"
                }`}
              >
                Implementation Code
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("payload")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "payload"
                    ? "bg-[#0052FF] text-white font-semibold"
                    : "text-muted hover:text-primary dark:hover:text-frost"
                }`}
              >
                Live Payload (JSON)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("telemetry")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "telemetry"
                    ? "bg-[#0052FF] text-white font-semibold"
                    : "text-muted hover:text-primary dark:hover:text-frost"
                }`}
              >
                Telemetry &amp; SLA
              </button>
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-5 font-sans">
            {activeNode.summary}
          </p>

          {/* Tab 1: Code Implementation */}
          {activeTab === "code" && (
            <div className="bg-surface/80 rounded-xl border border-black/10 dark:border-white/10 p-4 overflow-x-auto">
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-2 pb-2 border-b border-black/5 dark:border-white/5">
                <span className="text-[#0052FF] dark:text-[#38bdf8] font-semibold">
                  {"// Production Logic Contract"}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(activeNode.configSnippet)}
                  className="text-xs text-muted hover:text-primary font-mono transition-colors cursor-pointer"
                >
                  {copied ? "Copied ✓" : "Copy Snippet"}
                </button>
              </div>
              <pre className="font-mono text-xs leading-relaxed text-primary">
                <code>{activeNode.configSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tab 2: Live Payload Inspector */}
          {activeTab === "payload" && (
            <div className="bg-[#0b1120] text-slate-200 rounded-xl border border-white/10 p-4 overflow-x-auto">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 pb-2 border-b border-white/10">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  SCHEMA VALIDATED DATA PAYLOAD
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(activeNode.payloadSnippet)}
                  className="text-xs text-slate-400 hover:text-white font-mono transition-colors cursor-pointer"
                >
                  {copied ? "Copied ✓" : "Copy JSON"}
                </button>
              </div>
              <pre className="font-mono text-xs leading-relaxed text-emerald-300">
                <code>{activeNode.payloadSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tab 3: Telemetry & SLA Waterfall */}
          {activeTab === "telemetry" && (
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 font-mono space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted">Stage Latency Contribution:</span>
                  <span className="text-[#0052FF] dark:text-[#38bdf8] font-bold tabular-nums">
                    {activeNode.latencyMs}ms (
                    {Math.round((activeNode.latencyMs / totalPipelineLatency) * 100)}% of pipeline)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0052FF] to-[#38bdf8] rounded-full"
                    style={{
                      width: `${(activeNode.latencyMs / totalPipelineLatency) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-black/5 dark:border-white/5">
                <div className="p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <span className="text-muted text-[10px] uppercase block">Security Zone</span>
                  <span className="text-primary font-semibold text-xs">{activeNode.securityDomain}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <span className="text-muted text-[10px] uppercase block">Protocol Verification</span>
                  <span className="text-emerald-500 font-semibold text-xs">Deterministic Validated</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                  <span className="text-muted text-[10px] uppercase block">Fault Handling</span>
                  <span className="text-primary font-semibold text-xs">Exponential Backoff Retry</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
