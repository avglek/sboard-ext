import React from "react";
import classes from "./ForecastContent.module.css";

const ForecastContent = ({ imgname, text }) => {
  console.log("Forecast text:", text);

  const textArray = text.split(";");

  const elementList = (text, index) => {
    if (index === 0) {
      return (
        <li key={index}>
          <img src={imgname} alt="day" />
          <span style={{ paddingLeft: "5px" }}></span>
          {text}
        </li>
      );
    } else {
      return <li key={index}>{text}</li>;
    }
  };

  return (
    <div className={classes.Forecast}>
      {/* <h1>30-09-2020 21:00 - 01-10-2020 09:00</h1> */}

      <ul>{textArray.map((items, index) => elementList(items, index))}</ul>
    </div>
  );
};

export default ForecastContent;
