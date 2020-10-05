var initialState = {
  config: {
    divisions: "http://localhost:8080/orw_tablo/division_json2.php",
    menu: "./data/load_menu.json",
    pokaz: "http://localhost:8080/orw_tablo/load_pred_pokaz.php?code_pred=",
    piket: "http://localhost:8080/orw_tablo/load_piket.php",
  },

  main: {
    tablo: "./svg/tablo.svg",
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
};

window.__INITIAL_STATE__ = initialState;
