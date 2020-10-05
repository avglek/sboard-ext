import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MapBox from "./components/map/MapBox";
import ModalEnterprases from "./components/DisplayEnterprises/ModalEnterprises";
import Inform from "./components/inform/Inform";
import Drawer from "./components/SidePanel/Drawer/Drawer";
import MarqueeAlert from "./components/Marquee/MarqueeAlert";
import NavBar from "./components/NavBar/NavBar";

//import SimpleModal from './components/simpleModal/SimpleModal'

function App() {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };

  return (
    <div className="App">
      <div className="context"></div>
      <div className="stooltip"></div>
      <ModalEnterprases />
      <MarqueeAlert className="mq_box" />
      <MapBox className="main_box" />
      <NavBar className="left_box" />
      <Inform className="inform_box" />
      <Drawer isOpen={menu} onToggleHandle={toggleMenuHandler} />
    </div>
  );
}

export default App;
