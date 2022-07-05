import React, { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
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
  Col,
  Button,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
// layout for this page
import Admin from '../../layouts/Admin';
// core components
import Header from '../../components/Headers/Header';
import { addMonitor } from '../../../services/webmonitor';

function WebmonitorForm() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    interval: 0,
    alerts: {
      selected: {
        email: true,
        whatsapp: false,
        telegram: false,
        sms: false,
      },
      data: [
        { name: 'Email', value: 'email', selected: false },
        { name: 'Whatsapp', value: 'whatsapp', selected: false },
        { name: 'Telegram', value: 'telegram', selected: false },
        { name: 'SMS', value: 'sms', selected: false },
      ],
    },
    note: '',
  });
  const { name, url, interval, alerts, note } = formData;
  const router = useRouter();

  const handleChange =
    (text: string, value?: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('value0', text);
      if (text === 'alerts') {
        console.log('value1', JSON.stringify(value));
        alerts.data.map((alert) => {
          console.log('value1.1', JSON.stringify(alert));
          console.log('value1.2', JSON.stringify(e.currentTarget.value));
          // if(alert.selected) {
          //   formData.alerts.selected.
          // }
        });
      } else {
        console.log('value2', JSON.stringify(e.target.value));
        setFormData({ ...formData, [text]: e.target.value });
      }
    };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name && url && interval > 0 && alerts.data.length > 0) {
      const response = await addMonitor(formData);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Add Monitor Success !!!');
        router.push('/admin/monitor');
      }
    } else {
      toast.info(
        'name: ' +
          name +
          '; url: ' +
          url +
          '; inteval: ' +
          interval +
          '; alert: ' +
          alerts
      );
      toast.error('Please fill all required fields');
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Add New Web Monitoring</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button color="primary" href="#home" onClick={handleSubmit}>
                  Save
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <h6 className="heading-small text-muted mb-4">
                Website information
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-name"
                      >
                        WebMonitor Name
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue=""
                        id="input-name"
                        placeholder="Input your web monitoring name. ex: My Site Monitor"
                        type="text"
                        onChange={handleChange('name')}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label className="form-control-label" htmlFor="input-url">
                        URL
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue=""
                        id="input-url"
                        placeholder="https://www.google.com"
                        type="url"
                        onChange={handleChange('url')}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-interval"
                      >
                        Interval
                      </label>
                      <Input
                        className="form-control"
                        id="input-interval"
                        defaultValue=""
                        type="select"
                        onChange={handleChange('interval')}
                      >
                        <option value={0}>- Select Interval -</option>
                        <option value={5}>5 Minutes</option>
                        <option value={10}>10 Minutes</option>
                        <option value={15}>15 Minutes</option>
                        <option value={30}>30 Minutes</option>
                        <option value={60}>1 Hours</option>
                        <option value={3 * 60}>3 Hours</option>
                        <option value={6 * 60}>6 Hours</option>
                        <option value={12 * 60}>12 Hours</option>
                        <option value={24 * 60}>1 Day</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <div className="custom-control custom-checkbox mb-3">
                      <Input
                        className="custom-control-input"
                        id="customCheck2"
                        type="checkbox"
                        checked={alerts.selected.email}
                        onChange={(event) => {
                          handleChange('alerts', event);
                        }}
                      />
                      <label className="custom-control-label">Email</label>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="custom-control custom-checkbox mb-3">
                      <Input
                        className="custom-control-input"
                        id="customCheck2"
                        type="checkbox"
                        checked={false}
                        onSelect={(event) => {
                          handleChange('alerts', event);
                        }}
                        onChange={(event) => {
                          handleChange('alerts', event);
                        }}
                      />
                      <label className="custom-control-label">Whatsapp</label>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-alerts"
                      >
                        WebMonitor Alerts
                      </label>
                      <Input
                        id="input-alerts"
                        multiple
                        className="form-control"
                        type="select"
                        // value={alerts.selected}
                        onSelect={(event) => {
                          handleChange('alerts', event);
                        }}
                        onSelectCapture={(event) => {
                          handleChange('alerts', event);
                        }}
                        onChange={(event) => {
                          handleChange('alerts', event);
                        }}
                        on
                      >
                        {alerts.data.map((alert) => (
                          <option value={alert.value} selected={alert.selected}>
                            {alert.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
              {/* Description */}
              <div className="pl-lg-4">
                <FormGroup>
                  <label>Notes</label>
                  <Input
                    id="input-note"
                    className="form-control-alternative"
                    placeholder="A few words about you ..."
                    rows="4"
                    defaultValue=""
                    type="textarea"
                    onChange={handleChange('note')}
                  />
                </FormGroup>
              </div>
            </Form>
          </CardBody>
          <CardFooter className="bg-white border-0">
            <Row className="align-items-center">
              <Col className="text-left" xs="4">
                <Button color="primary" href="#home" onClick={handleSubmit}>
                  Save
                </Button>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}

// WebmonitorForm.layout = Admin;
WebmonitorForm.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};

export default WebmonitorForm;
