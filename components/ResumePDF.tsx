import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: "#1e293b",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#0052FF",
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0052FF",
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#FF7A00",
    marginBottom: 6,
  },
  contactRow: {
    fontSize: 9,
    color: "#475569",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#0052FF",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 3,
  },
  itemBlock: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  itemSubheading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#FF7A00",
    marginBottom: 3,
  },
  bodyText: {
    fontSize: 10,
    color: "#334155",
  },
  skillGroup: {
    marginBottom: 4,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    color: "#FF7A00",
  },
});

export default function ResumePDF() {
  return (
    <Document title="Jose Lorenzo Discutido - Resume">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>Jose Lorenzo Discutido</Text>
          <Text style={styles.roleTitle}>
            Digital Data &amp; Systems Engineer | AI/IoT Data Officer
          </Text>
          <Text style={styles.contactRow}>
            Email: lorenzdiscutido@gmail.com | GitHub: github.com/lorenzdiscutido | LinkedIn: linkedin.com/in/discutido-lorenzo
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Experience</Text>
          <View style={styles.itemBlock}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>Vonotec</Text>
            </View>
            <Text style={styles.itemSubheading}>
              Digital Data &amp; Systems Engineer / AI &amp; IoT Data Officer
            </Text>
            <Text style={styles.bodyText}>
              • Architected and deployed enterprise identity, device management, and collaboration workflows across Microsoft Entra ID, Microsoft Intune, SharePoint Online, and Odoo ERP.
            </Text>
            <Text style={styles.bodyText}>
              • Developed automated field defect logging pipelines integrating Python, Streamlit, and the Google Gemini API with SharePoint Online workbooks.
            </Text>
            <Text style={styles.bodyText}>
              • Engineered multi-node master-master MySQL database replication clusters secured over zero-trust Tailscale mesh networks.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Education</Text>
          <View style={styles.itemBlock}>
            <Text style={styles.itemTitle}>
              Polytechnic University of the Philippines (PUP)
            </Text>
            <Text style={styles.itemSubheading}>
              Bachelor of Science in Computer Engineering
            </Text>
            <Text style={styles.bodyText}>
              Focused on embedded systems, hardware-software co-design, computer networking, and enterprise systems engineering.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Key Projects</Text>
          <View style={styles.itemBlock}>
            <Text style={styles.itemTitle}>Gemini Defect Logger</Text>
            <Text style={styles.itemSubheading}>
              Lead Developer — Python, Streamlit, Gemini API, SharePoint
            </Text>
            <Text style={styles.bodyText}>
              Automated multimodal inspection photo analysis to extract defect dimensions and log structured telemetry directly into enterprise SharePoint Excel sheets.
            </Text>
          </View>
          <View style={styles.itemBlock}>
            <Text style={styles.itemTitle}>IsKiosk Terminal</Text>
            <Text style={styles.itemSubheading}>
              Systems Engineer / Hardware Integrator — C/C++, Microcontrollers, Solenoid Locks
            </Text>
            <Text style={styles.bodyText}>
              Built an ISO/IEC 25010 validated automated document terminal featuring thermal barcode sticker printing and microcontroller-actuated solenoid drawer locks.
            </Text>
          </View>
          <View style={styles.itemBlock}>
            <Text style={styles.itemTitle}>Tailscale DB Cluster</Text>
            <Text style={styles.itemSubheading}>
              Network &amp; Database Engineer — MySQL, Linux, Tailscale
            </Text>
            <Text style={styles.bodyText}>
              Designed a distributed master-master MySQL GTID replication cluster over private WireGuard/Tailscale tunnels with deterministic key partitioning.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Technical Skills</Text>
          <Text style={styles.skillGroup}>
            <Text style={styles.skillLabel}>Languages &amp; Frameworks: </Text>
            <Text style={styles.bodyText}>
              Python (Streamlit, Pandas), Dart / Flutter, Next.js / TypeScript, C / C++
            </Text>
          </Text>
          <Text style={styles.skillGroup}>
            <Text style={styles.skillLabel}>Cloud &amp; Enterprise Identity: </Text>
            <Text style={styles.bodyText}>
              Microsoft Entra ID, Microsoft Intune, SharePoint Online, Odoo ERP
            </Text>
          </Text>
          <Text style={styles.skillGroup}>
            <Text style={styles.skillLabel}>Databases &amp; Networking: </Text>
            <Text style={styles.bodyText}>
              MySQL (Master-Master Replication), PostgreSQL, Prisma ORM, Tailscale Mesh VPN, Linux
            </Text>
          </Text>
          <Text style={styles.skillGroup}>
            <Text style={styles.skillLabel}>Hardware &amp; IoT: </Text>
            <Text style={styles.bodyText}>
              Microcontrollers, Solenoid Lock Integration, Thermal Printers, Hardware Diagnostics
            </Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}
