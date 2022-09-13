import styled from "styled-components";

const StyledContainer = styled.div`
  background: black;
  width: 100vw;
  height: 8vh;
`;

const Footer = ({ children }) => {
  return (
    <>
      <StyledContainer className=" w-100  d-flex justify-content-around flex-wrap">
        {children}
      </StyledContainer>
    </>
  );
};

export default Footer;
