import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import InformTabs from "./InformTabs/InformTabs";
import TableConteiner from "./PerformanceTabs/TableConteiner";
import { connect } from "react-redux";

import LoaderConteiner from "../../LoaderSpinner/LoaderConteiner";

const mapStateToProps = (state) => {
  return {
    items: state.modal.items,
    hasErrored: state.modal.error,
    isLoading: state.modal.loading,
  };
};

const TabEnterprises = (props) => {
  const keys = Object.keys(props.items);
  const activs = keys.filter((item) => item !== "info");

  const customTabs = activs.map((item, index) => {
    return (
      <Tab eventKey={item} title={props.items[item].header} key={index}>
        <TableConteiner items={props.items[item]} />
      </Tab>
    );
  });

  if (props.hasErrored) {
    return <p>Ошибка загрузки данных: {props.hasErrored}</p>;
  }

  if (!props.isShow) {
    return null;
  }

  //if (props.isLoading && props.items.length !== 0) {
  if (props.isLoading) {
    return (
      <div>
        <LoaderConteiner />
      </div>
    );
  } else {
    return (
      <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
        <Tab eventKey="info" title="Информация">
          <InformTabs items={props.items.info} />
        </Tab>
        {customTabs}
      </Tabs>
    );
  }
};

export default connect(mapStateToProps, null)(TabEnterprises);
