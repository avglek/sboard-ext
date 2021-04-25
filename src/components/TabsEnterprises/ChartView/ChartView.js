import React, { useEffect } from "react";
import classes from "./ChartView.module.css";
import { startChart } from "./chart";

const ChartView = ({ items }) => {
  useEffect(() => {
    const data = items.fact;
    const plan = items.planLast.norm;
    startChart("chart", data, plan);
  }, [items]);

  return <div className={classes.ChartView} id="chart"></div>;
};

export default ChartView;
