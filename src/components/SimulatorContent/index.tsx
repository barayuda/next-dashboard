/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useCallback, useEffect, useState } from "react";
// import { toast } from 'react-toastify';
import axios from "axios";
import {
  useTable,
  usePagination,
  Column,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { MonitoringTransactionTypes } from "../../services/data-types";
import TableRow from "./TableRow";
import { getMonitoringTransaction } from "../../services/monitoring";
import GlobalFilter from "./GlobalFilter";

type Data = {
  _id: string;
  logId?: string;
  appIP?: string;
  appName?: string;
  merchantId?: string;
  requestData?: number;
  responseData?: string;
  status?: string;
  trxAmount?: string;
  trxTimestamp?: string;
  created_at?: string;
  updated_at?: string;
  view: React.ReactNode;
};

/* const createArr = (n: number): Data[] => {
	const data: Data[] = [];
	for (let i = 0; i < n; i += 1) {
		data.push({
			bm_id: `ID-${Math.random().toFixed(4)}`,
			external_id: `ID-${Math.random().toFixed(4)}`,
			bank_code: `Sanchez #${i}`,
			name: `Rick #${i}`,
			amount: Math.random().toFixed(4),
			status: 'PENDING',
			account_number: '123123',
			created_at: new Date().toDateString(),
			view: <button>View</button>,
		});
	}
	return data;
}; */

export default function MonitoringContent() {
  const [dataCount, setDataCount] = useState(0);
  const [monitorings, setMonitorings] = useState([]);

  const getMerchantTransactionAPI = useCallback(async (value: any) => {
    const response = await getMonitoringTransaction(value);
    console.log("res", response);
    if (response.error) {
      // toast.error(response.message);
    } else {
      setDataCount(response.data.length);
      if (response.data != null) {
        console.log("data", response.data);
        setMonitorings(response.data);
      }
    }
  }, []);

  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Log_ID",
        accessor: "logId", // accessor is the "key" in the data
      },
      {
        Header: "App_IP",
        accessor: "appIP",
      },
      {
        Header: "App_Name",
        accessor: "appName",
      },
      {
        Header: "Merchant",
        accessor: "merchantId",
      },
      {
        Header: "Request_Data",
        accessor: "requestData",
      },
      {
        Header: "Response_Data",
        accessor: "responseData",
      },
      {
        Header: "status",
        accessor: "status",
      },
      {
        Header: "Trx_Amount",
        accessor: "trxAmount",
      },
      {
        Header: "Trx_Timestamp",
        accessor: "trxTimestamp",
      },
      {
        Header: "created_at",
        accessor: "created_at",
      },
      {
        Header: "updated_at",
        accessor: "updated_at",
      },
    ],
    []
  );

  console.log("monitorings", monitorings);
  const data = React.useMemo<Data[]>(() => monitorings, [monitorings]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    rows,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  // useEffect(() => {
  // 	(async () => {
  // 		getMerchantTransactionAPI('all');
  // 	})();
  // }, []);

  useEffect(() => {
    (async () => {
      const ROOT_API = process.env.NEXT_PUBLIC_API || "";
      const API_VERSION = "api/v1";
      const url = `${ROOT_API}/${API_VERSION}/monitoring`;
      const result = await axios(url);
      console.log("result", result);
      console.log("data", result.data.data);
      setMonitorings(result.data.data);
    })();
  }, []);

  const { globalFilter } = state;

  return (
    <div className="container-fluid mt--6">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header border-0">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="mb-0">Monitoring Data</h3>
                </div>
                <div className="col-xl-3 text-right">
                  {/* <a href="#!" className="btn btn-sm btn-primary">
										See all
									</a> */}
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table
                className="align-items-center table-flush table"
                {...getTableProps()}
                // style={{ border: 'solid 1px blue' }}
              >
                <thead className="thead-light">
                  {headerGroups.map((headerGroup) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // eslint-disable-next-line react/jsx-key
                        <th
                          scope="col"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
              </span>{" "}
              <select
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
            </div>
            {/* <Table<Data>
							getTableProps={getTableProps}
							getTableBodyProps={getTableBodyProps}
							headerGroups={headerGroups}
							rows={rows}
							prepareRow={prepareRow}
						/> */}
            {/* <hr /> */}
            <div className="table-responsive">
              <table className="align-items-center table-flush table">
                <thead className="thead-light">
                  <tr>
                    <th scope="coll">logId</th>
                    <th scope="coll">appIP</th>
                    <th scope="coll">appName</th>
                    <th scope="coll">merchantId</th>
                    <th scope="coll">requestData</th>
                    <th scope="coll">responseData</th>
                    <th scope="coll">status</th>
                    <th scope="coll">trxAmount</th>
                    <th scope="coll">trxTimestamp</th>
                    <th scope="coll">createdAt</th>
                    <th scope="coll">updatedAt</th>
                    <th scope="coll">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {monitorings.map((monitoring: MonitoringTransactionTypes) => {
                    return (
                      <TableRow
                        key={monitoring._id}
                        logId={monitoring.logId}
                        appIP={monitoring.appIP}
                        appName={monitoring.appName}
                        merchantId={monitoring.merchantId}
                        requestData={monitoring.requestData}
                        responseData={monitoring.responseData}
                        status={monitoring.status}
                        trxAmount={monitoring.trxAmount}
                        trxTimestamp={monitoring.trxTimestamp}
                        created_at={monitoring.created_at}
                        updated_at={monitoring.updated_at}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="card-footer py-4">
              {/* <nav aria-label="...">
								<ul className="pagination justify-content-end mb-0">
									<li className="page-item disabled">
										<a className="page-link" href="#">
											<i className="fas fa-angle-left"></i>
											<span className="sr-only">Previous</span>
										</a>
									</li>
									<li className="page-item active">
										<a className="page-link" href="#">
											1
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="#">
											2 <span className="sr-only">(current)</span>
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="#">
											3
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="#">
											<i className="fas fa-angle-right"></i>
											<span className="sr-only">Next</span>
										</a>
									</li>
								</ul>
							</nav> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
