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
    topologyTitle: "Hardware-Software Co-Design & Solenoid Interlock Loop",
    subtitle: "Click any hardware or software module to inspect its signal interface",
    nodes: [
      {
        id: "kiosk-ui",
        label: "1. Kiosk Terminal UI",
        sublabel: "Document Validation & Queue",
        protocol: "Local Process / IPC",
        summary:
          "Touchscreen interface validates user credentials, assigns a physical compartment ID, and initiates barcode generation under ISO/IEC 25010 usability controls.",
        configSnippet: `// Transaction state machine
TxPayload tx = createDocumentTransaction(userId, docType);
printer.printBarcodeSticker(tx.trackingCode);
serialBus.sendUnlockCommand(tx.compartmentId, tx.checksum);`,
      },
      {
        id: "printer",
        label: "2. Thermal Barcode Unit",
        sublabel: "On-Demand Label Printing",
        protocol: "ESC/POS over Serial/USB",
        summary:
          "Generates scannable Code-128 barcode labels with human-readable tracking metadata prior to unlocking the physical submission drawer.",
        configSnippet: `// ESC/POS command sequence for Code-128 barcode
uint8_t cmd[] = { 0x1D, 0x68, 0x50, 0x1D, 0x77, 0x02, 0x1D, 0x6B, 0x49 };
serialWrite(PRINTER_PORT, cmd, sizeof(cmd));`,
      },
      {
        id: "mcu",
        label: "3. Microcontroller (MCU)",
        sublabel: "Serial Command & Watchdog",
        protocol: "UART (115200 baud, 8N1)",
        summary:
          "Parses checksum-verified packets from the kiosk host, drives opto-isolated relay channels, and enforces a hardware watchdog timer against stuck-open faults.",
        configSnippet: `if (verifyPacketChecksum(rxBuffer)) {
  digitalWrite(RELAY_PIN[drawerId], HIGH); // Energize 12V solenoid
  unlockTimestamp = millis();
  state = AWAITING_DRAWER_CLOSURE;
}`,
      },
      {
        id: "solenoid",
        label: "4. 12V Solenoid & Sensors",
        sublabel: "Physical Drawer Interlock",
        protocol: "12V DC Relay + Reed Switch GPIO",
        summary:
          "Fail-secure 12V solenoid latch releases the assigned drawer while magnetic reed switches report physical closure back to the MCU to commit the transaction.",
        configSnippet: `// Hardware feedback verification loop
if (digitalRead(REED_SWITCH_PIN[drawerId]) == LOW && elapsed > MIN_OPEN_MS) {
  digitalWrite(RELAY_PIN[drawerId], LOW); // Re-engage mechanical lock
  Serial.println("ACK:LOCKED:" + String(drawerId));
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
  const diagram = DIAGRAMS[slug] ?? DIAGRAMS["tailscale-db-cluster"];
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
    <div className="w-full bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl p-6 md:p-8 mb-12 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/10">
        <div>
          <span className="text-orange font-mono text-xs uppercase tracking-widest block mb-1">
            Interactive Signal Flow &amp; Architecture
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {diagram.topologyTitle}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              isSimulating
                ? "bg-orange text-black border-black shadow-[2px_2px_0px_0px_#000000]"
                : "bg-white/80 dark:bg-black/40 text-slate-700 dark:text-slate-300 border-black/10 dark:border-white/10 hover:border-orange"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isSimulating ? "bg-black animate-ping" : "bg-orange"
              }`}
            />
            <span>{isSimulating ? "Pause Signal" : "▶ Simulate Flow"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Node Pipeline with Animated Signal Flow */}
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
                className={`text-left p-4 rounded-xl border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-[#1e2128] border-orange shadow-[4px_4px_0px_0px_#FF7A00]"
                    : "bg-white/70 dark:bg-black/30 border-black/10 dark:border-white/10 hover:border-blue"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold uppercase ${
                        isSelected ? "text-orange" : "text-blue"
                      }`}
                    >
                      Stage 0{index + 1}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      {isSelected ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
                        </>
                      ) : (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue/40"></span>
                      )}
                    </span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm mb-1">
                    {node.label}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-snug">
                    {node.sublabel}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                    {node.protocol}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold transition-transform ${
                      isSelected ? "text-orange translate-x-1" : "text-blue"
                    }`}
                  >
                    →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Animated Glowing Packet Flow Visualizer */}
        <div className="hidden md:flex items-center justify-between px-8 mt-4 pt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-orange font-bold">Active Signal:</span>
            <span className="text-blue font-semibold">{activeNode.protocol}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Deterministic State Machine Validated</span>
          </div>
        </div>
      </div>

      {/* Selected Node Inspection Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 dark:bg-black/40 rounded-xl border border-black/10 dark:border-white/10 p-6 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeNode.label}{" "}
                <span className="text-slate-600 dark:text-slate-400 font-normal text-sm">
                  — {activeNode.sublabel}
                </span>
              </h4>
            </div>
            <span className="text-xs font-mono text-orange bg-orange/10 px-3 py-1 rounded border border-orange/30 self-start md:self-auto font-semibold">
              Protocol: {activeNode.protocol}
            </span>
          </div>

          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5">
            {activeNode.summary}
          </p>

          <div className="bg-slate-950 text-slate-100 rounded-lg border border-black/20 dark:border-white/10 p-4 overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 pb-2 border-b border-white/10">
              <span className="text-emerald-400 font-semibold">// Implementation / Config Excerpt</span>
              <span className="text-blue font-mono">readonly</span>
            </div>
            <pre className="font-mono text-xs leading-relaxed text-slate-200">
              <code>{activeNode.configSnippet}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
