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
}

const DIAGRAMS: Record<
  string,
  {
    topologyTitle: string;
    subtitle: string;
    nodes: DiagramNode[];
  }
> = {
  "gemini-defect-logger": {
    topologyTitle: "Multimodal AI → Enterprise SharePoint Pipeline",
    subtitle: "Click any pipeline stage below to inspect its telemetry and configuration",
    nodes: [
      {
        id: "capture",
        label: "1. Streamlit Field UI",
        sublabel: "Image & Metadata Capture",
        protocol: "HTTPS / Multipart Upload",
        summary:
          "Field engineers capture or upload inspection photographs directly from mobile or tablet browsers. Images are normalized and buffered in memory prior to inference.",
        configSnippet: `# Streamlit image intake & preprocessing
uploaded_file = st.file_uploader("Upload Inspection Photo", type=["jpg", "png"])
if uploaded_file:
    image_bytes = preprocess_inspection_frame(uploaded_file.read())`,
      },
      {
        id: "gemini",
        label: "2. Google Gemini API",
        sublabel: "Multimodal Schema Extraction",
        protocol: "gRPC / REST (JSON Schema)",
        summary:
          "Invokes Gemini multimodal inference with a strict response schema to deterministically extract defect classification, dimensions (mm), and severity.",
        configSnippet: `response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[image_part, EXTRACTION_PROMPT],
    config={"response_mime_type": "application/json", "response_schema": DefectSchema}
)`,
      },
      {
        id: "auth",
        label: "3. Microsoft Entra ID",
        sublabel: "OAuth 2.0 Client Credentials",
        protocol: "MSAL / Bearer Token",
        summary:
          "Authenticates service-to-service requests against the enterprise tenant using scoped application permissions before touching SharePoint storage.",
        configSnippet: `app = msal.ConfidentialClientApplication(
    CLIENT_ID, authority=f"https://login.microsoftonline.com/{TENANT_ID}",
    client_credential=CLIENT_SECRET
)
token = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])`,
      },
      {
        id: "sharepoint",
        label: "4. SharePoint Online",
        sublabel: "Automated Workbook Logging",
        protocol: "Microsoft Graph REST API",
        summary:
          "Appends validated defect rows directly into the target SharePoint Excel workbook table, preserving enterprise audit trails and eliminating manual entry.",
        configSnippet: `POST https://graph.microsoft.com/v1.0/sites/{site-id}/drive/items/{item-id}/workbook/tables/DefectLog/rows/add
{
  "values": [[timestamp, defect_type, width_mm, height_mm, severity, inspector_id]]
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
        configSnippet: `// Laravel Document Transaction Engine (Localhost Laragon)
$tx = DocumentTransaction::create([
    'tracking_code' => Str::upper(Str::random(10)),
    'compartment_id' => $assignedDrawer,
    'status' => 'PENDING_PHYSICAL_DISPATCH',
]);
$hardwareDaemon->dispatchPrintAndActuate($tx);`,
      },
      {
        id: "printer",
        label: "2. GOOJPRT Thermal Printer",
        sublabel: "Code-128 Barcode & 2D Scanner",
        protocol: "ESC/POS over USB-HID",
        summary:
          "Generates on-demand Code-128 barcode stickers containing human-readable tracking identifiers before drawer release. USB-HID scanner verifies returned tokens.",
        configSnippet: `// GOOJPRT Thermal Barcode Command Stream
const escpos = require('escpos');
const device = new escpos.USB(0x0483, 0x5743);
printer.barcode(trackingCode, "CODE128", { width: 2, height: 60 })
       .feed(2)
       .cut();`,
      },
      {
        id: "mcu",
        label: "3. Arduino Uno R3 & Relays",
        sublabel: "Node.js Serial Bridge & 12V Solenoid",
        protocol: "UART Serial (115200 baud)",
        summary:
          "Node.js serial bridge dispatches actuation packets to the Arduino Uno R3. Optocoupled 2-channel relay energizes the 12V solenoid lock with watchdog cutoff protection.",
        configSnippet: `// Arduino Uno R3 Relay Actuation Routine
if (Serial.available()) {
  String cmd = Serial.readStringUntil('\\n');
  if (cmd.startsWith("UNLOCK:D7")) {
    digitalWrite(RELAY_CH1_PIN, HIGH); // Energize 12V Solenoid
    delay(2500);
    digitalWrite(RELAY_CH1_PIN, LOW);  // Return to Fail-Secure
  }
}`,
      },
      {
        id: "sensors-cloud",
        label: "4. HC-SR04 & FastAPI Cloud",
        sublabel: "Ultrasonic Audit & Email Dispatch",
        protocol: "Pulse Timing & HTTPS (Render)",
        summary:
          "HC-SR04 ultrasonic sensors measure physical compartment fill depth to prevent overflow. Outbound security tokens and email receipts are dispatched asynchronously via Python FastAPI on Render.",
        configSnippet: `# FastAPI Async Notification Dispatch (Hosted on Render)
@app.post("/api/v1/notify-transaction")
async def send_receipt(payload: TransactionReceipt, background_tasks: BackgroundTasks):
    background_tasks.add_task(dispatch_smtp_email, payload)
    return {"status": "ENQUEUED", "tracking_code": payload.tracking_code}`,
      },
    ],
  },
  "komunikonek": {
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
        configSnippet: `// Flutter reactive state stream provider
final residentFeedbackStream = FirebaseFirestore.instance
    .collection('barangay_reports')
    .orderBy('timestamp', descending: true)
    .snapshots();`,
      },
      {
        id: "auth-guard",
        label: "2. Firebase Authentication",
        sublabel: "Role-Based Access Control",
        protocol: "OAuth / JWT Token Verification",
        summary:
          "Enforces secure role differentiation (resident vs barangay officer) with fine-grained custom claims and security rule verification.",
        configSnippet: `// Firebase Auth token claims inspection
final user = FirebaseAuth.instance.currentUser;
final idTokenResult = await user?.getIdTokenResult();
final isOfficer = idTokenResult?.claims?['role'] == 'administrator';`,
      },
      {
        id: "firestore-db",
        label: "3. Cloud Firestore",
        sublabel: "Real-Time Document Database",
        protocol: "gRPC Streaming / HTTPS",
        summary:
          "Maintains low-latency synchronized collections for resident feedback, status tracking, and statistical aggregations across mobile clients.",
        configSnippet: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /barangay_reports/{reportId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth.token.role == 'administrator';
    }
  }
}`,
      },
      {
        id: "analytics",
        label: "4. Real-Time Admin Dashboard",
        sublabel: "Demographics & Statistical Stream",
        protocol: "Reactive Query Aggregations",
        summary:
          "Aggregates community feedback trends, resolved ticket volumes, and emergency alerts into responsive administrative visualization charts.",
        configSnippet: `// Real-time metric tally aggregation
int pendingReports = snapshot.docs.where((d) => d['status'] == 'pending').length;
int resolvedReports = snapshot.docs.where((d) => d['status'] == 'resolved').length;`,
      },
    ],
  },
  "komunikonek-mobile-dashboard": {
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
        configSnippet: `// Flutter reactive state stream provider
final residentFeedbackStream = FirebaseFirestore.instance
    .collection('barangay_reports')
    .orderBy('timestamp', descending: true)
    .snapshots();`,
      },
      {
        id: "auth-guard",
        label: "2. Firebase Authentication",
        sublabel: "Role-Based Access Control",
        protocol: "OAuth / JWT Token Verification",
        summary:
          "Enforces secure role differentiation (resident vs barangay officer) with fine-grained custom claims and security rule verification.",
        configSnippet: `// Firebase Auth token claims inspection
final user = FirebaseAuth.instance.currentUser;
final idTokenResult = await user?.getIdTokenResult();
final isOfficer = idTokenResult?.claims?['role'] == 'administrator';`,
      },
      {
        id: "firestore-db",
        label: "3. Cloud Firestore",
        sublabel: "Real-Time Document Database",
        protocol: "gRPC Streaming / HTTPS",
        summary:
          "Maintains low-latency synchronized collections for resident feedback, status tracking, and statistical aggregations across mobile clients.",
        configSnippet: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /barangay_reports/{reportId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth.token.role == 'administrator';
    }
  }
}`,
      },
      {
        id: "analytics",
        label: "4. Real-Time Admin Dashboard",
        sublabel: "Demographics & Statistical Stream",
        protocol: "Reactive Query Aggregations",
        summary:
          "Aggregates community feedback trends, resolved ticket volumes, and emergency alerts into responsive administrative visualization charts.",
        configSnippet: `// Real-time metric tally aggregation
int pendingReports = snapshot.docs.where((d) => d['status'] == 'pending').length;
int resolvedReports = snapshot.docs.where((d) => d['status'] == 'resolved').length;`,
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
        configSnippet: `# /etc/mysql/mysql.conf.d/mysqld.cnf (Node A)
server-id                  = 1
bind-address               = 100.64.0.1
gtid_mode                  = ON
enforce_gtid_consistency   = ON
auto_increment_increment   = 2
auto_increment_offset      = 1`,
      },
      {
        id: "tailscale-mesh",
        label: "2. Tailscale WireGuard Mesh",
        sublabel: "Encrypted Peer-to-Peer Overlay",
        protocol: "WireGuard UDP / Tailnet ACLs",
        summary:
          "Establishes point-to-point encrypted tunnels across NAT boundaries without exposing port 3306 to the public internet. Enforced by strict Tailnet ACL policies.",
        configSnippet: `// Tailnet ACL Policy Excerpt
"acls": [
  {
    "action": "accept",
    "src": ["tag:db-cluster"],
    "dst": ["tag:db-cluster:3306"]
  }
]`,
      },
      {
        id: "node-beta",
        label: "3. MySQL Master Node B",
        sublabel: "Remote Site (100.64.0.2)",
        protocol: "MySQL 8.0 / Even Key Partition",
        summary:
          "Peer active read/write master at the secondary site. Generates even primary keys and replicates binlog GTID transactions bidirectionally with Node A.",
        configSnippet: `# /etc/mysql/mysql.conf.d/mysqld.cnf (Node B)
server-id                  = 2
bind-address               = 100.64.0.2
gtid_mode                  = ON
enforce_gtid_consistency   = ON
auto_increment_increment   = 2
auto_increment_offset      = 2`,
      },
      {
        id: "watchdog",
        label: "4. Systemd Health Watchdog",
        sublabel: "Lag & Tunnel Telemetry",
        protocol: "Bash / Systemd Timer",
        summary:
          "Continuously verifies Tailscale peer reachability (\`tailscale ping\`) and MySQL \`Seconds_Behind_Master\`, triggering automated alerts if replication drifts.",
        configSnippet: `#!/usr/bin/env bash
tailscale status --json | jq -e '.Peer[] | select(.HostName=="node-alpha") | .Online'
mysql -e "SHOW REPLICA STATUS\\G" | grep -E "Replica_IO_Running|Replica_SQL_Running"`,
      },
    ],
  },
};

export default function ArchitectureDiagram({ slug }: { slug: string }) {
  const normalizedSlug = slug === "vonotec-defect-logger" ? "gemini-defect-logger" : slug;
  const diagram = DIAGRAMS[normalizedSlug] ?? DIAGRAMS["tailscale-db-cluster"];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % diagram.nodes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isSimulating, diagram.nodes.length]);

  const activeNode = diagram.nodes[activeIndex];

  return (
    <div className="w-full bg-[#1e2128]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 mb-12 shadow-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/5">
        <div>
          <span className="text-[#0052FF] font-mono text-xs uppercase tracking-widest block mb-1 font-semibold">
            Interactive Signal Flow &amp; Architecture
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-[#f8fafc]">
            {diagram.topologyTitle}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border border-[#0052FF] shadow-none ${
              isSimulating
                ? "bg-[#0052FF] text-[#f8fafc]"
                : "bg-[#0052FF]/10 text-[#f8fafc] hover:bg-[#0052FF]/20"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isSimulating ? "bg-[#f8fafc] animate-ping" : "bg-[#0052FF]"
              }`}
            />
            <span>{isSimulating ? "Pause Signal" : "▶ Simulate Flow"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Node Pipeline with 1px Blueprint Lines */}
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
                className={`text-left p-4 rounded-xl border transition-all duration-300 relative flex flex-col justify-between cursor-pointer shadow-none ${
                  isSelected
                    ? "bg-[#1e2128] border-[#0052FF]"
                    : "bg-[#0f1115]/60 border-white/5 hover:border-[#0052FF]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold uppercase ${
                        isSelected ? "text-[#0052FF]" : "text-[#94a3b8]"
                      }`}
                    >
                      Stage 0{index + 1}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      {isSelected ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]"></span>
                        </>
                      ) : (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white/20"></span>
                      )}
                    </span>
                  </div>
                  <p className="text-[#f8fafc] font-bold text-sm mb-1">
                    {node.label}
                  </p>
                  <p className="text-[#94a3b8] text-xs leading-snug">
                    {node.sublabel}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#94a3b8] truncate max-w-[120px]">
                    {node.protocol}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold transition-transform ${
                      isSelected ? "text-[#0052FF] translate-x-1" : "text-[#94a3b8]"
                    }`}
                  >
                    →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Blueprint Connection Signal Visualizer */}
        <div className="hidden md:flex items-center justify-between px-8 mt-4 pt-3 border-t border-[#0052FF]/30 text-[11px] font-mono text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="text-[#0052FF] font-bold">Active Signal:</span>
            <span className="text-[#f8fafc] font-semibold">{activeNode.protocol}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
            <span className="text-[#f8fafc]">Deterministic State Machine Validated</span>
          </div>
        </div>
      </div>

      {/* Selected Node Inspection Panel (Blueprint-Style Flat Panel, Zero Drop Shadows) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0f1115]/90 rounded-2xl border border-white/5 p-6 shadow-none"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg font-bold text-[#f8fafc]">
                {activeNode.label}{" "}
                <span className="text-[#94a3b8] font-normal text-sm">
                  — {activeNode.sublabel}
                </span>
              </h4>
            </div>
            <span className="text-xs font-mono text-[#0052FF] bg-[#0052FF]/10 px-3 py-1 rounded-full border border-[#0052FF]/30 self-start md:self-auto font-semibold">
              Protocol: {activeNode.protocol}
            </span>
          </div>

          <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
            {activeNode.summary}
          </p>

          <div className="bg-[#0f1115] text-[#f8fafc] rounded-lg border border-white/10 p-4 overflow-x-auto shadow-none">
            <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8] mb-2 pb-2 border-b border-white/5">
              <span className="text-[#0052FF] font-semibold">// Implementation / Config Excerpt</span>
              <span className="text-[#94a3b8] font-mono">readonly</span>
            </div>
            <pre className="font-mono text-xs leading-relaxed text-[#f8fafc]">
              <code>{activeNode.configSnippet}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
