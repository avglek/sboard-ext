import React from "react";
import { connect } from "react-redux";
import classes from "./Inform.module.css";
import Legend from "./Legend";
import SpecReg from "./SpecReg";
import Forecast from "./Forecast/Forecast";
import ToggleMapButton from "./ToggleMapButton/ToggleMapButton";

const Inform = (props) => {
  return (
    <div className={props.className}>
      {props.forestIsOpen ? <Forecast /> : <ToggleMapButton />}
      <SpecReg className={classes.spec_box} />
      <Legend className={classes.legend_box} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    forestIsOpen: state.forecast.isOpen,
  };
};

export default connect(mapStateToProps, null)(Inform);
