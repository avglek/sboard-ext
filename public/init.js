var initialState = {
  config: {
    divisions: "http://10.35.49.146:8080/orw_tablo/division_json2.php",
    menu: "http://10.35.49.146:8080/orw_tablo/load_menu.php",
    //pokaz: "./data/load_pred_pokaz_ruk.json",
    pokaz: "http://10.35.49.146:8080/orw_tablo/load_pred_pokaz.php?code_pred=",
    piket: "http://10.35.49.146:8080/orw_tablo/load_piket.php",
    prognoz: "http://10.35.49.146:8080/orw_tablo/load_prognoz.php?region=",
    storm_region:
      "http://10.35.49.146:8080/orw_tablo/load_storm_v2.php?region=",
    storm_all: "http://10.35.49.146:8080/orw_tablo/load_storm_v2.php",
    storm_uch: "http://10.35.49.146:8080/orw_tablo/load_storm_v2.php?map=",
    weather_region: "http://10.35.49.146:8080/apps/api/weather?reg=",
    bridges_pokaz: "http://10.35.49.146:8080/orw_tablo/load_artfeat.php?id=",
    snow_pokaz: "http://10.35.49.146:8080/apps/api/snowtech?code_map=",
    snow_tech: "http://10.35.49.146:8080/apps/api/snowtech/region?id=",
    port_dir: "http://10.35.49.146:8080/apps/api/ports/file",
    pipe: "http://10.35.49.146:8080/orw_tablo/load_isso_pipe.php?id_peregon=",
    pipe_count:
      "http://10.35.49.146:8080/orw_tablo/load_isso_pipe_count.php?region=",
    health: "http://10.35.49.146:8080/orw_tablo/load_fsk.php?id_map=",
    spec_vp: "http://10.35.49.146:8080/orw_tablo/load_vp.php?id_map=",
    spec_prp: "http://10.35.49.146:8080/orw_tablo/load_prp.php?region=",
  },

  wsocket: {
    endpoint: "http://localhost:4000",
  },

  main: {
    map: {
      url: "./svg/tablo.svg",
      img_leg: "./svg/legend.svg",
    },
    big_map: {
      url: "./svg/big_tablo.svg",
      img_leg: "./svg/big_legend.svg",
    },
  },

  regions: {
    nod1: {
      url: "./svg/moscow.svg",
      img_leg: "./svg/moscow_legend.svg",
      img_spec: "./svg/moscow_legend_table.svg",
      id: "1",
    },
    nod2: {
      url: "./svg/vit.svg",
      img_leg: "./svg/vit_legend.svg",
      img_spec: "./svg/vit_legend_table.svg",
      id: "2",
    },
    nod3: {
      url: "./svg/spb.svg",
      img_leg: "./svg/spb_legend.svg",
      img_spec: "./svg/spb_legend_table.svg",
      id: "3",
    },
    nod4: {
      url: "./svg/petrozavodsk.svg",
      img_leg: "./svg/petrozavodsk_legend.svg",
      img_spec: "./svg/petrozavodsk_legend_table.svg",
      id: "4",
    },
    nod5: {
      url: "./svg/murm.svg",
      img_leg: "./svg/murm_legend.svg",
      img_spec: "./svg/murm_legend_table.svg",
      id: "5",
    },
    nod6: {
      url: "./svg/volhov.svg",
      img_leg: "./svg/volhov_legend.svg",
      img_spec: "./svg/volhov_legend_table.svg",
      id: "6",
    },
    city: {
      url: "./svg/city.svg",
      img_leg: "./svg/city_legend.svg",
      id: "7",
    },
    go_volhov: {
      url: "./svg/volhov.svg",
      img_leg: "./svg/volhov_legend.svg",
      img_spec: "./svg/volhov_legend_table.svg",
      id: "6",
    },
    go_spb_vit: {
      url: "./svg/vit.svg",
      img_leg: "./svg/vit_legend.svg",
      img_spec: "./svg/vit_legend_table.svg",
      id: "2",
    },
    go_spb: {
      url: "./svg/spb.svg",
      img_leg: "./svg/spb_legend.svg",
      img_spec: "./svg/spb_legend_table.svg",
      id: "3",
    },
    go_petrozavodsk: {
      url: "./svg/petrozavodsk.svg",
      img_leg: "./svg/petrozavodsk_legend.svg",
      img_spec: "./svg/petrozavodsk_legend_table.svg",
      id: "4",
    },
    go_murm: {
      url: "./svg/murm.svg",
      img_leg: "./svg/murm_legend.svg",
      img_spec: "./svg/murm_legend_table.svg",
      id: "5",
    },
    go_moscow: {
      url: "./svg/moscow.svg",
      img_leg: "./svg/moscow_legend.svg",
      img_spec: "./svg/moscow_legend_table.svg",
      id: "1",
    },
    go_city: {
      url: "./svg/city.svg",
      img_leg: "./svg/city_legend.svg",
      id: "7",
    },
  },
  ports: {
    st_01840: {
      url: "./svg/murm_port.svg",
      file: "Мурманск!.xlsx",
      region: "5",
    },
    st_07630: {
      url: "./svg/ust-luga.svg",
      file: "Лужская !.xlsx",
      region: "2",
    },
    st_02060: {
      url: "./svg/vysotsk.svg",
      file: "Высоцк таблицы.xlsx",
      region: "3",
    },
    st_01490: {
      url: "./svg/kandalaksha.svg",
      file: "Кандалакша!.xlsx",
      region: "5",
    },
    st_03580: {
      url: "./svg/spb_port.svg",
      region: "2",
    },
    st_02000: {
      url: "./svg/Vyborg.svg",
      file: "Кандалакша!.xlsx",
      region: "3",
    },
  },
};

window.__INITIAL_STATE__ = initialState;
