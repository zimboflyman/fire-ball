import styled from "styled-components";
import { StyledH1 } from "./Toolkit";

const StyledContainer = styled.div`
  background: linear-gradient(120deg, rgb(26, 172, 204), rgb(96, 3, 139));
`;

const Header = () => {
  return (
    <>
      <StyledContainer className=" w-100  d-flex align-items-stretch">
        <StyledH1 className="m-auto d-flex justify-content-center">
          Global flight patterns
        </StyledH1>
      </StyledContainer>
    </>
  );
};

export default Header;
