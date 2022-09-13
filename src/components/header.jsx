import styled from "styled-components";

import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar variant="dark">
        <Container>
          <div>
            <Navbar.Brand href="#/">
              {/* <MobileLogo
                className="img-responsive"
                src={`${config.overRideFolder}/logo.svg`}
                alt="logo"
              /> */}
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto align-items-center">
              {/* {pageName == 'intro' || pageName == 'submit' || hideRestart || (
                <Nav.Link onClick={() => handleShow()}>
                  <StyledIconRestartLink icon={faRedo} size="sm" />

                  {t('restart')}
                </Nav.Link>
              )}
              {RenderTranslationMenu()} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default styled(Header)`
  &.navbar {
    background: linear-gradient(
      120deg,
      rgb(26, 172, 204) 13.57%,
      rgb(96, 3, 139) 98.38%
    );
    min-height: 66px;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    padding: 0;
  }

  .navbar-brand > img {
    padding: 0;
    max-height: 55px;
  }

  &.navbar-dark .navbar-nav .nav-link {
    color: background-color: rgb(37, 42, 100);
  }
`;
