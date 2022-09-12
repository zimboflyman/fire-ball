import Dropdown from "react-bootstrap/Dropdown";

export const GetAirlinefilter = ({ setData }) => {
  const apiData = JSON.parse(localStorage.getItem("apiData"));
  const { airlines } = apiData;

  // filter apiData by airline and setData to trigger a new render
  const airlineFilter = (index) => {
    const routeData = apiData?.routes?.filter(
      (airportId) => airportId[0] === index + 1
    );
    console.log("routeData", routeData);

    apiData.routes.length = 0;
    apiData.routes.push.apply(apiData.routes, routeData);

    setData(apiData);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          select Airline
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {airlines.map((arr, index) => (
            <Dropdown.Item key={arr[0]} onClick={() => airlineFilter(index)}>
              {arr[0]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

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
  //   const airports = data?.airports?.map((airline) => [airline]);
  const airports = data?.airports?.map((airports) => [
    airports[3],
    airports[4],
  ]);

  return airports;
};

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
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

export const GetDistanceFilter = ({ setData }) => {
  const apiData = JSON.parse(localStorage.getItem("apiData"));

  // filter apiData by distance between route endpoints and setData to trigger a new render
  const distanceFilter = (dist) => {
    const longHaulRouteData = apiData?.routes?.filter(
      (airline) =>
        // console.log(
        //   "route inside filter funct",
        //   getDistance(route[0][0], route[0][1], route[1][0], route[1][1], "N")
        // )

        getDistance(
          apiData.airports[airline[1][3]],
          apiData.airports[airline[1][4]],
          apiData.airports[airline[2][3]],
          apiData.airports[airline[2][4]],
          "N"
        ) > dist
    );
    console.log("longHaulRouteData", longHaulRouteData);
    //
    // apiData.routes.length = 0;
    // apiData.routes.push.apply(apiData.routes, longHaulRouteData);

    setData(apiData);
  };

  const ddTitles = [
    ["longer than 1000 Miles", 1000],
    ["longer than 2000 Miles", 5500],
  ];

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          show longHaul flights
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {ddTitles.map((arr, index) => (
            <Dropdown.Item key={arr[0]} onClick={() => distanceFilter(arr[1])}>
              {arr[0]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
