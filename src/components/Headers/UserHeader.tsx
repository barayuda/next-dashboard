import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

function UserHeader() {
  const [user, setUser] = useState({
    avatar: '/img/theme/team-1-800x800.jpg',
    name: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      if (jwtToken !== 'undefined') {
        const payload: JWTPayloadTypes = jwtDecode(jwtToken);
        const userFromPayload: UserTypes = payload.user;
        setUser(userFromPayload);
      }
    }
  }, []);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: '600px',
          backgroundImage: 'url("/img/theme/profile-cover.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {user.name}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Button
                color="info"
                href="#home"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserHeader;
