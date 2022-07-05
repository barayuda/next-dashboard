import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie';
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
  Label,
} from 'reactstrap';
// layout for this page
import Auth from '../../layouts/Auth';
import {
  authenticate,
  isAuth,
  sendGoogleToken,
  setSignUp,
} from '../../../services/auth';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const Register: NextPageWithLayout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localForm, setLocalForm] = useState({
    name: '',
    email: '',
  });
  const [agreement, setAgreement] = useState(false);

  useEffect(() => {
    const getLocalForm = localStorage.getItem('user-form');
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const router = useRouter();
  const onSubmit = async () => {
    const userForm = {
      email,
      name,
      password,
    };
    // console.log('agreement', agreement);
    // console.log('typeof agreement', typeof agreement);
    if (agreement) {
      localStorage.setItem('user-form', JSON.stringify(userForm));

      const getLocalForm = await localStorage.getItem('user-form');
      const form = JSON.parse(getLocalForm!);
      const data = new FormData();
      let username = form.name;
      username = username.replace(/\s+/g, '');
      username = username.replace(/'+/g, '');
      username = username.replace(/-+/g, '');
      username = username.toLowerCase();

      data.append('image', '');
      data.append('email', form.email);
      data.append('name', form.name);
      data.append('password', form.password);
      data.append('username', username);
      data.append('phoneNumber', '08123456789');
      data.append('role', 'public-free');
      data.append('status', 'NEW');

      const result = await setSignUp(data);
      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success('Register Berhasil');
        // router.push('/sign-up-success');
        router.push('/auth/login');
        // [CODE UPDATE] di tutorial saya simpan remove user-form disini,
        // saya rubah remove nya menjadi di halaman setelahnya.
        // localStorage.removeItem('user-form');
      }
    } else {
      toast.error('Mohon ceklist pada agreement');
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
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
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
                    // onClick={(e) => e.preventDefault()}
                    onClick={renderProps.onClick}
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
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  {/* <InputGroupAddon addonType="prepend"> */}
                  <InputGroupText>
                    <i className="ni ni-hat-3" />
                  </InputGroupText>
                  {/* </InputGroupAddon> */}
                  <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
              <div className="text-muted font-italic">
                <small>
                  password strength:{' '}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <Input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      checked={agreement}
                      onChange={(event) => {
                        setAgreement(event.target.checked);
                      }}
                    />
                    <Label
                      className="custom-control-label"
                      for="customCheckRegister"
                      check
                    >
                      I agree with the{' '}
                      <a href="#home" onClick={(e) => e.preventDefault()}>
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={onSubmit}
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

// Register.layout = Auth;
Register.getLayout = function getLayout(page: ReactElement) {
  return <Auth>{page}</Auth>;
};

export default Register;
