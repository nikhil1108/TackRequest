import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRow, setSelectedRow] = useState<QuotaItem | null>(null);

  const quotaColumns: ColumnDef<QuotaItem>[] = useMemo(
    () => [
      {
        accessorKey: 'service',
        header: 'Service',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'region',
        header: 'Region/Location',
      },
      {
        accessorKey: 'assignedValue',
        header: 'Assigned Value',
      },
      {
        accessorKey: 'currentUsage',
        header: 'Current Usage',
      },
      {
        accessorKey: 'currentPercent',
        header: 'Current %',
      },
      {
        accessorKey: 'adjustable',
        header: 'Adjustable',
        cell: (info) => (
          <span className={info.getValue() ? 'yes' : 'no'}>
            {info.getValue() ? 'Yes' : 'No'}
          </span>
        ),
      },
      {
        id: 'quotaUsage',
        header: 'Quota Usage',
        cell: () => <button className="quota-button trend">Show Trends</button>,
      },
      {
        id: 'editQuota',
        header: 'Edit Quota',
        cell: ({ row }) => (
          <button
            className="quota-button edit"
            onClick={() => setSelectedRow(row.original)}
          >
            EDIT Quota
          </button>
        ),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  }, [data, globalFilter]);

  const table = useReactTable<QuotaItem>({
    data: filteredData,
    columns: quotaColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleModalClose = () => {
    setSelectedRow(null);
  };

  const handleInputChange = (key: keyof QuotaItem, value: string | boolean) => {
    if (!selectedRow) return;
    setSelectedRow({ ...selectedRow, [key]: value });
  };

  const handleSave = () => {
    console.log('Saved changes:', selectedRow);
    setSelectedRow(null);
  };

  return (
    <div>
      <style>
        {`
        .quota-title {
          font-size: 20px;
          margin-bottom: 16px;
          color: #202124;
          font-weight: 600;
        }

        .search-input {
          margin-bottom: 12px;
          padding: 8px;
          width: 100%;
          max-width: 300px;
          border: 1px solid #dadce0;
          border-radius: 4px;
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
          cursor: pointer;
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

        .pagination {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pagination button {
          padding: 6px 12px;
          margin: 0 4px;
          border: none;
          border-radius: 4px;
          background-color: #e8f0fe;
          color: #1967d2;
          cursor: pointer;
        }

        .pagination button:disabled {
          background-color: #f1f3f4;
          color: #5f6368;
          cursor: not-allowed;
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 24px;
          border-radius: 8px;
          width: 400px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          font-family: Roboto, sans-serif;
        }

        .modal-content h3 {
          margin-top: 0;
          margin-bottom: 16px;
          color: #202124;
        }

        .modal-content label {
          display: block;
          font-size: 14px;
          margin-top: 12px;
          margin-bottom: 4px;
          color: #5f6368;
        }

        .modal-content input,
        .modal-content select {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #dadce0;
          border-radius: 4px;
        }

        .modal-actions {
          margin-top: 20px;
          text-align: right;
        }

        .modal-actions button {
          padding: 6px 12px;
          margin-left: 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn-cancel {
          background: #f1f3f4;
          color: #3c4043;
        }

        .btn-save {
          background: #1a73e8;
          color: white;
        }
        `}
      </style>

      <h2 className="quota-title">Quota Details</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div className="quota-table-container">
        <table className="quota-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRow && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Quota</h3>
            <label>Service</label>
            <input value={selectedRow.service} disabled />
            <label>Name</label>
            <input value={selectedRow.name} disabled />
            <label>Region</label>
            <input
              value={selectedRow.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
            />
            <label>Assigned Value</label>
            <input
              value={selectedRow.assignedValue}
              onChange={(e) =>
                handleInputChange('assignedValue', e.target.value)
              }
            />
            <label>Adjustable</label>
            <select
              value={selectedRow.adjustable ? 'true' : 'false'}
              onChange={(e) =>
                handleInputChange('adjustable', e.target.value === 'true')
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotaTable;
