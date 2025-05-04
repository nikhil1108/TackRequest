import React, { useState } from 'react';
import { Pivot, PivotItem, TextField, DefaultButton } from '@fluentui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuotaItem {
  service: string;
  name: string;
  type: string;
  region: string;
  assignedValue: string;
  currentUsage: string;
  currentPercent: string;
  adjustable: boolean;
}

const QuotaTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<QuotaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quotaData, setQuotaData] = useState<QuotaItem[]>([
    {
      service: "Compute Engine API",
      name: "CPU",
      type: "Quota",
      region: "Zone: us-west-4",
      assignedValue: "50",
      currentUsage: "10",
      currentPercent: "20%",
      adjustable: true,
    },
    {
      service: "Compute Engine API",
      name: "N2D CPU",
      type: "Quota",
      region: "Zone: us-west-4",
      assignedValue: "30",
      currentUsage: "",
      currentPercent: "",
      adjustable: false,
    },
    {
      service: "Compute Engine API",
      name: "Persistent Disk SSD",
      type: "Quota",
      region: "Zone: us-west-4",
      assignedValue: "81,920 GB",
      currentUsage: "330 GB",
      currentPercent: "0.4%",
      adjustable: true,
    },
    {
      service: "Compute Engine API",
      name: "Committed Nvidia L4 GPU",
      type: "Quota",
      region: "Zone: us-west-4",
      assignedValue: "200",
      currentUsage: "10",
      currentPercent: "5%",
      adjustable: true,
    },
  ]);

  const openModal = (row: QuotaItem) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleInputChange = (field: keyof QuotaItem, value: string) => {
    if (selectedRow) {
      setSelectedRow({ ...selectedRow, [field]: field === "adjustable" ? value.toLowerCase() === "yes" : value });
    }
  };

  const saveChanges = () => {
    if (selectedRow) {
      setQuotaData(prev =>
        prev.map(item =>
          item.name === selectedRow.name ? selectedRow : item
        )
      );
      closeModal();
    }
  };

  return (
    <>
      <Pivot>
        <PivotItem headerText="Quota Increase">
          <h3 style={{ marginBottom: '10px', fontFamily: 'Segoe UI' }}>Quota Details</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Segoe UI', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#f4f4f4' }}>
              <tr>
                <th>Service</th>
                <th>Name</th>
                <th>Type</th>
                <th>Region/Location</th>
                <th>Assigned Value</th>
                <th>Current Usage</th>
                <th>Current %</th>
                <th>Adjustable</th>
                <th>Quota Usage</th>
                <th>Edit Quota</th>
              </tr>
            </thead>
            <tbody>
              {quotaData.map((item, index) => (
                <tr
                  key={index}
                  style={{ borderBottom: '1px solid #ddd', transition: 'background 0.3s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f9f9f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                >
                  <td>{item.service}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.region}</td>
                  <td>{item.assignedValue}</td>
                  <td>{item.currentUsage}</td>
                  <td>{item.currentPercent}</td>
                  <td style={{ color: item.adjustable ? 'green' : 'gray' }}>
                    {item.adjustable ? 'Yes' : 'No'}
                  </td>
                  <td>
                    <button
                      style={{
                        background: '#0078d4',
                        border: 'none',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                      }}
                    >
                      Show Trends
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        background: '#e44d26',
                        border: 'none',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                      }}
                      onClick={() => openModal(item)}
                    >
                      EDIT Quota
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PivotItem>
      </Pivot>

      <AnimatePresence>
        {isModalOpen && selectedRow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <motion.div
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                width: '500px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                fontFamily: 'Segoe UI'
              }}
            >
              <h2 style={{ marginBottom: '20px' }}>Edit Quota</h2>
              <TextField label="Service" value={selectedRow.service} onChange={(e, val) => handleInputChange("service", val || "")} />
              <TextField label="Name" value={selectedRow.name} onChange={(e, val) => handleInputChange("name", val || "")} />
              <TextField label="Type" value={selectedRow.type} onChange={(e, val) => handleInputChange("type", val || "")} />
              <TextField label="Region" value={selectedRow.region} onChange={(e, val) => handleInputChange("region", val || "")} />
              <TextField label="Assigned Value" value={selectedRow.assignedValue} onChange={(e, val) => handleInputChange("assignedValue", val || "")} />
              <TextField label="Current Usage" value={selectedRow.currentUsage} onChange={(e, val) => handleInputChange("currentUsage", val || "")} />
              <TextField label="Current %" value={selectedRow.currentPercent} onChange={(e, val) => handleInputChange("currentPercent", val || "")} />
              <TextField label="Adjustable" value={selectedRow.adjustable ? "Yes" : "No"} onChange={(e, val) => handleInputChange("adjustable", val || "")} />

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <DefaultButton text="Cancel" onClick={closeModal} />
                <DefaultButton text="Save Changes" primary onClick={saveChanges} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuotaTable;
