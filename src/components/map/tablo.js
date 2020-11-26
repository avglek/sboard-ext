import * as d3 from "d3";
//import socketIOClient from "socket.io-client";
import Stantion from "./Stantion";
import Piket from "./Piket";
import DataService from "../../services/DataService";
import {
  showToolTip,
  hiddenTootTip,
  getCodeStn,
  getCodePiket,
} from "../../utils/tabloUtils";

const applicationInitialState = window.__INITIAL_STATE__;
const regions = applicationInitialState.regions;
//const mainmap = applicationInitialState.main;
//const wsocket = applicationInitialState.wsocket;

let stantion = {};
let pikets = {};
let parentProps;

hideDivision();

const dataService = new DataService();
//const socket = socketIOClient(wsocket.endpoint);

dataService.getDivisions().then((json) => {
  for (const t of json) {
    let key = t.ks.substr(0, 5);
    let stn = new Stantion(t.ks, t.ms, t.km, t.nodes);
    stantion[key] = stn;
  }
});

dataService.getPiket().then((json) => {
  for (const t of json.data) {
    let code = t.code;
    let id_piket = t.id_piket;
    const params = [];
    params.push(t.param1);
    params.push(t.param2);
    params.push(t.param3);

    let piket = new Piket(code, id_piket, params);
    pikets[id_piket] = piket;
  }
});

export function ShowLayer(layers) {
  if (Array.isArray(layers)) {
    layers.forEach((element) => {
      if (element.show) {
        element.layer.split(" ").forEach((text) => {
          const selectLayer = d3.selectAll("#" + text.trim());
          selectLayer.attr("opacity", "1");
        });
      } else {
        element.layer.split(" ").forEach((text) => {
          const selectLayer = d3.selectAll("#" + text.trim());
          selectLayer.attr("opacity", "0");
        });
      }
    });
  }
}

export function loadMapORW(fprops) {
  parentProps = fprops;
  const mainUrl = parentProps.tabloUrl || "./svg/tablo.svg";
  const legendURL = parentProps.tabloLegend || "./svg/legend.svg";

  parentProps.postLegend(legendURL);

  d3.xml(mainUrl).then((xml) => {
    let box = document.querySelector("#map");
    box.innerHTML = "";
    let svg = xml.documentElement;

    svg.setAttribute("preserveAspectRatio", "xMidYMin");
    box.appendChild(xml.documentElement);
    d3.selectAll("title").remove();

    parentProps.postStorm(0, clickStormFromORW);

    eventDivisions();
    eventRegion();
    eventPiket();
  });
}

function clickStormFromORW(uid) {
  const selectRegion = `nod${uid}`;
  const url = regions[selectRegion].url;

  if (typeof url !== undefined) {
    let img = regions[selectRegion].img_leg;
    parentProps.postLegend(img);
    parentProps.postSpec(
      regions[selectRegion].img_spec ? regions[selectRegion].img_spec : null
    );

    parentProps.forecastFetchData(regions[selectRegion].id);
    parentProps.forecastOpen();

    loadRegions(url, regions[selectRegion].id);
  }
}

function loadRegions(url_reg, idRegion) {
  d3.xml(url_reg).then((xml) => {
    let box = document.querySelector("#map");
    box.innerHTML = "";

    let svg = xml.documentElement;
    svg.setAttribute("preserveAspectRatio", "xMidYMin");
    box.appendChild(xml.documentElement);
    d3.selectAll("title").remove();

    parentProps.postStorm(idRegion, clickStormFromRegion);

    let close_btn = d3.select("#close_button");
    close_btn
      .on("click", () => {
        parentProps.postSpec(null);
        parentProps.forecastClose();

        loadMapORW(parentProps);
      })
      .on("mouseenter", () => close_btn.attr("opacity", "0.98"))
      .on("mouseleave", () => close_btn.attr("opacity", "0.595982143"));

    go_region();
    eventDivisions();
    eventPiket();
    //addToolTip("#train_fire");
  });
}

function clickStormFromRegion(uid) {
  parentProps.openModal(true);
  parentProps.fetchStormData(uid);
}

//=========== Region ======

function eventRegion() {
  const regions = d3.select("#buttons").selectAll("g");

  regions
    .on("mouseenter", reg_mousein)
    .on("mouseleave", reg_mouseout)
    .on("click", reg_click);
}

function reg_click() {
  let node = d3.select(this).attr("id");

  if (node != null) {
    let url = regions[node].url;
    if (typeof url !== undefined) {
      let img = regions[node].img_leg;
      parentProps.postLegend(img);
      parentProps.postSpec(
        regions[node].img_spec ? regions[node].img_spec : null
      );

      // const prognozUrl = config.prognoz.toString() + regions[node].id;
      // parentProps.forecastFetchData(prognozUrl);
      parentProps.forecastFetchData(regions[node].id);
      parentProps.forecastOpen();
      //parentProps.postStormIconsFetch(regions[node].id);
      loadRegions(url, regions[node].id);
    }
  }
}

function reg_mouseout() {
  d3.select(this).selectAll("rect").attr("fill-opacity", "0.35");
}

function reg_mousein() {
  let d = d3.select(this).selectAll("rect");
  d.attr("fill-opacity", "1");
}

//========== go Regions ==========

function go_region() {
  const go_regions = d3.select("#go_region").selectAll("*");

  go_regions
    .on("mouseenter", go_reg_mousein)
    .on("mouseleave", go_reg_mouseout)
    .on("click", go_reg_click);
}

function go_reg_mousein() {
  const reg = d3.select(this);
  reg.style("opacity", "0.58");
}
function go_reg_mouseout() {
  const reg = d3.select(this);
  reg.style("opacity", "1");
}
function go_reg_click() {
  const reg = d3.select(this);

  let reg_id = reg.attr("id");
  let item = regions[reg_id];

  if (typeof item !== "undefined") {
    parentProps.postLegend(item.img_leg);
    parentProps.postSpec(item.img_spec ? item.img_spec : null);

    // const prognozUrl = config.prognoz.toString() + item.id;
    // parentProps.forecastFetchData(prognozUrl);
    parentProps.forecastFetchData(item.id);
    parentProps.forecastOpen();

    loadRegions(item.url, item.id);
  }
}

//============= Stantions =======

function eventDivisions() {
  const stansions = d3.selectAll("#st");

  stansions
    .on("mouseenter", st_mousein)
    .on("mouseleave", st_mouseout)
    .on("click", st_click);
}

function st_mousein() {
  let code = getCodeStn(this);

  let obj = stantion[code];
  if (typeof obj != "undefined") {
    let txt = stantion[code].getNodesTxt();
    txt = txt.replace(/,/g, "<br>");
    let km = stantion[code].getKMtxt();
    if (km) {
      txt = txt + " <br> <hr>  " + km;
    }

    showToolTip(txt);
  }
}

function st_mouseout() {
  hiddenTootTip();
}

function st_click() {
  d3.select(".context").selectAll("div").remove();

  d3.select(".stooltip").style("visibility", "hidden");

  let code = getCodeStn(this);
  let obj = stantion[code];
  if (typeof obj != "undefined") {
    const context = d3.select(".context");

    for (const item of obj.nodes) {
      context
        .append("div")
        .attr("id", item.id)
        .attr("class", "node bgcolor")
        .text(item.name)
        .on("click", node_click);
    }

    let x = d3.event.pageX;
    let y = d3.event.pageY;
    let h = d3.select(".context").style("height");
    let w = d3.select(".context").style("width");
    let dy = Number.parseInt(h.substr(0, h.length - 2)) + 10;
    let dx = Number.parseInt(w.substr(0, w.length - 2)) + 10;

    if (y - dy < 0) {
      d3.select(".context").style("top", y - 10 + "px");
      d3.select(".context").style("left", x - dx + "px");
      d3.select(".context").style("visibility", "visible");
    } else {
      d3.select(".context").style("top", y - dy + "px");
      d3.select(".context").style("left", x - dx + "px");
      d3.select(".context").style("visibility", "visible");
    }

    d3.event.stopPropagation();
  }
}

function node_click() {
  parentProps.openModal(true);
  parentProps.fetchData(this.id);
}

function hideDivision() {
  d3.select("body").on("click", () => {
    d3.select(".context").style("visibility", "hidden");
  });
}

//============= Piket =======
function eventPiket() {
  const piketElements = d3.selectAll("#terms > *");
  piketElements
    .on("mouseenter", piketMouseIn)
    .on("mouseleave", piketMouseLeave)
    .on("click", piketClick);
}

function piketMouseLeave() {
  this.setAttribute("opacity", "0.4");
  hiddenTootTip();
  // d3.select(".stooltip").style("visibility", "hidden");
  // d3.select(".stooltip").html("");
  // d3.select(".stooltip").style("heigth", "");
}

function piketMouseIn() {
  this.setAttribute("opacity", "1");
  let code = getCodePiket(this);
  let obj = pikets[code];
  if (typeof obj != "undefined") {
    let txt = pikets[code].getParamsTxt();
    txt = txt.replace(/,/g, "<br>");

    showToolTip(txt);
  }
}

function piketClick() {
  getCodePiket(this);
}