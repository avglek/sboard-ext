import React from "react";
import classes from "./WeatherUI.module.css";
import { MdClear } from "react-icons/md";
import { connect } from "react-redux";
import { weatherWinClose } from "../../store/actions/weatherAction";

const mapStateToProps = (state) => {
  return {
    isOpen: state.weather.isOpen,
    x: state.weather.x,
    y: state.weather.y,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    weatherWinClose: () => dispatch(weatherWinClose()),
  };
};

const WeatherUI = (props) => {
  return (
    <div
      className={classes.Weather}
      style={{
        visibility: props.isOpen ? "visible" : "hidden",
        top: props.y,
        left: props.x,
      }}
    >
      <div
        className={classes.WeatherBtnClose}
        onClick={() => props.weatherWinClose()}
      >
        <MdClear />
      </div>
      <h3>Title</h3>
      <h2>X:{props.x}</h2>
      <h2>Y:{props.y}</h2>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherUI);
