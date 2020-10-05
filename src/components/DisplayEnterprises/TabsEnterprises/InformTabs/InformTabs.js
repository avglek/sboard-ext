import React from "react";
import "./InformTabs.css";

import Table from "react-bootstrap/Table";

const InformTabs = (props) => {
  // код станции;
  // наименование станции;
  // наименование предприятия;
  // полное наименование предприятия;
  // телефон;
  // характеристики

  const data = props.items;

  if (data === undefined) {
    return null;
  }

  const renderRowItems = () =>
    data.map((item, index) => (
      <tr key={index.toString()}>
        <td>{item.name}</td>
        <td>{item.value}</td>
      </tr>
    ));

  return (
    <Table striped bordered hover size="sm">
      <tbody>{renderRowItems()}</tbody>
    </Table>
  );
};

export default InformTabs;
