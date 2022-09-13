import styled from "styled-components";
import { lighten } from "polished";

const Button = styled.button`
  color: rgba(255, 255, 255, 0.8);
  background-color: rgb(37, 42, 100);
  padding: 1.4em 1.5em;
  min-width: 215px;
  border-radius: 14px;
  border: solid 1px rgb(25, 92, 136);
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  line-height: 1;
  justify-content: center;

  @media screen and (min-width: 576px) {
    padding: 1.2em 2em;
  }

  &:hover {
    background-color: ${lighten("0.2", "rgb(37, 42, 100)")} !important;
    color: rgba(255, 255, 255);
  }
`;

export default Button;
