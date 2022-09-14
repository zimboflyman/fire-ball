import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { HeaderContainer, StyledH1, HeaderDropDownBtn } from "./Toolkit";

const Header = ({ setApiUrl, setSeries }) => {
  const [ddLabel, setDdLabel] = useState("Select data api");
  const ddTitles = [
    ["Nasa Fireball data", 0],
    ["Flight data", 1],
  ];
  // get the api data from either Nasa or gl-charts flight sample
  const apiArray = [
    ["https://ssd-api.jpl.nasa.gov/fireball.api", 0],
    ["https://echarts.apache.org/examples/data-gl/asset/data/flights.json", 1],
  ];

  const selectApi = (titleArr) => {
    console.log("titleArr :>> ", titleArr);
    // update the dropdown title with selected item
    setDdLabel(titleArr[0]);
    // set the api Url and trigger a refetch of api data
    setApiUrl(apiArray[titleArr[1]]);
    console.log("apiArray :>> ", apiArray[titleArr[1]]);

    // make sure the re-rendered globe is using the correct visual style
    if (titleArr[1] === 0) {
      setSeries("fireBalls");
    } else {
      setSeries("airlines");
    }
  };

  return (
    <>
      <HeaderContainer className="p-1 d-flex align-items-stretch">
        <StyledH1 className="m-auto d-flex justify-content-center">
          Global flight patterns and comets (fireBalls)
        </StyledH1>
        <Dropdown className="d-flex">
          <HeaderDropDownBtn>{ddLabel}</HeaderDropDownBtn>
          <Dropdown.Menu>
            {ddTitles.map((titleArr, index) => (
              <Dropdown.Item
                key={titleArr[1]}
                onClick={() => selectApi(titleArr)}
              >
                {titleArr[0]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </HeaderContainer>
    </>
  );
};

export default Header;
