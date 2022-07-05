import React, { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
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
import { setForgotpass } from '../../../services/auth';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const Forgotpass: NextPageWithLayout = () => {
  const [formData, setFormData] = useState({
    email: '',
    submitText: 'Request new password',
    submitDisable: false,
  });
  const { email, submitText, submitDisable } = formData;

  const onChange = async (
    inputName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [inputName]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      // console.log('Error');
      toast.error('Email is required !!!');
    } else {
      setFormData({
        ...formData,
        submitText: 'Requesting new password',
        submitDisable: true,
      });
      const response = await setForgotpass(formData);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('We have sent recovery link to your email !!!');
      }
      setFormData({
        ...formData,
        submitText: 'Request new password',
        submitDisable: false,
      });
    }
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
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#home"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img alt="..." src="/img/icons/common/google.svg" />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={onSubmit}>
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
                    onChange={(event) => {
                      onChange('email', event);
                      // setEmail(event.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  disabled={submitDisable}
                  onClick={(e) => {
                    // console.log('Sign in lagi ');
                    // toast.success('Login Process !!!');
                    onSubmit(e);
                  }}
                >
                  {submitText}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#home"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
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

// Forgotpass.layout = Auth;
Forgotpass.getLayout = function getLayout(page: ReactElement) {
  return <Auth>{page}</Auth>;
};

export default Forgotpass;
