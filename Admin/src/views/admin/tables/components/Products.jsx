import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { CSVLink } from "react-csv";
import ManageProducts from "../manages/ManageProducts";

const Products = (props) => {
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
  initialState.pageSize = 11;

  return (
    <>
      <div className="h-full w-full rounded-lg border border-solid border-teal-500 p-4">
        <div className="w-full p-4 sm:overflow-auto">
          <div className="relative flex items-center justify-between">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
              Products Table
            </div>
            <div>
              <CSVLink
                data={page.map((row) => ({
                  "Product-Name": row.original.attributes.title,
                  Company: row.original.attributes.company,
                  Price: row.original.attributes.price,
                  "Available-Stock": row.original.attributes.availableStock,
                }))}
                headers={columns
                  .filter((column) => column.Header !== "Product-Image")
                  .map((column) => column.Header)}
                filename="Products_data.csv"
                className="mb-2 text-blue-500 hover:underline"
              >
                Export to CSV
              </CSVLink>
            </div>
          </div>

          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <table
              {...getTableProps()}
              className="w-full"
              variant="simple"
              color="gray-500"
              mb="24px"
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                        key={index}
                      >
                        <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
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
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, index) => {
                        let data = "";

                        if (cell.column.Header === "Product-Image") {
                          data = (
                            <div className="mr-2 w-24 rounded">
                              <img
                                src={`/getImage/${cell.row.original.attributes.image}`}
                                alt="Product"
                              />
                            </div>
                          );
                        } else if (cell.column.Header === "Product-Name") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.row.original.attributes.title}
                            </p>
                          );
                        } else if (cell.column.Header === "Available-Stock") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.row.original.attributes.availableStock}
                            </p>
                          );
                        }

                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            className="pt-[14px] pb-[16px] sm:text-[14px]"
                          >
                            {data}
                          </td>
                        );
                      })}
                      <td>
                        <ManageProducts productID={row.original._id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
