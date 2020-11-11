import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import InformTabs from "./InformTabs/InformTabs";
import TableConteiner from "./PerformanceTabs/TableConteiner";
import { connect } from "react-redux";
import ModalWin from "../ModalWin/ModalWin";

import LoaderConteiner from "../LoaderSpinner/LoaderConteiner";

const mapStateToProps = (state) => {
  return {
    items: state.modal.items,
    hasErrored: state.modal.error,
    isLoading: state.modal.loading,
  };
};

const TabEnterprises = (props) => {
  console.log("items:", props.items);
  const keys = Object.keys(props.items);
  const activs = keys.filter((item) => item !== "info");

  const customTabs = activs.map((item, index) => {
    return (
      <Tab eventKey={item} title={props.items[item].header} key={index}>
        <TableConteiner items={props.items[item]} />
      </Tab>
    );
  });

  const contentRender = () => {
    console.log("props:", props);
    if (props.hasErrored) {
      return <p>Ошибка загрузки данных: {props.hasErrored}</p>;
    }

    if (props.isLoading) {
      console.log("loading");
      return (
        <div>
          <LoaderConteiner />
        </div>
      );
    } else {
      console.log("tabs");
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

  return <ModalWin>{contentRender()}</ModalWin>;
};

export default connect(mapStateToProps, null)(TabEnterprises);
