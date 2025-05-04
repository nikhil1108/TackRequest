import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';

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
  // You can replace this with actual API data in future
  const quotaData: QuotaItem[] = [
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
  ];

  return (
    <Pivot>
      <PivotItem headerText="Quota Increase">
        <h3>Quota Details</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
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
              <tr key={index}>
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
                  <button>Show Trends</button>
                </td>
                <td>
                  <button>EDIT Quota</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PivotItem>
    </Pivot>
  );
};

export default QuotaTable;
