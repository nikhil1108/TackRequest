import React from 'react';
import { PivotItem } from '@fluentui/react';

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

interface QuotaTableProps {
  data: QuotaItem[];
}

const QuotaTable: React.FC<QuotaTableProps> = ({ data }) => {
  return (
    <PivotItem headerText="Quota Increase">
      <style>
        {`
          .quota-title {
            font-size: 20px;
            margin-bottom: 16px;
            color: #202124;
            font-weight: 600;
          }

          .quota-table-container {
            overflow-x: auto;
            background: #fff;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(60, 64, 67, 0.15);
          }

          .quota-table {
            width: 100%;
            border-collapse: collapse;
            font-family: 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            color: #3c4043;
          }

          .quota-table th {
            background: #f8f9fa;
            font-weight: 600;
            text-align: left;
            padding: 12px 10px;
            border-bottom: 1px solid #dadce0;
          }

          .quota-table td {
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
            vertical-align: middle;
          }

          .quota-table tr:hover {
            background-color: #f1f3f4;
          }

          .quota-button {
            padding: 6px 10px;
            font-size: 13px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.2s;
          }

          .quota-button.trend {
            background-color: #e8f0fe;
            color: #1967d2;
          }

          .quota-button.trend:hover {
            background-color: #d2e3fc;
          }

          .quota-button.edit {
            background-color: #fce8e6;
            color: #d93025;
          }

          .quota-button.edit:hover {
            background-color: #fbcfc6;
          }

          .yes {
            color: #188038;
            font-weight: bold;
          }

          .no {
            color: #5f6368;
            font-weight: bold;
          }
        `}
      </style>

      <h2 className="quota-title">Quota Details</h2>
      <div className="quota-table-container">
        <table className="quota-table">
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
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.service}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.region}</td>
                <td>{item.assignedValue}</td>
                <td>{item.currentUsage}</td>
                <td>{item.currentPercent}</td>
                <td className={item.adjustable ? 'yes' : 'no'}>
                  {item.adjustable ? 'Yes' : 'No'}
                </td>
                <td>
                  <button className="quota-button trend">Show Trends</button>
                </td>
                <td>
                  <button className="quota-button edit">EDIT Quota</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PivotItem>
  );
};

export default QuotaTable;
