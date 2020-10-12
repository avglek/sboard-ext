import React from "react";
import classes from "./Inform.module.css";
import Legend from "./Legend";
import SpecReg from "./SpecReg";
import Forecast from "./Forecast/Forecast";

const Inform = (props) => {
  return (
    <div className={props.className}>
      <Forecast />
      <SpecReg className={classes.spec_box} />
      <Legend className={classes.legend_box} />
    </div>
  );
};
export default Inform;
