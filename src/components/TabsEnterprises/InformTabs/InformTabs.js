import React from "react";
import "./InformTabs.css";

import Table from "react-bootstrap/Table";
import { Dimensions } from "react-native";

const handleClickLink = (link) =>{
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const winTop = 0;
  const winLeft = screenWidth / 2;
  const height = screenHeight - 100;
  const width = screenWidth / 2 - 50;

  window.open(
    link,
    "myWindow",
    "width=" +
      width +
      ", height=" +
      height +
      ", left=" +
      winLeft +
      ", top=" +
      winTop +
      ", scrollbars=yes, resizable=yes"
  );
}

const renderDefault = (item,index) =>{
  return(
    <tr key={index.toString()}>
        <td>{item.name}</td>
        <td>{item.value}</td>
    </tr>
  )
} 

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
    data.map((item, index) => {
      if(item.type){
        switch (item.type){
          case "link":
            return (
              <tr key={index.toString()}>
              <td>{item.name}</td>
              <td><span className="vlink" onClick={() => handleClickLink(item.value)}>ТРА станции</span></td>
            </tr>
            )
          default:
            return renderDefault(item,index)
        }
      }else{
        return renderDefault(item, index);
      }
    });

  return (
    <Table striped bordered hover size="sm">
      <tbody>{renderRowItems()}</tbody>
    </Table>
  );
};

export default InformTabs;
