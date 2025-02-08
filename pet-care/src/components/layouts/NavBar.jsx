import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const NavBar = () => {
  const userId = useParams();
  const isLoggedIn = localStorage.getItem("authToken");
  const userRoles = localStorage.getItem("userRoles") || [];
  return (
    <Navbar expand="lg" sticky="top" className="nav-bg">
      <Container>
        <Navbar.Brand to={"/"} as={Link} className="nav-home">
          유니 팻 케어
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={"/doctors"} as={Link}>
              수의사와의 만남
            </Nav.Link>
            <Nav.Link to={"/admin-dashboard"} as={Link}>
              관리자
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="계정" id="basic-nav-dropdown">
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item
                    to={`/user_dashboard/${userId}/my_dashboard`}
                    as={Link}
                  >
                    나의 대시보드
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item to={"/admin-dashboard"} as={Link}>
                    관리자 대시보드
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item to={"/logout"} as={Link}>
                    로그아웃
                  </NavDropdown.Item>
                </>
              ) : (
                <React.Fragment>
                  <NavDropdown.Item to={"/register-user"} as={Link}>
                    등록
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item to={"/login"} as={Link}>
                    로그인
                  </NavDropdown.Item>
                </React.Fragment>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
