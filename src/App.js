import React, { useState } from "react";
import { VERSION } from "./config/version";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MapConteiner from "./components/map/MapConteiner";
import Inform from "./components/inform/Inform";
import Drawer from "./components/SidePanel/Drawer/Drawer";
import MarqueeAlert from "./components/Marquee/MarqueeAlert";
import NavBar from "./components/NavBar/NavBar";
import TabEnterprises from "./components/TabsEnterprises/TabEnterprises";
import WeatherUI from "./components/WeatherUI/WeatherUI";

//import SimpleModal from './components/simpleModal/SimpleModal'

function App() {
  console.log(`Версия ${VERSION}`);
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };

  return (
    <div className="App">
      <div className="context"></div>
      <div className="stooltip"></div>
      <WeatherUI />
      <TabEnterprises />
      <MarqueeAlert className="mq_box" />
      <MapConteiner className="main_box" />
      <NavBar className="left_box" />
      <Inform className="inform_box" />
      <Drawer isOpen={menu} onToggleHandle={toggleMenuHandler} />
    </div>
  );
}

export default App;
