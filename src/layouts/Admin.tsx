/* eslint-disable no-plusplus */
import React, { RefObject } from 'react';
import { useRouter } from 'next/router';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';
import Sidebar from '../components/Sidebar/Sidebar';
// import SidebarNew from '../components/Sidebar/SidebarNew';

import routes from '../../variables/routes';

interface AdminProps {
  children: object;
}

function Admin(props: AdminProps) {
  // used for checking current route
  const router = useRouter();
  let mainContentRef = React.createRef() as RefObject<HTMLDivElement>;
  /* React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContentRef.current.scrollTop = 0;
	}, []); */
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      // console.log(routes[i].name);
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: '/img/brand/logo-bankmega-h144.png',
          imgAlt: '...',
          outterLink: '/admin/index',
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
}

export default Admin;
