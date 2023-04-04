import Head from 'next/head';
import { useState } from 'react';
// import { resolve } from 'path';

// const inter = Inter({ subsets: ['latin'] });

type ContactFields = {
  [key: string]: string | undefined;
  fullname: string | undefined;
  email: string | undefined;
  message: string | undefined;
};

type ErrorField = {
  fullname: boolean;
  email: boolean;
  message: boolean;
};

export default function Home() {
  const initialContactState: ContactFields = {
    fullname: '',
    email: '',
    message: '',
  };

  const initialErrorState: ErrorField = {
    fullname: false,
    email: false,
    message: false,
  };

  const [dataSend, setDataSend] = useState<ContactFields>(initialContactState);
  const [error, setError] = useState<ErrorField>(initialErrorState);
  const [status, setStatus] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [result, setResult] = useState('');

  // const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submited');
    setError(initialErrorState);
    let hasErr = false;
    Object.keys(initialErrorState).map((err) => {
      if (dataSend[err] == '' || dataSend[err] == undefined) {
        setError({ ...error, [err]: true });
        hasErr = true;
      }
    });

    if (hasErr) return;

    setStatus(true);

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(dataSend),
    });

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const data = (await response.json()) as ContactFields;
    if (data.message) {
      setResult(data.message);
      setSuccess(true);
      setStatus(false);
      setDataSend(initialContactState);
      setError(initialErrorState);

      await delay(7000);
      setSuccess(false);
    } else {
      setStatus(false);
    }
    return;
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-raleway grid h-full place-items-center bg-emerald-600 px-4 py-8 text-5xl lg:h-screen lg:px-32">
        <div
          className="flex w-full max-w-screen-2xl flex-col items-start justify-center gap-6 
        rounded bg-black py-16 px-6 lg:flex-row lg:px-16"
        >
          <div className="w-full lg:w-1/2">
            <div className="my-12 text-center text-5xl text-white">
              Contact form
            </div>
            {/* <Image src={pic} alt="" width={500} height={700} /> */}
          </div>
          <div className="mt-8 w-full lg:m-0 lg:w-1/2">
            <form
              className="flex w-full flex-col text-lg text-white"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(e);
              }}
            >
              {/**full name field */}
              <label className="mt-2">Full Name</label>
              <input
                type="text"
                value={dataSend.fullname ?? ''}
                onBlur={() => setError({ ...error, fullname: true })}
                onChange={(e) =>
                  setDataSend({ ...dataSend, fullname: e.target.value })
                }
                className="border-b border-emerald-500 bg-black py-3
                      text-2xl text-emerald-400 outline-none"
              />
              {error.fullname && !dataSend.fullname && (
                <span className="mx-6 my-2 text-sm text-pink-500">
                  please write your fullname
                </span>
              )}

              {/**email field */}
              <label className="mt-6">Email</label>
              <input
                type="email"
                value={dataSend.email ?? ''}
                onBlur={() => setError({ ...error, email: true })}
                onChange={(e) =>
                  setDataSend({ ...dataSend, email: e.target.value })
                }
                className="border-b border-emerald-500 bg-black py-3
                      text-2xl text-emerald-400 outline-none"
              />
              {error.email &&
                (!dataSend.email ||
                  !/\S+@\S+\S+\.\S+/.test(dataSend.email)) && (
                  <span className="mx-6 my-2 text-sm text-pink-500">
                    please write a valid email
                  </span>
                )}

              {/**message field */}
              <label className="mt-6">Message</label>
              <textarea
                rows={3}
                value={dataSend.message ?? ''}
                onBlur={() => setError({ ...error, message: true })}
                onChange={(e) =>
                  setDataSend({ ...dataSend, message: e.target.value })
                }
                className="border-b border-emerald-500 bg-black py-3
                      text-2xl text-emerald-400 outline-none"
              />

              {error.message && !dataSend.message && (
                <span className="mx-6 my-2 text-sm text-pink-500">
                  please write your message
                </span>
              )}

              <div className="mt-8 text-center">
                <button
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   void handleSubmit(e);
                  // }}
                  type="submit"
                  className="rounded bg-emerald-600 py-2 px-4 text-center text-white"
                >
                  Submit
                </button>
              </div>

              {status && (
                <div className="my-8 text-center text-xl text-white transition duration-300 ease-in-out">
                  Sending....
                </div>
              )}
              {success && (
                <div
                  className={`${
                    success ? 'text-sky-500' : 'text-pink-500'
                  } my-8 text-center text-xl`}
                >
                  {result}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}