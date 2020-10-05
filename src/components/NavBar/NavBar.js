import React, { useEffect } from "react";
import { connect } from "react-redux";

import NavButton from "./NavButton/NavButton";
import classes from "./NavBar.module.css";
import { navbarFetchData } from "../../store/actions/navbarActions";

const applicationInitialState = window.__INITIAL_STATE__;
const config = applicationInitialState.config;

// Замена наименования стиля с "bg-blue" на "bgBlue"
const translate = (name) => {
  const str = name.match(/-(\D)/);
  return name.replace(/-\D/, str[1].toUpperCase());
};

const mapStateToProps = (state) => {
  return {
    items: state.navbar.items,
    hasErrored: state.navbar.error,
    isLoading: state.navbar.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(navbarFetchData(url)),
  };
};

const NavBar = (props) => {
  useEffect(() => {
    props.fetchData(config.menu);
    // eslint-disable-next-line
  }, []);

  if (props.hasErrored) {
    console.log("Error:", props.hasErrored);
    return <div>Error</div>;
  }

  if (props.isLoading && props.items.length !== 0) {
    return <div>LOADING</div>;
  } else {
    const leftBox = props.items;

    leftBox.sort((a, b) => a.order_num - b.order_num);

    return (
      <div className={props.className + " " + classes.NavBar}>
        {leftBox.map((item, index) => {
          return (
            <NavButton
              key={index}
              styleButton={translate(item.style)}
              path={item.path}
              name={item.name}
            />
          );
        })}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
