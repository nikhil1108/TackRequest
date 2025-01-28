import React, { useState } from "react";
import "react-step-progress-bar/styles.css";
import { Collapse } from "react-collapse";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import Status from './Status'


const TrackRequest = ({ requestData }) => {
  const [expandedSections, setExpandedSections] = useState({
    requestInfo: true,
    deploymentDetails: true,
    budgetAndCosts: true,
    technicalDetails: true,
    workNotes: false, // Work Notes section starts collapsed
  });

  const [newWorkNote, setNewWorkNote] = useState("");
  const [workNotes, setWorkNotes] = useState([requestData.WORK_NOTES]);

  const groupedFields = [
    {
      section: "Request Information",
      key: "requestInfo",
      fields: [
        { label: "Request Type", value: requestData.REQUEST_TYPE },
        { label: "Request Name", value: requestData.REQUEST_NAME },
        { label: "Request Description", value: requestData.REQUEST_DESC },
        { label: "Requester Username", value: requestData.REQUESTER_USERNAME },
        { label: "Requester Full Name", value: requestData.REQUESTER_FULL_NAME },
        { label: "Status", value: requestData.STATUS },
        { label: "Assigned To", value: requestData.ASSIGNED_TO },
      ],
    },
    {
      section: "Deployment Details",
      key: "deploymentDetails",
      fields: [
        { label: "Deployment Environment", value: requestData.DEPLOYMENT_ENV },
        { label: "Cloud Service Provider", value: requestData.CLOUD_SERVICE_PROVIDER },
        { label: "Region", value: requestData.REGION },
        { label: "Availability Zone", value: requestData.AVAILABILITY_ZONE },
        { label: "Application Name", value: requestData.APPLICATION_NAME },
        { label: "Application Tier", value: requestData.APPLICATION_TIER },
        { label: "Native Services", value: requestData.NATIVE_SERVICES },
      ],
    },
    {
      section: "Budget and Costs",
      key: "budgetAndCosts",
      fields: [
        { label: "Cost Center", value: requestData.COST_CENTER },
        { label: "Estimated Monthly OPEX", value: requestData.ESTIMATED_MONTHLY_OPEX },
        { label: "Monthly OPEX Increase", value: requestData.EST_MONTHLYOPEX_INCREASE },
        { label: "Budget Category", value: requestData.BUDGET_CATEGORY },
        { label: "Budget Approval", value: requestData.BUDGET_APPROVAL },
        { label: "Budget Reviewer", value: requestData.BUDGET_REVIEWER },
      ],
    },
    {
      section: "Technical Details",
      key: "technicalDetails",
      fields: [
        { label: "K8S CPUs per Pod", value: requestData.K8S_CPUS_PER_POD },
        { label: "K8S Namespace Name", value: requestData.K8S_NAMESPACE_NAME },
        { label: "K8S Number of Pods", value: requestData.K8S_NUM_OF_PODS },
        { label: "LLM Model", value: requestData.LLM_MODEL },
        { label: "Open AI Model Version", value: requestData.OPEN_AI_MODEL_VERSION },
      ],
    },
  ];

  const toggleSection = (sectionKey) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionKey]: !prevState[sectionKey],
    }));
  };

  const handleAddWorkNote = () => {
    if (newWorkNote.trim() !== "") {
      setWorkNotes([newWorkNote, ...workNotes]);
      setNewWorkNote("");
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>Track Request</h2>
     <Status currentStatus="Solution Design Review"/>

      {/* Progress Bar
      <div style={styles.progressContainer}>
        <ProgressBar
          percent={(currentStep / statusSteps.length) * 100}
          filledBackground="linear-gradient(to right, #0070ba, #00b8e6)"
        >
          {statusSteps.map((step, index) => (
            <Step key={index}>
              {({ accomplished }) => (
                <div
                  style={{
                    ...styles.progressStep,
                    backgroundColor: accomplished ? "#0070ba" : "#ddd",
                  }}
                >
                  {index + 1}
                </div>
              )}
            </Step>
          ))}
        </ProgressBar>
      </div> */}

      {/* Work Notes Section */}
      <div style={styles.workNotesContainer}>
        <div
          style={styles.sectionHeader}
          onClick={() => toggleSection("workNotes")}
        >
          <h3 style={styles.sectionHeading}>Add Work Note</h3>
          <div style={styles.arrowContainer}>
            {expandedSections.workNotes ? (
              <FaChevronUp style={styles.arrowIcon} />
            ) : (
              <FaChevronDown style={styles.arrowIcon} />
            )}
          </div>
        </div>
        <Collapse isOpened={expandedSections.workNotes}>
          <div style={styles.workNotesContent}>
            {/* Previous Work Notes (editable, multi-line) */}
            <div style={styles.previousNotes}>
              <h4 style={styles.workNotesHeader}>Previous Notes</h4>
              <textarea
                value={workNotes.join("\n")}
                onChange={() => {}}
                readOnly
                style={styles.textArea}
              />
            </div>

            {/* New Work Note */}
            <div style={styles.newWorkNote}>
              <textarea
                value={newWorkNote}
                onChange={(e) => setNewWorkNote(e.target.value)}
                placeholder="Add a new work note..."
                style={styles.textArea}
              />
              <button onClick={handleAddWorkNote} style={styles.addNoteButton}>
                Add Note
              </button>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Sections */}
      {groupedFields.map((group, index) => (
        <div
          key={index}
          style={{
            ...styles.section,
            marginBottom: expandedSections[group.key] ? "20px" : "10px", // Adds space after collapsed section
          }}
        >
          <div
            style={styles.sectionHeader}
            onClick={() => toggleSection(group.key)}
          >
            <h3 style={styles.sectionHeading}>{group.section}</h3>
            <div style={styles.arrowContainer}>
              {expandedSections[group.key] ? (
                <FaChevronUp style={styles.arrowIcon} />
              ) : (
                <FaChevronDown style={styles.arrowIcon} />
              )}
            </div>
          </div>

          <Collapse isOpened={expandedSections[group.key]}>
            <div style={styles.grid}>
              {group.fields
                .filter((field) => field.value) // Skip empty fields
                .map((field, idx) => (
                  <div key={idx} style={styles.row}>
                    <div style={styles.label}>{field.label}</div>
                    <div style={styles.value}>{field.value}</div>
                  </div>
                ))}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

// Styling with minimal and compact UI
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "1200px",
    margin: "20px auto",
    animation: "fadeIn 1s ease-out",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0070ba",
    marginBottom: "15px",
  },
  progressContainer: {
    marginBottom: "20px",
  },
  progressStep: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
  },
  workNotesContainer: {
    marginBottom: "10px",
    backgroundColor: "#f7f7f7",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px",
    backgroundColor: "#0070ba",
    color: "#fff",
    border: "none",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    width: "98%", // Ensures the header spans the full width
  },
  sectionHeading: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
    wordWrap: "break-word", // Ensures the header doesn't overflow
  },
  arrowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    fontSize: "16px",
    color: "#fff",
    transition: "transform 0.3s",
  },
  workNotesContent: {
    padding: "10px",
  },
  workNotesHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  previousNotes: {
    marginBottom: "15px",
  },
  textArea: {
    width: "98%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "vertical",
    marginBottom: "10px",
  },
  newWorkNote: {
    marginTop: "10px",
  },
  addNoteButton: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#0070ba",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
  },
  value: {
    fontSize: "14px",
    color: "#555",
    marginTop: "8px",
  },

  // Animation Keyframes
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
};

export default TrackRequest;
