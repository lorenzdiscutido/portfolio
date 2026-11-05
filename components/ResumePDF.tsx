import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: "#0f172a",
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.45,
  },
  header: {
    marginBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: "#0052FF",
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 3,
    letterSpacing: 0.5,
  },
  roleTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#0052FF",
    marginBottom: 5,
  },
  contactRow: {
    fontSize: 8.5,
    color: "#475569",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  section: {
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: "#0052FF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
  },
  itemBlock: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  itemDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#64748b",
  },
  itemSubheading: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#334155",
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2.5,
    paddingLeft: 4,
  },
  bullet: {
    width: 10,
    fontSize: 9,
    color: "#0052FF",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.4,
  },
  skillsTable: {
    marginTop: 2,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 3.5,
  },
  skillCategory: {
    width: 135,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  skillValues: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
  },
});

export default function ResumePDF() {
  return (
    <Document
      title="Jose Lorenzo Discutido - Resume"
      author="Jose Lorenzo Discutido"
      subject="Data and Systems Engineer Resume"
    >
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>Jose Lorenzo Discutido</Text>
          <Text style={styles.roleTitle}>
            Data and Systems Engineer (AI and IoT)
          </Text>
          <View style={styles.contactRow}>
            <Text>Email: [lorenzdiscutido@gmail.com]</Text>
            <Text>•</Text>
            <Text>Phone: [+63 9XX XXX XXXX]</Text>
            <Text>•</Text>
            <Text>LinkedIn: [linkedin.com/in/discutido-lorenzo]</Text>
            <Text>•</Text>
            <Text>Location: Manila, Philippines</Text>
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Professional Experience</Text>

          {/* Current Role */}
          <View style={styles.itemBlock}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>Vonotec</Text>
              <Text style={styles.itemDate}>2024 – Present</Text>
            </View>
            <Text style={styles.itemSubheading}>
              Digital Data &amp; Systems Engineer and AI/IoT Data Officer
            </Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Orchestrating enterprise cloud identity using Microsoft Entra ID and Intune for automated device enrollment and security compliance.
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Architecting automated defect logging pipelines via Python, Streamlit, and the Gemini API to streamline enterprise operations.
              </Text>
            </View>
          </View>

          {/* Previous Role */}
          <View style={styles.itemBlock}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>PHINMA Properties</Text>
              <Text style={styles.itemDate}>Internship</Text>
            </View>
            <Text style={styles.itemSubheading}>
              IT Systems &amp; Network Intern
            </Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Managed hardware diagnostics, server configurations, LAN cabling, and subnetting protocols.
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Administered remote support and Azure Active Directory deployment.
              </Text>
            </View>
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Education</Text>
          <View style={styles.itemBlock}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>
                Polytechnic University of the Philippines (PUP)
              </Text>
              <Text style={styles.itemDate}>Manila, Philippines</Text>
            </View>
            <Text style={styles.itemSubheading}>
              Bachelor of Science in Computer Engineering (BSCPE)
            </Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Specialization in Big Data Analytics, distributed data processing, embedded hardware systems, and ISO/IEC 25010 software compliance.
              </Text>
            </View>
          </View>
        </View>

        {/* Engineering Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Key Engineering Projects</Text>

          <View style={styles.itemBlock}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>Vonotec Automated Defect Logger</Text>
              <Text style={styles.itemDate}>Lead Developer</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Leveraged Google Gemini API to analyze inspection photographs and extract defect dimensions, streaming structured data into SharePoint Excel workbooks via Python and Streamlit.
              </Text>
            </View>
          </View>

          <View style={styles.itemBlock}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>IsKiosk IoT Document Terminal</Text>
              <Text style={styles.itemDate}>Systems Engineer / Hardware Integrator</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Architected automated document management terminal integrating thermal barcode printing and 12V DC solenoid locks, validated for ISO/IEC 25010 software quality standards.
              </Text>
            </View>
          </View>

          <View style={styles.itemBlock}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>Komunikonek Mobile Dashboard</Text>
              <Text style={styles.itemDate}>Mobile Developer</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Migrated barangay management workflows to a mobile-first Flutter app with real-time feedback loops and administrative statistical dashboards powered by Firebase.
              </Text>
            </View>
          </View>
        </View>

        {/* Core Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Core Technical Skills</Text>
          <View style={styles.skillsTable}>
            <View style={styles.skillRow}>
              <Text style={styles.skillCategory}>Languages &amp; Frameworks:</Text>
              <Text style={styles.skillValues}>
                Python, Next.js, TypeScript, C/C++, Dart, Flutter
              </Text>
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillCategory}>Cloud &amp; Systems:</Text>
              <Text style={styles.skillValues}>
                Microsoft 365, Entra ID, Intune, Odoo ERP, Firebase, Tailscale
              </Text>
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillCategory}>Hardware &amp; Data:</Text>
              <Text style={styles.skillValues}>
                IoT Microcontrollers, MySQL, PostgreSQL, Streamlit, Pandas
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
