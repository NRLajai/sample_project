import React from "react";
import _ from "lodash";
import "./TableBody.scss";

const TableBody = (props) => {
  const { data, columns } = props;

  const modifyDate = (datestr) => {
    if (datestr) {
      const date = new Date(datestr);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    return null;
  };

  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    const columnData = _.get(item, column.path);

    if (column.path === "date") {
      return modifyDate(columnData);
    }
    return columnData;
  };

  console.log(data);

  return (
    <>
      <tbody>
        <tr>
          {data.map((item) => (
            <tr>
              {columns.map((column) => (
                <td key={item.id}>{renderCell(item, column)}</td>
              ))}
            </tr>
          ))}
        </tr>
      </tbody>
    </>
  );
};

export default TableBody;
