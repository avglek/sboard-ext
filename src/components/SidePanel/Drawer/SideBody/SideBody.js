import React from "react";
import classes from "./SideBody.module.css";
import CheckBlock from "./CheckBlock/CheckBlock";

const SideBody = () => {
  return (
    <div className={classes.SideBody}>
      <CheckBlock />
    </div>
  );
};

export default SideBody;
