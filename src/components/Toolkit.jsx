import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { lighten } from "polished";

export const StyledDropDownBtn = styled(Dropdown.Toggle)`
  color: rgba(255, 255, 255, 0.8);
  background-color: rgb(37, 42, 100);
  padding: 1em;
  min-width: 150px;
  border-radius: 14px;
  border: solid 1px rgb(26, 172, 204, 0.8);
  font-size: 0.75em;
  font-weight: 600;
  cursor: pointer;
  line-height: 1;
  justify-content: center;
  margin-bottom: 0.5em;
  margin-right: 0.3em;

  @media screen and (min-width: 576px) {
    padding: 1em;
    font-size: 1em;
    min-width: 200px;
  }

  &:hover {
    background-color: ${lighten("0.2", "rgb(37, 42, 100)")} !important;
    color: rgba(255, 255, 255);
  }
`;

export const StyledH1 = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: rgb(255, 255, 255, 0.8);
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;
