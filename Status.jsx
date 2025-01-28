import React, { useEffect, useState } from "react";
import "./Status.css";

const statuses = [
  { label: "In Review" },
  { label: "Solution Design Review" },
  { label: "Regulatory Approval" },
  { label: "Approved" },
  { label: "Closed Incomplete" },
  { label: "On Hold" },
  { label: "Blocked" },
];

const StepProgressBar = ({ currentStatus }) => {
  const currentIndex = statuses.findIndex((status) => status.label === currentStatus);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (currentIndex >= 0) {
      const interval = setInterval(() => {
        setAnimationProgress((prev) => (prev < currentIndex ? prev + 1 : prev));
      }, 300);

      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  return (
    <div className="step-progress-container">
      <div className="step-progress-track">
        {statuses.map((status, index) => (
          <React.Fragment key={status.label}>
            <div
              className={`step-indicator ${
                index <= animationProgress ? "step-active" : ""
              }`}
            >
              <div className="step-circle">
                {index <= animationProgress && <span className="step-checkmark">✔</span>}
              </div>
              <span
                className={`step-label ${
                  index <= animationProgress ? "label-active" : ""
                }`}
              >
                {status.label}
              </span>
            </div>
            {index < statuses.length - 1 && (
              <div
                className={`step-connector ${
                  index < animationProgress ? "connector-active" : ""
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepProgressBar;
