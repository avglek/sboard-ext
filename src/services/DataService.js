import { parsePeriodToString } from "../utils/common";

const applicationInitialState = window.__INITIAL_STATE__;
const config = applicationInitialState.config;

class DataService {
  getDivisions() {
    return this.getResurce(config.divisions);
  }

  getMenu() {
    return this.getResurce(config.menu);
  }

  getPokaz(id) {
    return this.getResurce(`${config.pokaz}${id}`);
  }

  async getStormPokaz(id) {
    const data = await this.getResurce(`${config.storm_uch}${id}`);
    const informItems = data[0].data[0].data;
    const actions = data[0].data[0].action;
    const nameTrain = {
      name: data[0].data[0].name_trainuch,
      value: "",
    };

    let info = [];

    informItems.forEach((item) => {
      const value = parsePeriodToString(item.period);

      const result = item.event.map((item) => {
        return {
          name: item.name_event,
          value: value,
        };
      });

      info = [...info, ...result];
    });

    const replaseItem = (item) => {
      const arr = item.split(";");
      return arr.join("\n");
    };

    let arrPokaz = [];

    if (actions) {
      arrPokaz = actions.map((item) => {
        return {
          header: item.name_sluzhba,
          title: {
            c_name: "Мероприятия для формирования оперативного приказа",
          },
          data: item.data.map((item) => ({ c_name: replaseItem(item) })),
        };
      });
    }

    const objPokaz = { ...arrPokaz };

    const result = {
      info: [nameTrain, ...info],
      ...objPokaz,
    };

    return result;
  }

  async getStormAll() {
    const data = await this.getResurce(config.storm_all);

    const result = data.map((item) => {
      //   const firstUch = item.data.filter((item) => {
      //     const num = item.map.charAt(2);
      //     return num === "1";
      //   });

      const res = {
        id: item.region,
        //hits: firstUch.length > 0 ? firstUch[0].data : [],
        hits: [],
      };
      return res;
    });

    return result;
  }

  async getStormRegion(id) {
    const data = await this.getResurce(`${config.storm_region}${id}`);

    if (data.length > 0) {
      const dataTrains = data[0].data.map((item) => {
        const arr = item.data.map((ev) => {
          return {
            period: ev.period,
            data: ev.data,
          };
        });

        return {
          id: item.map,
          hits: arr,
        };
      });
      return dataTrains;
    } else {
      return [];
    }
  }

  getStormActions(id) {
    const data = this.getResurce(config.storm_uch);
    //  console.log(id, data);
    return data;
  }

  getPiket() {
    return this.getResurce(config.piket);
  }

  getPrognoz(id) {
    return this.getResurce(`${config.prognoz}${id}`);
  }

  async getResurce(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Cloud not fetch ${url}, received ${response.status}`);
    } else {
      return await response.json();
    }
  }
}

export default DataService;
