export const layersGroupInit = [
  {
    title: "Подразделения",
    groupIndex: 1,
    data: [
      {
        layer: "pch",
        show: false,
        name: "Границы ПЧ",
        visible: "visible",
        disabled: false,
        id: 0,
      },
      {
        layer: "shch",
        show: false,
        name: "Границы ШЧ",
        visible: "visible",
        disabled: false,
        id: 1,
      },
      {
        layer: "vchd",
        show: false,
        name: "Границы ВЧД",
        visible: "visible",
        disabled: false,
        id: 2,
      },
      {
        layer: "ech",
        show: false,
        name: "Границы ЭЧ",
        visible: "visible",
        disabled: false,
        id: 3,
      },
      {
        layer: "dnc",
        show: false,
        name: "Диспетчерские участки",
        visible: "visible",
        disabled: false,
        id: 4,
      },
      {
        layer: "ngch",
        show: false,
        name: "НГЧ, дистанция гражданских сооружений",
        visible: "visible",
        disabled: false,
        id: 5,
      },
      {
        layer: "current",
        show: false,
        name: "Электрификация",
        visible: "visible",
        disabled: false,
        id: 6,
      },
    ],
  },
  {
    title: "Локомотивный комплекс",
    groupIndex: 2,
    data: [
      {
        layer: "loco",
        show: false,
        name: "Схема тягового обслуживания локомотивами (грузовые поезда)",
        visible: "visible",
        disabled: false,
        id: 7,
      },
      {
        layer: "loco_team dolb",
        show: false,
        name:
          "Схема тягового обслуживания локомотивными бригадами (грузовые поезда)",
        visible: "visible",
        disabled: false,
        id: 8,
      },
      {
        layer: "loco_pass",
        show: false,
        name: "Схема тягового обслуживания локомотивами (пассажирские поезда)",
        visible: "visible",
        disabled: false,
        id: 9,
      },
      {
        layer: "loco_team_pass",
        show: false,
        name:
          "Схема тягового обслуживания локомотивными бригадами (пассажирские поезда)",
        visible: "visible",
        disabled: false,
        id: 10,
      },
      {
        layer: "spec_trains",
        show: false,
        name: "Восстановительные и пожарные поезда",
        visible: "visible",
        disabled: false,
        id: 11,
      },
    ],
  },
  {
    title: "Тепло/водоснабжение",
    groupIndex: 3,
    data: [
      {
        layer: "dtv",
        show: false,
        name: "ДТВУ",
        visible: "visible",
        disabled: false,
        id: 12,
      },
    ],
  },
  {
    title: "Связь",
    groupIndex: 4,
    data: [
      {
        layer: "rcs",
        show: false,
        name: "Границы РЦС, поездная радиосвязь",
        visible: "visible",
        disabled: false,
        id: 13,
      },

      {
        layer: "mls",
        show: false,
        name: "Границы РЦС, линии связи",
        visible: "visible",
        disabled: false,
        id: 14,
      },
    ],
  },
  {
    title: "Погодные условия",
    groupIndex: 5,
    data: [
      {
        layer: "trains_distantions",
        show: true,
        name: "Штормовое предупреждение",
        visible: "visible",
        disabled: false,
        id: 15,
      },

      {
        layer: "snow_tech",
        show: false,
        name: "Снегоуборочная техника",
        visible: "visible",
        disabled: false,
        id: 16,
      },
      {
        layer: "weather_st",
        show: false,
        name: "Фактическая погода",
        visible: "visible",
        disabled: false,
        id: 17,
      },
    ],
  },
  {
    title: "Искусственные сооружения",
    groupIndex: 6,
    data: [
      {
        layer: "bridges",
        show: false,
        name: "мосты",
        visible: "visible",
        disabled: false,
        id: 18,
      },
      {
        layer: "tubes",
        show: false,
        name: "трубы ИССО",
        visible: "visible",
        disabled: false,
        id: 19,
      },
    ],
  },
  {
    title: "Здоровый образ жизни",
    groupIndex: 7,
    data: [
      {
        layer: "health_org",
        show: false,
        name: "Физкультурно-спортивные клубы",
        visible: "visible",
        disabled: false,
        id: 20,
      },
    ],
  },
];
