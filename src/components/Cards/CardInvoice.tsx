import React, { ReactNode } from "react";
import PropTypes from "prop-types";

interface CardInvoiceProps {
  image: string;
  address: string;
  phone: string;
  invoice: { text: string; id: string | number };
  billing: { title: string; name: string; address: string };
  footerTitle: string;
  footerDescriprion: string;
  invoiceDate: { text: string; date: string };
  dueDate: { text: string; date: string };
  contact: { type: string; info: string }[];
  tableHead: string[];
  tableBody: string[][];
  totalCount: { text: string; info: string };
}

export default function CardInvoice(props: CardInvoiceProps) {
  const {
    image,
    address,
    phone,
    invoice,
    billing,
    invoiceDate,
    dueDate,
    footerTitle,
    footerDescriprion,
    contact,
    totalCount,
    tableHead,
    tableBody,
  } = props;
  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
        <div className="border-blueGray-200 border-b px-5 pt-6 pb-4">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="relative w-full px-4 text-left md:w-4/12">
              <div className="text-left">
                <img
                  alt="..."
                  src={image}
                  className="mb-2 w-full"
                  style={{ maxWidth: "150px" }}
                />
                <h6 className="text-blueGray-700 mt-6 block capitalize">
                  {address}
                </h6>
                <h6 className="text-blueGray-700">{phone}</h6>
              </div>
            </div>

            <div className="relative w-full px-4 text-left md:w-5/12 lg:w-3/12">
              <div className="flex justify-center py-6 pt-12 lg:pt-6">
                <div className="text-left">
                  <h3 className="mt-0 mb-2 text-2xl font-bold leading-normal">
                    {billing.title}
                  </h3>
                  <h6 className="mt-2 mb-0 block text-xl">{billing.name}</h6>
                  <p className="text-blueGray-500">{billing.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap md:justify-between">
            <div className="relative w-full px-4 text-left md:w-4/12">
              <h4 className="mb-2 mt-12 text-left text-2xl font-semibold leading-normal">
                {invoice.text}
              </h4>
              <h3 className="mt-1 mb-2 text-2xl font-light leading-normal">
                {invoice.id}
              </h3>
            </div>

            <div className="relative w-full px-4 text-left md:w-5/12 lg:w-3/12">
              <div className="flex justify-center py-6 lg:pt-4">
                <div className="mt-12">
                  <p className="float-left mb-0">{invoiceDate.text}</p>
                  <p className="float-right ml-4 mb-0">{invoiceDate.date}</p>
                  <br />
                  <p className="float-left">{dueDate.text}</p>
                  <p className="float-right ml-4">{dueDate.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-auto px-4 py-5">
          <table className="text-blueGray-800 mb-4 w-full border-collapse text-right">
            <thead className="bg-blueGray-800">
              <tr className="text-right font-light uppercase text-white">
                {tableHead.map((prop: ReactNode, key: string | number) => (
                  <th key={key} className="border-t p-3" scope="col">
                    {prop}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableBody.map((prop: string[], key: string | number) => (
                <tr key={key}>
                  {prop.map((col: string, colKey: string | number) => (
                    <td key={colKey} className="border-t p-3 py-4">
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="mt-4">
                <th className="border-b-0 border-t p-3">
                  <p className="pt-2 text-lg font-semibold">
                    {totalCount.text}
                  </p>
                </th>

                <th
                  className="border-b-0 border-t p-3"
                  colSpan={tableHead.length - 1 < 1 ? 1 : tableHead.length - 1}
                >
                  <p className="pt-2 text-right text-lg font-semibold">
                    {totalCount.info}
                  </p>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="border-blueGray-200 border-t px-4 py-3">
          <div className="relative ml-auto w-full px-4 text-right md:w-5/12">
            <h5 className="mt-0 mb-2 text-2xl font-semibold leading-normal">
              {footerTitle}
            </h5>
            <p className="">{footerDescriprion}</p>
            {contact.map(
              (prop: { type: string; info: string }, key: string | number) => (
                <h6 key={key} className="mb-4 flex items-center justify-end">
                  <span className="mr-2">{prop.type}</span>
                  <span className="text-blueGray-500">{prop.info}</span>
                </h6>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

CardInvoice.defaultProps = {
  invoice: {},
  billing: {},
  invoiceDate: {},
  dueDate: {},
  contact: [],
  tableHead: [],
  tableBody: [],
  totalCount: {},
};

CardInvoice.propTypes = {
  image: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  invoice: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string,
  }),
  billing: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
  }),
  invoiceDate: PropTypes.shape({
    text: PropTypes.string,
    date: PropTypes.string,
  }),
  dueDate: PropTypes.shape({
    text: PropTypes.string,
    date: PropTypes.string,
  }),
  footerTitle: PropTypes.string,
  footerDescriprion: PropTypes.string,
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      info: PropTypes.string,
    })
  ),
  totalCount: PropTypes.shape({
    text: PropTypes.string,
    info: PropTypes.string,
  }),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // example: [["one","two"],["three","four","five"]]
  // will be generated as a table with two rows,
  // the first row with two columns -         one | two
  // the second row with three columns - three | four | five
  tableBody: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
