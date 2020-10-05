import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "./CustomStyles";

const calcWidths = (size, col, len) => {
  let ret = [];
  //let w0 = (size - 20) - len * (col - 1)
  let w0 = size - 2 - len * (col - 1);
  ret.push(w0);

  for (let i = 1; i < col; i++) {
    ret.push(len);
  }

  return ret;
};

const PerformanceTable = ({ items }) => {
  if (items === undefined) {
    return <div></div>;
  } else {
    const columns = [];

    for (const [key, value] of Object.entries(items.title)) {
      columns.push({
        selector: key,
        name: value,
        wrap: true,
      });
    }

    const data = items.data;

    //const columnsWidth = calcWidths((parrentSize) ? parrentSize.width : '1000', columns.length, 10)

    const columnsWidth = calcWidths(70, columns.length, 8);

    const all = columnsWidth.map((item, index) => {
      if (index === 0) {
        return { ...columns[index], width: `${item}rem` };
      } else {
        if (index < columns.length - 1) {
          return {
            ...columns[index],
            ...{ width: `${item}rem`, center: true },
          };
        } else {
          return { ...columns[index], center: true };
        }
      }
    });

    return (
      <DataTable
        title="Arnold Movies"
        columns={all}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="22em"
        noHeader={true}
        customStyles={customStyles}
        striped={true}
        noDataComponent="Нет данных"
      />
    );
  }
};

export default PerformanceTable;
