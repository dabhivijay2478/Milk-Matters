import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { CSVLink } from "react-csv";

import ManageUser from "../manages/ManageUser";

const UserTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow, // Call prepareRow
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  // Call prepareRow for each row in the page
  page.forEach(prepareRow);

  return (
    <>
      <div className="h-full w-full rounded-lg border border-solid border-teal-500 p-4">
        <div className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            User's Table
          </div>

          <div>
            <CSVLink
              data={page.map((row) => row.cells.map((cell) => cell.value))}
              headers={columns.map((column) => column.Header)}
              filename="user_data.csv"
              className="mb-2 text-blue-500 hover:underline"
            >
              Export to CSV
            </CSVLink>
          </div>
        </div>
        <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
          <table
            {...getTableProps()}
            className="variant-simple color-gray-500 mb-24px mt-8 h-max w-full"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="pr-30 border-b border-gray-200 pb-[10px] text-start dark:!border-navy-700"
                      key={index}
                    >
                      <div className="text-xs font-bold tracking-wide text-gray-600">
                        {column.render("Header")}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                const userData = row.original;
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "Name") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "DairyCode") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "Mobile") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "Role") {
                        let roleLabel = "";
                        switch (cell.value) {
                          case "manager":
                            roleLabel = "M";
                            break;
                          case "farmer":
                            roleLabel = "F";
                            break;
                          case "veterinarian":
                            roleLabel = "V";
                            break;
                          default:
                            roleLabel = "Unknown";
                        }
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {roleLabel}
                          </p>
                        );
                      }
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className="pt-[14px] pb-3 text-[14px]"
                        >
                          {data}
                        </td>
                      );
                    })}
                    <td>
                      <ManageUser userData={userData} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserTable;
