/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Fragment, useRef, useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';

// import Footer from '../MainContent/Footer';
import GlobalFilter from './GlobalFilter';
// import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import JsonPretty from './JsonPretty';
import { Dialog, Transition } from '@headlessui/react';
import { FaSearch } from 'react-icons/fa';

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

interface CardTableProps {
  color: string;
}

export default function ApiTable(props: CardTableProps) {
  const { color } = props;
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cancelButtonRef = useRef(null);

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: 'Application',
        // First group columns
        columns: [
          {
            Header: 'Req_ID',
            accessor: 'reqId', // accessor is the "key" in the data
            sortType: 'basic',
            disableSortBy: true,
            Cell: (props: { value: string; row: any }, cell: any) =>
              cell && (
                <button
                  onClick={() => handleShow(props.row.original)}
                  className="mb-1 mr-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                >
                  {props.value && props.value?.length > 0
                    ? props.value.slice(-12)
                    : ''}
                </button>
              ),
          },
          {
            Header: 'Type',
            accessor: 'type',
          },
          {
            Header: 'Inquiry_Id',
            accessor: 'inquiryId',
          },
          {
            Header: 'Order_Id',
            accessor: 'orderId',
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
  const handleClose = (status: boolean) => {
    setShowModal(false);
    // const body = document.body;
    // body.style.position = '';
    // body.style.top = '';
    // body.style.height = '';
    // body.style.overflowY = '';
  };
  const handleShow = (webhook: Data) => {
    console.log('webhook', webhook);
    setWebhook(webhook);
    setShowModal(true);
    // const body = document.body;
    // body.style.height = '100vh';
    // body.style.overflowY = 'hidden';
  };

  // const [autoRefresh, setAutoRefresh] = useState(false);
  // const handleAutoRefresh = () => {};
  // const [radioValue, setRadioValue] = useState('3');

  // const radios = [
  // 	{ name: 'Manual Refresh', value: '0' },
  // 	{ name: 'Auto Refresh', value: '1' },
  // ];

  const [webhook, setWebhook] = useState(Object);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadWebhookData = async () => {
    setIsLoading(true);
    const ROOT_API = process.env.NEXT_PUBLIC_API || 'http://10.14.20.49:4010';
    const url = `${ROOT_API}/simulator/webhook-list`;
    console.log('url', url);
    const result = await axios(url);
    console.log('result', result);
    console.log('data', result?.data?.data);
    setData(result?.data?.data);
    setIsLoading(false);
  };

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    loadWebhookData();
  }, []);

  return (
    <>
      <div
        className={
          'relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg ' +
          (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
        }
      >
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="mx-autp flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-4">
            <h3
              className={
                'text-lg font-semibold ' +
                (color === 'light' ? 'text-blueGray-700' : 'text-white')
              }
            >
              Webhook Tables
            </h3>
            <div className="mr-3 hidden flex-row flex-wrap items-center md:flex lg:ml-auto">
              <div className="relative flex w-full flex-wrap items-stretch">
                <button
                  className="bg-lightBlue-400 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                  onClick={loadWebhookData}
                >
                  Refresh
                </button>
                <div>
                  <span className="text-blueGray-300 absolute z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pl-3 text-center text-base font-normal leading-snug">
                    {/* <i className="fas fa-search"></i> */}
                    <FaSearch />
                  </span>
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {isLoading && (
            <div className="mb-3 ml-auto mr-auto mt-3 block w-full items-center px-6 text-center font-semibold">
              Loading data....
            </div>
          )}
          {/* Projects table */}
          {!isLoading && (
            <table
              className="w-full border-collapse items-center bg-transparent"
              {...getTableProps()}
            >
              <thead className="thead-light">
                {headerGroups.map((headerGroup) => (
                  // eslint-disable-next-line react/jsx-key
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      // eslint-disable-next-line react/jsx-key
                      <th
                        className={
                          'whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase ' +
                          (color === 'light'
                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                            : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                        }
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                    // eslint-disable-next-line react/jsx-key
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <td
                            className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-1 px-6 align-middle text-xs"
                            {...cell.getCellProps()}
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="mb-0 rounded-b border-0 bg-black px-4 py-3 text-black">
          <nav className="block" aria-label="...">
            <ul className="flex list-none flex-wrap rounded pl-0">
              <li className="mr-5 mt-1 text-white">
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
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    style={{ width: '100px' }}
                    className="rounded text-black"
                  />
                </span>{' '}
                <select
                  className="rounded text-black"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </li>
              <li className="mr-1 mt-2">
                <button
                  className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {'<<'}
                </button>{' '}
              </li>
              <li className="mr-1 mt-2">
                <button
                  className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {'<'}
                </button>{' '}
              </li>

              <li className="mr-1 mt-2">
                <button
                  className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  {'>'}
                </button>{' '}
              </li>
              <li className="mr-1 mt-2">
                <button
                  className="relative mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-pink-500 bg-white p-0 text-xs font-semibold leading-tight text-pink-500 first:ml-0"
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
      {showModal ? (
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setShowModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative w-10/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="">
                        <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Webhook Detail
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              All of your data will be showed bellow.
                            </p>
                            <div className="text-blueGray-500 my-4 overflow-x-auto text-sm leading-relaxed">
                              <div className="">
                                <ul className="">
                                  <li className="">
                                    <strong className="">Req ID:</strong> &nbsp;
                                    {webhook.reqId}
                                  </li>
                                  <li className="">
                                    <strong className="">Type:</strong> &nbsp;
                                    {webhook.type}
                                  </li>
                                  <li className="">
                                    <strong className="">Inquiry Id:</strong>{' '}
                                    &nbsp;
                                    {webhook.inquiryId}
                                  </li>
                                  <li className="">
                                    <strong className="">Order Id:</strong>{' '}
                                    &nbsp;
                                    {webhook.orderId}
                                  </li>
                                  <li className="">
                                    <strong className="">Created At:</strong>{' '}
                                    &nbsp;
                                    {webhook.createdAt}
                                  </li>
                                </ul>
                              </div>
                              <hr className="horizontal gray-light my-4"></hr>
                            </div>

                            <div className="text-blueGray-500 my-4 text-sm leading-relaxed">
                              <div className="">
                                <strong>Transaction</strong>
                                <div className="flex-nowrap rounded bg-black text-white">
                                  <JsonPretty jsonStr={webhook.transaction} />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-flow-col-dense grid-cols-2">
                              <div className="mr-2">
                                <strong>Inquiry</strong>
                                <div className="flex-nowrap overflow-x-auto overscroll-auto rounded bg-black text-sm text-white">
                                  <JsonPretty jsonStr={webhook.inquiry} />
                                </div>
                              </div>
                              <div className="ml-2">
                                <strong>Response</strong>
                                <div className="flex-nowrap overflow-x-auto overscroll-auto rounded bg-black text-sm text-white">
                                  <JsonPretty jsonStr={webhook.responseData} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setShowModal(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </>
  );
}
