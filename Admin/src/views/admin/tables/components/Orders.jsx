import React from "react";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { useMemo } from "react";

import { CSVLink } from "react-csv";
import ManageOrders from "../manages/ManageOrders";

const Orders = (props) => {
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
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  return (
    <div className="h-full w-full rounded-lg border border-solid border-teal-500 p-4">
      <div extra="w-full sm:overflow-auto p-4">
        <div class="relative flex items-center justify-between">
          <div class="text-xl font-bold text-navy-700 dark:text-white">
            Orders Table
          </div>
          <div className="mt-4">
            <CSVLink
              data={page.map((row) => ({
                Name: row.original.name,
                DairyCode: row.original.dairyCode,
                "Product-Name": row.original.product.attributes.title,
                Contact: row.original.contact,
                "Product-Quantity": row.original.productQuantity,
              }))}
              headers={[
                "Name",
                "DairyCode",
                "Product-Name",
                "Contact",
                "Product-Quantity",
              ]}
              filename="order_data.csv"
              className="text-blue-500 hover:underline"
            >
              Export to CSV
            </CSVLink>
          </div>
        </div>

        <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                      className="border-b border-gray-200  pb-[10px] text-start dark:!border-navy-700"
                    >
                      <p className="text-xs tracking-wide text-gray-600">
                        {column.render("Header")}
                      </p>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                const OrderData = row.original;

                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "NAME") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "DairyCode") {
                        data = (
                          <div className="flex items-center ">
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "Product-Name") {
                        data = row.original.product.attributes.title;
                      } else if (cell.column.Header === "Contact") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "Product-Quantity") {
                        data = cell.value;
                      }
                      <>
                        <td>
                          <ManageOrders />
                        </td>
                      </>
                      return (
                        <td
                          className="pt-[14px] pb-[18px] sm:text-[14px]"
                          {...cell.getCellProps()}
                          key={index}
                        >
                          {data}
                        </td>

                      );
                    })}
                    <td>
                      <ManageOrders OrderData={OrderData} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
