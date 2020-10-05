export default class Stantion {
  constructor(ks, ms, km, nodes) {
    this.ks = ks;
    this.ms = ms;
    this.km = km;
    this.nodes = nodes;
  }

  getNodesTxt() {
    let txt = "";
    for (const item of this.nodes) {
      txt += item.name + ",";
    }
    txt = txt.substr(0, txt.length - 1);
    return txt;
  }

  getKMtxt() {
    if (this.km) {
      return this.km.length > 0 ? `${this.km}` : null;
    } else {
      return null;
    }
  }
}
