import React from "react";
import TableHeader from "../TableHeader/TableHeader";
import TableBody from "../TableBody/TableBody";
import "./Table.scss";

const Table = (props) => {
  const { columns, data } = props;

  return (
    <table class='table'>
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
