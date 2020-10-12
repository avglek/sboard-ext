import React from "react";
import classes from "./ForecastContent.module.css";

const ForecastContentText = ({ imgname, text }) => {
  //const textFormat = text.replaceAll(";", ".");

  const textFormat = text.split(";").join(".");

  return (
    <div className={classes.Forecast}>
      <p>
        <img src={imgname} alt="day" />
        <span style={{ paddingLeft: "5px" }}></span>
        {textFormat}
      </p>
    </div>
  );
};

export default ForecastContentText;
