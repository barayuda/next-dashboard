import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useRouter } from 'next/router';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';
import { loadProfile } from '../../../services/user';

function FrontNavbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    avatar: '',
  });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // const jwtToken = atob(token);
      // if (jwtToken !== 'undefined') {
      //   const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      //   const userFromPayload: UserTypes = payload.user;
      //   setIsLogin(true);
      //   setUser(userFromPayload);
      // }
      const payload: JWTPayloadTypes = jwtDecode(token);

      loadProfileData(payload._id);
    }
  }, []);

  const loadProfileData = async (id: string) => {
    await loadProfile(id);
  };

  const onLogout = () => {
    localStorage.removeItem('user-form');
    Cookies.remove('token');
    router.push('/');
    setIsLogin(false);
  };

  if (isLogin) {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark bg-gradient-info "
          expand="md"
        >
          <Container className="px-4">
            <Link href="/admin/dashboard" passHref>
              <span>
                <NavbarBrand href="#home">
                  <img alt="..." src="/img/brand/logo-bankmega-h144.png" />
                </NavbarBrand>
              </span>
            </Link>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link href="/admin/dashboard" passHref>
                      <img alt="..." src="/img/brand/logo-bankmega-h144.png" />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link href="/admin/dashboard" passHref>
                    <NavLink href="#home" className="nav-link-icon">
                      <i className="ni ni-planet" />
                      <span className="nav-link-inner--text">Dashboard</span>
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/simulator" passHref>
                    <NavLink href="#home" className="nav-link-icon">
                      <i className="ni ni-planet" />
                      <span className="nav-link-inner--text">Simulator</span>
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/admin/profile" passHref>
                    <NavLink href="#home" className="nav-link-icon">
                      <i className="ni ni-single-02" />
                      <span className="nav-link-inner--text">Profile</span>
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/" passHref>
                    <NavLink
                      href="#home"
                      className="nav-link-icon"
                      onClick={onLogout}
                    >
                      <i className="ni ni-key-25" />
                      <span className="nav-link-inner--text">Logout</span>
                    </NavLink>
                  </Link>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark bg-gradient-info "
        expand="md"
      >
        <Container className="px-4">
          <Link href="/admin/dashboard" passHref>
            <span>
              <NavbarBrand href="#home">
                <img alt="..." src="/img/brand/logo-bankmega-h144.png" />
              </NavbarBrand>
            </span>
          </Link>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link href="/admin/dashboard" passHref>
                    <img alt="..." src="/img/brand/logo-bankmega-h144.png" />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/admin/dashboard" passHref>
                  <NavLink href="#home" className="nav-link-icon">
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/simulator" passHref>
                  <NavLink href="#home" className="nav-link-icon">
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">Simulator</span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/auth/register" passHref>
                  <NavLink href="#home" className="nav-link-icon">
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/auth/login" passHref>
                  <NavLink href="#home" className="nav-link-icon">
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default FrontNavbar;
