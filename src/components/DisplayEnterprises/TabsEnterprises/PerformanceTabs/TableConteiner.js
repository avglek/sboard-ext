import React from "react";
import sizeMe from "react-sizeme";
import PerformanceTable from "./PerformanceTable";

const TableConteiner = (props) => {
  return <PerformanceTable items={props.items} parrentSize={props.size} />;
};
export default sizeMe({ monitorHeight: true, monitorWidth: true })(
  TableConteiner
);
