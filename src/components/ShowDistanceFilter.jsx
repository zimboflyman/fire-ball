import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { StyledDropDownBtn } from "./Toolkit";
import { getDistance } from "../utils/dataUtils";

export const ShowDistanceFilter = ({ setData, setSeries }) => {
  const apiData = JSON.parse(localStorage.getItem("apiData"));
  const [ddLabel, setDdLabel] = useState("Show long-haul flights");

  // filter apiData by distance between route endpoints and setData to trigger a new render
  const distanceFilter = (dist) => {
    const longHaulRouteData = apiData?.routes?.filter(
      (airline) =>
        getDistance(
          apiData.airports[airline[1]][3],
          apiData.airports[airline[1]][4],
          apiData.airports[airline[2]][3],
          apiData.airports[airline[2]][4],
          "N"
        ) > dist
    );

    apiData.routes.length = 0;
    apiData.routes.push.apply(apiData.routes, longHaulRouteData);

    setDdLabel(">  " + dist + ` miles`);
    // update data with filtered data and trigger re-render of the globe with new data
    setData(apiData);
    // set globe chart visual style
    setSeries("airlines");
  };

  const ddTitles = [
    ["longer than 2000 Miles", 2000],
    ["longer than 3000 Miles", 3000],
    ["longer than 4000 Miles", 4000],
    ["longer than 5000 Miles", 5000],
    ["longer than 6000 Miles", 6000],
  ];

  return (
    <div>
      <Dropdown>
        <StyledDropDownBtn value={ddLabel}>{ddLabel}</StyledDropDownBtn>
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

export default ShowDistanceFilter;
