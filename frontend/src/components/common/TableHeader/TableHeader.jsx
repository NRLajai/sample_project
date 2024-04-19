import React from "react";
import "./TableHeader.scss";

const TableHeader = (props) => {
  const { columns } = props;

  return (
    <>
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="tableheader" key={column.field} scope='col'>
              {column.headerName}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
