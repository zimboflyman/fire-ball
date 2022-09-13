import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { StyledDropDownBtn } from "./Toolkit";

export const ShowAirlinefilter = ({ setData, setSeries }) => {
  const apiData = JSON.parse(localStorage.getItem("apiData"));
  const { airlines } = apiData;
  const [airlineName, setAirlineName] = useState("Select airline");

  // filter apiData by airline and setData to trigger a new render
  const airlineFilter = (index, airline) => {
    const routeData = apiData?.routes?.filter(
      (airportId) => airportId[0] === index + 1
    );

    apiData.routes.length = 0;
    apiData.routes.push.apply(apiData.routes, routeData);

    setAirlineName(airline);
    setData(apiData);
    setSeries("airlines");
  };

  return (
    <div>
      <Dropdown>
        <StyledDropDownBtn value={airlineName}>{airlineName}</StyledDropDownBtn>

        <Dropdown.Menu>
          {airlines.map((arr, index) => (
            <Dropdown.Item
              key={arr[0]}
              onClick={() => airlineFilter(index, arr[0])}
            >
              {arr[0]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ShowAirlinefilter;
