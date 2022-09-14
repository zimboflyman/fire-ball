import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { StyledDropDownBtn } from "./Toolkit";
import { StyledH1 } from "./Toolkit";

const StyledContainer = styled.div`
  background: linear-gradient(120deg, rgb(26, 172, 204), rgb(96, 3, 139));
`;

const Header = ({ setApiUrl, setSeries }) => {
  const [ddLabel, setDdLabel] = useState("Select data api");
  const ddTitles = [
    ["Nasa Fireball data", 0],
    ["Flight data", 1],
  ];
  const apiArray = [
    ["https://ssd-api.jpl.nasa.gov/fireball.api", 0],
    ["https://echarts.apache.org/examples/data-gl/asset/data/flights.json", 1],
  ];

  const selectApi = (titleArr) => {
    console.log("titleArr :>> ", titleArr);
    setDdLabel(titleArr[0]);
    setApiUrl(apiArray[titleArr[1]]);
    console.log("apiArray :>> ", apiArray[titleArr[1]]);
    // if (titleArr[1] === 0) {
    //   setSeries("fireBalls");
    // } else {
    //   setSeries("airlines");
    // }
    setSeries("fireBalls");
  };

  return (
    <>
      <StyledContainer className=" w-100  d-flex align-items-stretch">
        <StyledH1 className="m-auto d-flex justify-content-center">
          Global flight patterns and comets
        </StyledH1>
        <Dropdown>
          <StyledDropDownBtn>{ddLabel}</StyledDropDownBtn>
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
      </StyledContainer>
    </>
  );
};

export default Header;
