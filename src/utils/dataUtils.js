const ROOT_PATH = "https://echarts.apache.org/examples";

export const getRoutes = (data) => {
  const getAirportCoord = (idx) => [
    data.airports[idx][3],
    data.airports[idx][4],
  ];
  //map the airport ID's to each route and get the co-ords
  const routes = data?.routes?.map((airline) => [
    getAirportCoord(airline[1]),
    getAirportCoord(airline[2]),
  ]);
  return routes;
};

export const getAirports = (data) => {
  const airports = data?.airports?.map((airports) => [
    airports[3],
    airports[4],
    airports[0],
  ]);

  return airports;
};

//https://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
function ConvertToDD(degrees, direction) {
  var dd = degrees;

  if (direction === "S" || direction === "W") {
    dd = dd * -1;
  } // do nothing for N or E
  return dd;
}

export const getFireBalls = (data) => {
  //map the airport ID's to each route and get the co-ords
  const locations = data?.map((item) => [
    ConvertToDD(item[3], item[4]),
    ConvertToDD(item[5], item[6]),
  ]);
  return locations;
};

// nicked from https://www.movable-type.co.uk/scripts/latlong.html
export const getDistance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

export const getChartOptions = (data, series) => {
  const routes = getRoutes(data);
  console.log("ROUTES::", routes);

  const airports = getAirports(data);
  console.log("airports:::", airports);

  const fireBalls = getFireBalls(data.data);
  console.log("fireBalls:::", fireBalls);

  const fireBallSeries = {
    type: "scatter3D",
    coordinateSystem: "globe",
    // blendMode: "lighter",
    symbolSize: 4,
    itemStyle: {
      color: "red",
      opacity: 0.7,
    },
    data: fireBalls,
  };

  const airportSeries = {
    type: "scatter3D",
    coordinateSystem: "globe",
    // blendMode: "lighter",
    symbolSize: 4,
    itemStyle: {
      color: "rgb(61, 190, 255)",
      opacity: 0.7,
    },
    data: airports,
  };

  const flightSeries = {
    type: "lines3D",
    coordinateSystem: "globe",
    effect: {
      show: true,
      trailWidth: 1,
      trailOpacity: 0.7,
      trailLength: 0.2,
      constantSpeed: 5,
    },
    blendMode: "lighter",
    lineStyle: {
      width: 2,
      color: "rgb(61, 190, 255)",
      //purple - rgb(73,15,239)
      //blue - rgb(61, 190, 255)
      //pink - rgb(255, 156, 181)
      //green - rgb(130, 240, 46)
      opacity: 0.1,
    },
    data: routes,
  };

  const getSeries = (series) => {
    switch (series) {
      case "airlines":
        return flightSeries;
      case "airports":
        return airportSeries;
      case "fireBalls":
        return fireBallSeries;
      default:
    }
  };

  const options = {
    backgroundColor: "#000",
    globe: {
      baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
      heightTexture:
        ROOT_PATH + "/data-gl/asset/bathymetry_bw_composite_4k.jpg",
      shading: "realistic",
      light: {
        ambient: {
          intensity: 0.4,
        },
        main: {
          intensity: 0.4,
        },
      },
      viewControl: {
        maxDistance: 1000,
        zoomSensitivity: 5,
        panSensitivity: 5,
        autoRotate: true,
        autoRotateSpeed: 5,
        autoRotateAfterStill: 5,
        damping: 0.85,
        rotateSensitivity: 2,
      },
      globeRadius: 90,
      postEffect: {
        bloom: true,
      },
    },
  };

  options.series = getSeries(series);

  return options;
};
