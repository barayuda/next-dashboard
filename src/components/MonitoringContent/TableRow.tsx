/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
// import cx from 'classnames';
// import NumberFormat from 'react-number-format';

interface TableRowProps {
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
}

export default function TableRow(props: Partial<TableRowProps>) {
  const {
    logId,
    appIP,
    appName,
    merchantId,
    requestData,
    responseData,
    status,
    trxAmount,
    trxTimestamp,
    created_at,
    updated_at,
  } = props;
  /* const statusClass = cx({
    'float-start icon-status': true,
    pending: status === 'PENDING',
    success: status === 'INACTIVE',
    failed: status === 'ACTIVE',
  }); */
  return (
    <tr>
      <th scope="row">
        <Link href={`/monitoring/transactions/${logId}`}>
          <a className="btn btn-status rounded-pill text-sm">{`${logId}`}</a>
        </Link>
      </th>
      <td>{appIP}</td>
      <td>{appName}</td>
      <td>{merchantId}</td>
      <td>{status}</td>
      <td>{requestData}</td>
      <td>{responseData}</td>
      <td>{trxAmount}</td>
      <td>{trxTimestamp}</td>
      <td>{created_at}</td>
      <td>{updated_at}</td>
      <td>
        <Link href={`/monitoring/transactions/${logId}`}>
          <a className="btn btn-status rounded-pill text-sm">Details</a>
        </Link>
      </td>
    </tr>
  );
}
