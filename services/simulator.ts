import { v4 as uuidv4 } from 'uuid';
import callAPI from '../config/api/index';
import { SimulatorTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
console.log(`ROOT_API: ${process.env.NEXT_PUBLIC_API}`);
const API_VERSION = 'api/v1';

const urlInquiry = process.env.NEXT_PUBLIC_IPG_INQUIRY_URL;

export async function setSimulator(data: SimulatorTypes) {
	// START Process Inquiry
	let date = new Date();
	let orderRefId =
		date.getFullYear().toString() +
		date.getMonth().toString() +
		date.getDate().toString() +
		date.getHours().toString() +
		date.getMinutes().toString() +
		date.getSeconds().toString();
	let requestData = {
		amount: data.total,
		currency: 'IDR',
		referenceUrl: process.env.NEXT_PUBLIC_FRONTEND + '/simulator/' + orderRefId,
		order: {
			id: orderRefId,
			disablePromo: true,
			afterDiscount: data.total,
			items: [
				{
					name: data.material,
					quantity: data.quantity,
					amount: data.total,
				},
			],
		},
		customer: {
			name: 'Fyan E. Widyantoro',
			email: 'fyanestu@gmail.com',
			phoneNumber: '082114017471',
			country: 'ID',
			postalCode: '12345',
		},
		paymentSource: data.paymentSource,
		paymentSourceMethod: 'authcapture',
		token: '',
	};

	// console.log('dataSimulator', data);
	// console.log('urlInquiry', urlInquiry);
	// console.log('requestData', requestData);
	let responseData = await callAPI({
		url: urlInquiry,
		method: 'POST',
		data: requestData,
	});
	// console.log('responseData', responseData);

	// START Save to DB
	const url = `${ROOT_API}/${API_VERSION}/simulator`;
	// console.log('url', url);

	let payload = {
		reqId: uuidv4(),
		apiKey: process.env.NEXT_PUBLIC_IPG_API_KEY,
		orderRefId,
		currency: 'IDR',
		paymentSource: data.paymentSource,
		paymentSourceMethod: 'authcapture',
		amount: data.total,
		trxToken: responseData?.data?.token,
		selectionsUrl: responseData?.data?.urls?.selections,
		checkoutUrl: responseData?.data?.urls?.checkout,
		statusHttp: responseData?.statusHttp,
		requestData,
		responseData,
	};
	console.log('payload', payload);

	return callAPI({
		url,
		method: 'POST',
		data: payload,
	});
}

export async function getSimulator(valueParams: string) {
  let params = '';
  if (valueParams === 'all') {
    params = '';
  } else {
    params = `?status=${valueParams}`;
  }
  const url = `${ROOT_API}/${API_VERSION}/players/history${params}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
