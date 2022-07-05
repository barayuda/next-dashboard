import React, { ReactElement } from 'react';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
// layout for this page
import Admin from '../../layouts/Admin';
// core components
import Header from '../../components/Headers/Header';
import ApiTable from '../../components/WebMonitorContent/ApiTable';

function MonitoringUptime() {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col mb-5">
            <ApiTable />
          </div>
        </Row>
      </Container>
    </>
  );
}

// MonitoringUptime.layout = Admin;
MonitoringUptime.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};

export default MonitoringUptime;
