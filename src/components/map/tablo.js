import * as d3 from "d3";
import Stantion from "./Stantion";
import Piket from "./Piket";

const applicationInitialState = window.__INITIAL_STATE__;
const config = applicationInitialState.config;
const regions = applicationInitialState.regions;
const mainmap = applicationInitialState.main;

let stantion = {};
let pikets = {};
let parentProps;

hideDivision();

d3.json(config.divisions).then((json) => {
  for (const t of json) {
    let key = t.ks.substr(0, 5);
    let stn = new Stantion(t.ks, t.ms, t.km, t.nodes);
    stantion[key] = stn;
  }
});

d3.json(config.piket).then((json) => {
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

function hideDivision() {
  d3.select("body").on("click", () => {
    d3.select(".context").style("visibility", "hidden");
  });
}

export function ShowLayer(layers) {
  //console.log("ShowLayer in param:", layers);
  if (Array.isArray(layers)) {
    layers.forEach((element) => {
      if (element.show) {
        element.layer.split(" ").forEach((text) => {
          const selectLayer = d3.selectAll("#" + text.trim());
          selectLayer.style("opacity", "1");
        });
      } else {
        element.layer.split(" ").forEach((text) => {
          const selectLayer = d3.selectAll("#" + text.trim());
          selectLayer.style("opacity", "0");
        });
      }
    });
  }
}

export function loadMapORW(fprops) {
  parentProps = fprops;
  parentProps.postLegend("./svg/legend.svg");

  d3.xml(mainmap.tablo).then((xml) => {
    let box = document.querySelector("#map");
    box.innerHTML = "";
    let svg = xml.documentElement;

    svg.setAttribute("preserveAspectRatio", "xMidYMin");
    box.appendChild(xml.documentElement);
    d3.selectAll("title").remove();

    eventDivisions();
    eventRegion();
    eventPiket();
  });
}

function loadRegions(url_reg) {
  parentProps.postRefreshLayer(false);
  d3.xml(url_reg).then((xml) => {
    let box = document.querySelector("#map");
    box.innerHTML = "";

    let svg = xml.documentElement;
    svg.setAttribute("preserveAspectRatio", "xMidYMin");
    box.appendChild(xml.documentElement);
    d3.selectAll("title").remove();
    parentProps.postRefreshLayer(true);

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
  });
}

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

    const prognozUrl = config.prognoz.toString() + item.id;
    parentProps.forecastFetchData(prognozUrl);

    loadRegions(item.url);
  }
}

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

    d3.select(".stooltip").html(txt);
    let x = parseInt(d3.event.pageX);
    let y = parseInt(d3.event.pageY);
    let h = d3.select(".stooltip").style("height");
    let dy = Number.parseInt(h.substr(0, h.length - 2)) + 15;

    if (y - (dy + 5) < 0) {
      d3.select(".stooltip").style("top", y + 15 + "px");
      d3.select(".stooltip").style("left", x + "px");
      d3.select(".stooltip").style("visibility", "visible");
    } else {
      d3.select(".stooltip").style("top", y - dy + "px");
      d3.select(".stooltip").style("left", x + "px");
      d3.select(".stooltip").style("visibility", "visible");
    }
  }
}

function st_mouseout() {
  d3.select(".stooltip").style("visibility", "hidden");
  d3.select(".stooltip").html("");
  d3.select(".stooltip").style("heigth", "");
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
  //let url = 'http://localhost:4000/users?id=' + this.id;
  let url = config.pokaz.toString() + this.id;

  parentProps.openModal(true);
  parentProps.fetchData(url);
}

function getCodeStn(element) {
  let el1 = d3.select(element.parentElement);

  let stn = el1.attr("id");
  return stn.substr(3, stn.length);
}

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
    //console.log("Load regions:", regions);
    let url = regions[node].url;
    if (typeof url !== undefined) {
      let img = regions[node].img_leg;
      parentProps.postLegend(img);
      parentProps.postSpec(
        regions[node].img_spec ? regions[node].img_spec : null
      );

      const prognozUrl = config.prognoz.toString() + regions[node].id;
      parentProps.forecastFetchData(prognozUrl);

      loadRegions(url);
    }
  } else {
    console.log("node: " + node + " url: " + regions[node]);
  }
}

function reg_mouseout() {
  d3.select(this).selectAll("rect").attr("fill-opacity", "0.35");
}

function reg_mousein() {
  let d = d3.select(this).selectAll("rect");
  d.attr("fill-opacity", "1");
}

function eventPiket() {
  const piketElements = d3.selectAll("#terms > *");
  piketElements
    .on("mouseenter", piketMouseIn)
    .on("mouseleave", piketMouseLeave)
    .on("click", piketClick);
}

function piketMouseLeave() {
  this.setAttribute("opacity", "0.4");
  d3.select(".stooltip").style("visibility", "hidden");
  d3.select(".stooltip").html("");
  d3.select(".stooltip").style("heigth", "");
}

function piketMouseIn() {
  this.setAttribute("opacity", "1");
  let code = getCodePiket(this);
  let obj = pikets[code];
  if (typeof obj != "undefined") {
    let txt = pikets[code].getParamsTxt();
    txt = txt.replace(/,/g, "<br>");

    d3.select(".stooltip").html(txt);

    let x = parseInt(d3.event.pageX);
    let y = parseInt(d3.event.pageY);
    let h = d3.select(".stooltip").style("height");
    let dy = Number.parseInt(h.substr(0, h.length - 2)) + 15;

    if (y - (dy + 5) < 0) {
      d3.select(".stooltip").style("top", y + 15 + "px");
      d3.select(".stooltip").style("left", x + "px");
      d3.select(".stooltip").style("visibility", "visible");
    } else {
      d3.select(".stooltip").style("top", y - dy + "px");
      d3.select(".stooltip").style("left", x + "px");
      d3.select(".stooltip").style("visibility", "visible");
    }
  }
}

function piketClick() {
  getCodePiket(this);
}

function getCodePiket(element) {
  let el1 = d3.select(element);
  let piket = el1.attr("id");
  return piket;
}
