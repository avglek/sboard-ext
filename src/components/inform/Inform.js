import React from "react";
import classes from "./Inform.module.css";
import Legend from "./Legend";
import SpecReg from "./SpecReg";

const Inform = (props) => {
  return (
    <div className={props.className}>
      <SpecReg className={classes.spec_box} />
      <Legend className={classes.legend_box} />
    </div>
  );
};
export default Inform;
