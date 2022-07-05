import React, { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  // InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
import Cookies from 'js-cookie';
// layout for this page
import Auth from '../../layouts/Auth';
import {
  authenticate,
  isAuth,
  sendGoogleToken,
  setLogin,
} from '../../../services/auth';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const Login: NextPageWithLayout = () => {
  // function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSubmit = async () => {
    const data = {
      email,
      password,
    };

    if (!email || !password) {
      // console.log('Error');
      toast.error('Email and Password are required !!!');
    } else {
      const response = await setLogin(data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Login Success !!!');
        // localStorage.setItem('user-form', JSON.stringify({name: }));
        const { token } = response.data.data;
        // console.log('response', response);
        // console.log('response.data', response.data);
        // console.log('response.data.data', response.data.data);
        // console.log('token', token);
        const tokenBase64 = btoa(token);
        // console.log('tokenBase64', tokenBase64);
        Cookies.set('token', tokenBase64, { expires: 1 });
        router.push('/dashboard');
      }
    }
  };

  const informParent = (response: any) => {
    authenticate(response, () => {
      if (isAuth() && isAuth().role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/simulator');
      }
    });
  };

  const responseGoogle = async (response: any) => {
    console.log('GOOGLE CLIENT ID', process.env.NEXT_PUBLIC_GOOGLE_CLIENT);
    console.log('responseGoogle', response);
    const res = await sendGoogleToken(response.tokenId);
    informParent(res);
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#home"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img alt="..." src="/img/icons/common/github.svg" />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <GoogleLogin
                clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#home"
                    onClick={renderProps.onClick}
                    // onClick={(e) => e.preventDefault()}
                    disabled={renderProps.disabled}
                  >
                    <span className="btn-inner--icon">
                      <img alt="..." src="/img/icons/common/google.svg" />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                )}
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  {/* <InputGroupAddon addonType="prepend"> */}
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                  {/* </InputGroupAddon> */}
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  {/* <InputGroupAddon addonType="prepend"> */}
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                  {/* </InputGroupAddon> */}
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={(e) => {
                    // console.log('Sign in lagi ');
                    // toast.success('Login Process !!!');
                    onSubmit();
                  }}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className={'text-light'} href={'/auth/forgotpass'}>
              <small>Forgot password?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#home"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

// Login.layout = Auth;
Login.getLayout = function getLayout(page: ReactElement) {
  return <Auth>{page}</Auth>;
};

export default Login;
