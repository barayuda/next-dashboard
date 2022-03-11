import React, { ReactElement, useEffect, useState } from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
import axios from 'axios';
// javascipt plugin for creating charts
// import Chart from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  // Legend,
} from 'chart.js';
// react plugin used to create charts
// import { Line, Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
// layout for this page
import Admin from '../../layouts/Admin';
// core components
/* import {
	chartOptions,
	parseOptions,
	chartExample1,
	chartExample2,
} from '../../../variables/charts'; */

import Header from '../../components/Headers/Header';

// declare const window: Window &
// 	typeof globalThis & {
// 		Chart: object;
// 	};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip
  // Legend
);

export const lineOptions = {
  responsive: true,
  plugins: {
    // legend: {
    // 	position: 'top' as const,
    // },
    title: {
      display: true,
      text: 'Line Chart: Error Counter',
    },
  },
};

const lineLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
];

export const lineDataDefault = {
  labels: lineLabels,
  datasets: [
    {
      label: 'Dataset Performance',
      data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    // 	label: 'Dataset Error',
    // 	data: [0, 20, 5, 25, 10, 30, 15, 40, 40],
    // 	borderColor: 'rgb(53, 162, 235)',
    // 	backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

const Dashboard = () => {
  const [activeNav, setActiveNav] = React.useState(1);
  const [lineData, setLineData] = useState(lineDataDefault);
  const [totalNotify, setTotalNotify] = useState(0);

  // if (window.Chart) {
  // 	parseOptions(Chart, chartOptions());
  // }

  const toggleNavs = (e: any, index: any) => {
    e.preventDefault();
    setActiveNav(index);
  };

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const ROOT_API = process.env.NEXT_PUBLIC_API;
      const API_VERSION = 'api/v1';
      const url = `${ROOT_API}/${API_VERSION}/monitoring/lineday`;
      const result = await axios(url);
      // console.log('result', result);
      // console.log('data', result.data.data);
      let monitoring = result?.data?.data[0]?.monitoring ?? [];
      // console.log('monitoring', monitoring);
      // console.log('totalNotify', result.data.count);
      setTotalNotify(parseInt(result?.data?.count));

      let labels = [] as any;
      let data = [] as any;

      monitoring.map((items: []) => {
        items.map((item: {}) => {
          for (const [key, value] of Object.entries(item)) {
            // console.log('key', key, 'value', value);
            if (key === 'date') {
              labels.push(value);
            } else {
              data.push(value);
            }
          }
        });
      });
      setLineData({
        labels: labels,
        datasets: [
          {
            label: 'Dataset Error',
            data: data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    })();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 1,
                          })}
                          href="#home"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#home"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pb-8">
                {/* Chart */}
                <div className="chart">
                  {/* <Line
										data={chartExample1[chartExample1Data]}
										options={chartExample1.options}
										getDatasetAtEvent={(e: any) => console.log(e)}
									/> */}
                  <Line options={lineOptions} data={lineData} />
                  {/* <Line options={lineOptions} data={chartData} /> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {/* <Bar
										data={chartExample2.data}
										options={chartExample2.options}
									/> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#home"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{' '}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{' '}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{' '}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#home"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Admin>{page}</Admin>;
};

export default Dashboard;
