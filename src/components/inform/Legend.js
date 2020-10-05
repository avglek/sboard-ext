import React from "react";
import { connect } from "react-redux";

const Legend = (props) => {
  return (
    <div className={props.className}>
      <img src={props.legendKey} alt="legend" width="100%" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    legendKey: state.inform.legend,
  };
};

export default connect(mapStateToProps, null)(Legend);
