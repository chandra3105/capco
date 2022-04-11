import React, { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import PropTypes from 'prop-types';
import "./dataTable.scss";

export const DataTable = ({tableData}) => {
  // Created state for storing the data for Table
  const [tableDatas, setTableDatas] = useState([])

  // Passing data to table data source
  const productsData = useMemo(() => [...tableDatas], [tableDatas]);

  // Passing data to table Columns source
  const productsColumns = useMemo(
    () =>
    tableDatas[0]
        ? Object.keys(tableDatas[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} />,
                  maxWidth: 70,
                };
              return { Header: key, accessor: key };
            })
        : [],
    [tableDatas]
  );

  // Instance for react-table
  const tableInstance = useTable({ columns: productsColumns, data: productsData }, useSortBy);

  // Importing table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // This useEffect will play as componentDidMount and componentDidUpdate
  useEffect(() => {
    setTableDatas(tableData)
  }, [tableData])
  
  return (
    <>
      <table {...getTableProps()} className={'table_container'}>
        {/* Table Header content */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Table body content */}
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr key={idx} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// Props type declaration
DataTable.propTypes = {
  tableData: PropTypes.any,
}
