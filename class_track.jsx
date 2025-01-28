import React, { Component } from "react";
import Status from "./Status";

class TrackRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedSections: {
        requestInfo: true,
        deploymentDetails: true,
        budgetAndCosts: true,
        technicalDetails: true,
        workNotes: false,
      },
      newWorkNote: "",
      workNotes: [props.requestData.WORK_NOTES],
    };
  }

  toggleSection = (sectionKey) => {
    this.setState((prevState) => ({
      expandedSections: {
        ...prevState.expandedSections,
        [sectionKey]: !prevState.expandedSections[sectionKey],
      },
    }));
  };

  handleAddWorkNote = () => {
    const { newWorkNote, workNotes } = this.state;
    if (newWorkNote.trim() !== "") {
      this.setState({
        workNotes: [newWorkNote, ...workNotes],
        newWorkNote: "",
      });
    }
  };

  render() {
    const { requestData } = this.props;
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Track Request</h2>
        <Status currentStatus="Solution Design Review" />
      </div>
    );
  }
}

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
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
};

export default TrackRequest;
