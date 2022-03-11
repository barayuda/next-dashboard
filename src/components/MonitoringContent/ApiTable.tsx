import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import GlobalFilter from './GlobalFilter';
import JsonPretty from './JsonPretty';

type Data = {
  _id: string;
  logId?: string;
  appIP?: string;
  appName?: string;
  merchantId?: string;
  requestData?: number;
  responseData?: string;
  statusHttp?: number;
  status?: string;
  trxAmount?: string;
  trxTimestamp?: string;
  createdAt?: string;
  updatedAt?: string;
  view: React.ReactNode;
};

export default function ApiTable() {
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: 'Application',
        // First group columns
        columns: [
          {
            Header: 'Log_ID',
            accessor: 'logId', // accessor is the "key" in the data
            sortType: 'basic',
            disableSortBy: true,
            Cell: (props: any, cell: any) =>
              cell && (
                <Button
                  variant="primary"
                  onClick={() => handleClick(props.row.original)}
                  size="sm"
                >
                  {props.value}
                </Button>
              ),
          },
          {
            Header: 'App_IP',
            accessor: 'appIP',
          },
          {
            Header: 'App_Name',
            accessor: 'appName',
          },
        ],
      },
      {
        // Second group - Details
        Header: 'Details',
        // Second group columns
        columns: [
          {
            Header: 'Status_Http',
            accessor: 'statusHttp',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Trx_Amount',
            accessor: 'trxAmount',
          },
          {
            Header: 'Trx_Timestamp',
            accessor: 'trxTimestamp',
          },
          {
            Header: 'Merchant',
            accessor: 'merchantId',
          },
          {
            Header: 'Created_At',
            accessor: 'createdAt',
          },
          {
            Header: 'Updated_At',
            accessor: 'updatedAt',
          },
        ],
      },
    ],
    []
  );

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    // rows, // rows for the table based on the data passed
    page, // Instead of using 'rows', we'll use page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: true,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  // PopUp
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // const [autoRefresh, setAutoRefresh] = useState(false);
  // const handleAutoRefresh = () => {};
  // const [radioValue, setRadioValue] = useState('3');

  // const radios = [
  // 	{ name: 'Manual Refresh', value: '0' },
  // 	{ name: 'Auto Refresh', value: '1' },
  // ];

  const [monitoring, setMonitoring] = useState(Object);

  const handleClick = (monitoringData: Data) => {
    // console.log('monitoring', monitoring);
    setShowModal(true);
    setMonitoring(monitoringData);
  };

  // function delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // const automateRefresh = async () => {
  // 	var reloadEvery = 10000;
  // 	await delay(reloadEvery);
  // 	while (parseInt(radioValue) === 1) {
  // 		console.log('auto refresh ' + radioValue);
  // 		loadMonitoringData();
  // 		await delay(reloadEvery);
  // 	}
  // };

  const loadMonitoringData = async () => {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const API_VERSION = 'api/v1';
    const url = `${ROOT_API}/${API_VERSION}/monitoring`;
    const result = await axios(url);
    // console.log('result', result);
    // console.log('data', result.data.data);
    setData(result.data.data);
  };

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    loadMonitoringData();
    /* (async () => {
			const ROOT_API = process.env.NEXT_PUBLIC_API;
			const API_VERSION = 'api/v1';
			const url = `${ROOT_API}/${API_VERSION}/monitoring`;
			const result = await axios(url);
			console.log('result', result);
			console.log('data', result.data.data);
			setData(result.data.data);
		})(); */
  }, []);

  return (
    <>
      <div className="shadow card">
        <div className="card-header border-0">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="mb-0">Monitoring Data</h3>
            </div>
            <div className="col-xl-3 text-right">
              {/* <ButtonGroup>
										{radios.map((radio, idx) => (
											<ToggleButton
												key={idx}
												id={`radio-${idx}`}
												type="radio"
												variant={idx % 2 ? 'outline-success' : 'outline-danger'}
												name="radio"
												value={radio.value}
												checked={radioValue === radio.value}
												onChange={(e) => {
													setRadioValue(e.currentTarget.value);
													automateRefresh();
												}}
											>
												{radio.name}
											</ToggleButton>
										))}
									</ButtonGroup> */}
            </div>
            <div className="col-xl-3 text-right">
              <Button color="warning" onClick={loadMonitoringData} size="lg">
                Refresh
              </Button>
            </div>
            <div className="col-xl-3 text-right">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-striped table-bordered table-hover align-items-center table-flush"
            {...getTableProps()}
            // style={{ border: 'solid 1px blue' }}
          >
            <thead className="thead-light">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      scope="col"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card-footer py-4">
          <nav aria-label="...">
            <ul className="pagination justify-content-end mb-0">
              <li className="mr-5 mt-1">
                <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
                <span>
                  | Go to page:{' '}
                  <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const pageVal = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(pageVal);
                    }}
                    style={{ width: '100px' }}
                  />
                </span>{' '}
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSizeVal) => (
                    <option key={pageSizeVal} value={pageSizeVal}>
                      Show {pageSizeVal}
                    </option>
                  ))}
                </select>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {'<<'}
                </button>{' '}
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {'<'}
                </button>{' '}
              </li>

              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  {'>'}
                </button>{' '}
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {'>>'}
                </button>{' '}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Modal isOpen={showModal} size="xl" toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>
          Monitoring Detail
          {/* <Modal.Title>Monitoring Detail</Modal.Title> */}
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                  <strong className="text-dark">Log ID:</strong> &nbsp;
                  {monitoring.logId}
                </li>
                <li className="list-group-item border-0 ps-0 text-sm">
                  <strong className="text-dark">App Name:</strong> &nbsp;
                  {monitoring.appName}
                </li>
                <li className="list-group-item border-0 ps-0 text-sm">
                  <strong className="text-dark">App IP:</strong> &nbsp;
                  {monitoring.appIP}
                </li>
                <li className="list-group-item border-0 ps-0 text-sm">
                  <strong className="text-dark">Amount:</strong> &nbsp;
                  {monitoring.trxAmount}
                </li>
                <li className="list-group-item border-0 ps-0 text-sm">
                  <strong className="text-dark">Created At:</strong> &nbsp;
                  {monitoring.createdAt}
                </li>
              </ul>
            </div>
            <hr className="horizontal gray-light my-4"></hr>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h5>Remarks</h5>
              <div className="alert alert-info bg-darker">
                <JsonPretty jsonStr={monitoring.remarks} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5>Request</h5>
              <div className="alert alert-info bg-darker">
                <JsonPretty jsonStr={monitoring.requestData} />
              </div>
            </div>
            <div className="col-md-6">
              <h5>Response</h5>
              <div className="alert alert-info bg-darker">
                <JsonPretty jsonStr={monitoring.responseData} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowModal(false)}>CLOSE</Button>
        </ModalFooter>
      </Modal>

      {/* <Footer /> */}
    </>
  );
}
