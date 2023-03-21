/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import JsonPretty from "./JsonPretty";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface MonitoringModal {
  isOpen?: boolean;
  monitoring: {
    logId: string;
    appName: string;
    appIP: string;
    trxAmount: number;
    createdAt: string;
    remarks: any;
    requestData: any;
    responseData: any;
  };
}

export default function MonitoringModal(props: MonitoringModal) {
  const { isOpen, monitoring } = props;
  const [showModal, setShowModal] = useState(isOpen);

  const cancelButtonRef = useRef(null);

  return (
    <>
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
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Monitoring Detail
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            All of your data will be showed bellow.
                          </p>
                          <div className="text-blueGray-500 my-4 text-sm leading-relaxed">
                            <div className="">
                              <ul className="">
                                <li className="">
                                  <strong className="">Log ID:</strong> &nbsp;
                                  {monitoring.logId}
                                </li>
                                <li className="">
                                  <strong className="">App Name:</strong> &nbsp;
                                  {monitoring.appName}
                                </li>
                                <li className="">
                                  <strong className="">App IP:</strong> &nbsp;
                                  {monitoring.appIP}
                                </li>
                                <li className="">
                                  <strong className="">Amount:</strong> &nbsp;
                                  {monitoring.trxAmount}
                                </li>
                                <li className="">
                                  <strong className="">Created At:</strong>{" "}
                                  &nbsp;
                                  {monitoring.createdAt}
                                </li>
                              </ul>
                            </div>
                            <hr className="horizontal gray-light my-4"></hr>
                          </div>

                          <div className="text-blueGray-500 my-4 text-sm leading-relaxed">
                            <div className="">
                              <strong>Remarks</strong>
                              <div className="flex-nowrap rounded bg-black text-white">
                                <JsonPretty jsonStr={monitoring.remarks} />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-flow-col-dense grid-cols-2">
                            <div className="mr-2">
                              <strong>Request</strong>
                              <div className="flex-nowrap overscroll-auto rounded bg-black text-white">
                                {/* {monitoring.requestData} */}
                                <JsonPretty jsonStr={monitoring.requestData} />
                              </div>
                            </div>
                            <div className="ml-2">
                              <strong>Response</strong>
                              <div className="flex-nowrap overscroll-auto rounded bg-black text-white">
                                <JsonPretty jsonStr={monitoring.responseData} />
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
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
    </>
  );
}
