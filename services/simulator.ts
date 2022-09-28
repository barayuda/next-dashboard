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
	let orderAuth = {};

	if (['allopay', 'allopaylater', 'allopoint'].indexOf(data.paymentSource) >= 0) {
		// ALLO_MegaAuthentication
		let reqAlloMA = { phoneNumber: '082114017471' };
		let resAlloMA = await callAPI({
			url: 'http://10.14.20.49/alloServices/',
			method: 'POST',
			data: reqAlloMA,
			headers: {
				bu: 'mega',
				action: 'authorize',
				secret: '082208222250',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Referer: 'http://10.14.20.49/'
			}
		});

		console.log('resAlloMA', JSON.stringify(resAlloMA));

		if (resAlloMA.data?.responseData?.accessToken !== undefined) {
			let reqGenCode = { accessToken: resAlloMA.data?.responseData?.accessToken };
			let resGenCode = await callAPI({
				url: 'http://10.14.20.49/alloServices/',
				method: 'POST',
				data: reqGenCode,
				headers: {
					bu: 'mega',
					action: 'genNewCodeForCrossBu',
					secret: '082208222250',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});

			console.log('resGenCode', JSON.stringify(resGenCode));

			orderAuth = {
				alloCode: resGenCode.data?.responseData?.code,
				alloCodeVerifier: resGenCode.data?.codeVerifier,
				alloOsType: 'ANDROID',
				alloDeviceId: '899292',
				alloAppType: 'apps',
			};

			console.log('orderAuth', JSON.stringify(orderAuth));
		}
	}

	let requestData = {
		amount: data.total,
		currency: 'IDR',
		referenceUrl: process.env.NEXT_PUBLIC_FRONTEND + '/simulator/' + orderRefId,
		order: {
			id: orderRefId,
			disablePromo: true,
			afterDiscount: '',
			items: [
				{
					name: data.material,
					quantity: data.quantity,
					amount: data.total,
				},
			],
			auth: orderAuth
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
		headers: {
			Authorization: '6BPxIS7nJt1kwgN1PHA2YO',
			'x-real-ip': '35.191.16.235',
			'x-forwarded-for': '128.199.167.85,34.95.125.106, 35.191.16.235'
		}
	});
	// console.log('responseData', responseData);

	// START Save to DB
	const url = `${ROOT_API}/${API_VERSION}/simulator`;
	console.log('url', url);

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
		data: payload
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
