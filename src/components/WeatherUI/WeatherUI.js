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
    selectItems: state.weather.selectItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    weatherWinClose: () => dispatch(weatherWinClose()),
  };
};

const WeatherUI = (props) => {
  console.log("props", props);

  if (props.isOpen) {
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

        {/* <h3>
          <span className={classes.textRed}>
            {props.selectItems.stan_day_time}
          </span>
        </h3>
        <h2>X:{props.x}</h2>
        <h2>Y:{props.y}</h2> */}
        <dl>
          <dt className={classes.textRed}>{props.selectItems.stan_day_time}</dt>
          <dd className={classes.textText}>
            <b> {props.selectItems.kol_cloud}</b>
          </dd>
          <dd className={classes.textText}>
            <b>Ветер: </b>
            {props.selectItems.wind}
          </dd>
          {props.selectItems.wind_speed !== null ? (
            <dd className={classes.textText}>
              <b>Cкорость : </b>
              {props.selectItems.wind_speed} м/с
            </dd>
          ) : null}
          {props.selectItems.temperature !== null ? (
            <dd className={classes.textText}>
              <b>Температура :</b> {props.selectItems.temperature} С
            </dd>
          ) : null}
          {props.selectItems.pressure !== null ? (
            <dd className={classes.textText}>
              <b>Давление :</b> {props.selectItems.pressure} мб
            </dd>
          ) : null}
          {props.selectItems.visibility !== null ? (
            <dd className={classes.textText}>
              <b>Видимость : </b>
              {props.selectItems.visibility} км
            </dd>
          ) : null}
          {props.selectItems.phenomena !== null ? (
            <dd className={classes.textText}>
              <b>Явления в срок :</b> {props.selectItems.phenomena}
            </dd>
          ) : null}

          {props.selectItems.nabludenie_1 !== null ? (
            <dd className={classes.textText}>
              <b>Явления между сроками 1 :</b> {props.selectItems.nabludenie_1}
            </dd>
          ) : null}
          {props.selectItems.nabludenie_2 !== null ? (
            <dd className={classes.textText}>
              <b>Явления между сроками 2 :</b> {props.selectItems.nabludenie_2}
            </dd>
          ) : null}
          {props.selectItems.dangerous_phenomena !== null ? (
            <dd className={classes.textText}>
              <b style={{ color: "red" }}> OЯП: </b>
              {props.selectItems.dangerous_phenomena}
            </dd>
          ) : null}
          {props.selectItems.gust_of_wind !== null ? (
            <dd className={classes.textText}>
              <b>Порывы ветра в срок : </b>
              {props.selectItems.gust_of_wind} м/с
            </dd>
          ) : null}
          {props.selectItems.gust_of_wind_between !== null ? (
            <dd className={classes.textText}>
              <b>Порывы между сроками : </b>
              {props.selectItems.gust_of_wind_between} м/с
            </dd>
          ) : null}
          {props.selectItems.col_1 !== null ? (
            <dd className={classes.textText}>
              <b>Высота снега по рейке :</b> {props.selectItems.col_1}
            </dd>
          ) : null}
          {props.selectItems.col_2 !== null ? (
            <dd className={classes.textText}>
              <b>Сумма осадков за 12 ч :</b> {props.selectItems.col_2}
            </dd>
          ) : null}
        </dl>
      </div>
    );
  } else {
    return <div className={classes.Weather} />;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherUI);

//  wind: row.wind,
//       wind_speed: row.wind_speed,
//       temperature: row.temperature,
//       pressure: row.pressure,
//       visibility: row.visibility,
//       phenomena: row.phenomena,
//       dangerous_phenomena: row.dangerous_phenomena,
//       nabludenie_1: row.nabludenie_1,
//       nabludenie_2: row.nabludenie_2,
//       gust_of_wind: row.gust_of_wind,
//       gust_of_wind_between: row.gust_of_wind_between,
//       nabludenie_1: row.nabludenie_1,
//       nabludenie_2: row.nabludenie_2,
//       col_1: row.col_1,
//       col_2: row.col_2,
//       map_id: row.map_id,
