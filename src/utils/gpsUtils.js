export function startLocation(callback) {
  let uid = null;
  if (navigator.geolocation) {
    uid = navigator.geolocation.watchPosition(
      (pos) => {
        callback(pos.coords.longitude, pos.coords.latitude);
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  return uid;
}

export function stopLocation(uid) {
  if (uid) {
    navigator.geolocation.clearWatch(uid);
  }
}

export function loadStorage() {
  let initStorage = {};
  const gpsLocal = localStorage.getItem("gps");

  if (gpsLocal) {
    initStorage = JSON.parse(gpsLocal);

    if (!initStorage.gpsName) {
      localStorage.removeItem("gps");

      initStorage.gpsImg = "./svg/icons/button/gps_off.svg";
      initStorage.gpsToggle = false;
      initStorage.gpsName = "gpsOff";

      const gpsRaw = JSON.stringify(initStorage);
      localStorage.setItem("gps", gpsRaw);
    }
  } else {
    initStorage.gpsImg = "./svg/icons/button/gps_off.svg";
    initStorage.gpsToggle = false;
    initStorage.gpsName = "gpsOff";
  }
  return initStorage;
}

export const isHttps = () => {
  const protocol = document.location.protocol;
  return protocol.includes("https");
};
