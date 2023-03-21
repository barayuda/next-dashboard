import React from "react";
import { useTable, UseTableInstanceProps } from "react-table";

export interface TableNewProps<T extends object>
  extends Pick<
    UseTableInstanceProps<T>,
    | "getTableProps"
    | "headerGroups"
    | "getTableBodyProps"
    | "prepareRow"
    | "rows"
  > {}

export function Table<T extends object>(props: TableNewProps<T>) {
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    props;

  return (
    <>
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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card-footer py-4">
        {/* <nav aria-label="...">
					<ul className="pagination justify-content-end mb-0">
						<li className="page-item disabled">
							<a className="page-link" href="javascript:void(0)">
								<i className="fas fa-angle-left"></i>
								<span className="sr-only">Previous</span>
							</a>
						</li>
						<li className="page-item active">
							<a className="page-link" href="javascript:void(0)">
								1
							</a>
						</li>
						<li className="page-item">
							<a className="page-link" href="javascript:void(0)">
								2 <span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="page-item">
							<a className="page-link" href="javascript:void(0)">
								3
							</a>
						</li>
						<li className="page-item">
							<a className="page-link" href="javascript:void(0)">
								<i className="fas fa-angle-right"></i>
								<span className="sr-only">Next</span>
							</a>
						</li>
					</ul>
				</nav> */}
      </div>
    </>
  );
}
