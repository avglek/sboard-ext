import React from "react";
import classes from "./ModalEnterprises.module.css";
import { connect } from "react-redux";
import { MdCancel } from "react-icons/md";
import TabEnterprises from "./TabsEnterprises/TabEnterprises";
import { ModalIsOpen } from "../../store/actions/modalAction";

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isModalClose: () => dispatch(ModalIsOpen(false)),
  };
};

const ModalEnterprises = (props) => {
  return (
    <div
      className={classes.ModalEnterprises}
      style={{ visibility: props.isOpen ? "visible" : "hidden" }}
    >
      <div className={classes.tableBox}>
        <div className={classes.tableHead}>
          <div
            className={classes.btnClose}
            onClick={() => props.isModalClose()}
          >
            <MdCancel />
          </div>
        </div>
        <div className={classes.tableBody}>
          <TabEnterprises isShow={props.isOpen} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEnterprises);
