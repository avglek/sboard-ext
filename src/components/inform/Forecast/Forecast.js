import React from "react";
import { connect } from "react-redux";
import ForecastContentText from "./ForecastContent/ForecastContentText";
import classes from "./Forecast.module.css";

const dayWeatcher = "./svg/weatcher-icons/day2.svg";
const nightWeatcher = "./svg/weatcher-icons/night2.svg";

const parseDate = (dateString) => {
  const arr = dateString.substr(0, 10).trim().split("-");
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

const Forecast = ({ isOpen, items }) => {
  if (isOpen) {
    const dayString = parseDate(items[0].day.period);
    const date = new Date(dayString);

    return (
      <div className={classes.Weather}>
        <div className={classes.Header}>
          Прогноз погоды на {date.toLocaleDateString()}
        </div>
        <div className={classes.Body}>
          <ForecastContentText
            imgname={nightWeatcher}
            text={items[0].night.prognoz}
          />
          <ForecastContentText
            imgname={dayWeatcher}
            text={items[0].day.prognoz}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    items: state.forecast.items,
    hasErrored: state.forecast.error,
    isLoading: state.forecast.loading,
    isOpen: state.forecast.isOpen,
  };
};

export default connect(mapStateToProps, null)(Forecast);
