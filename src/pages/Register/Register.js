import React, { Component } from 'react'
import Layout from '../../components/Layout/index';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Flex,
    Text,
    Button
  } from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { toast } from 'react-toastify';
import { Link, Redirect } from "react-router-dom";
import { postData, setCredentials, checkCredentials } from '../../components/Auth/index';
import { serverURL } from '../../server-config'


export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }
  componentDidMount() {
    if (checkCredentials()) {
      this.setState({ redirect: "/" });
    }
  }

  validateName(value) {
    let error;
    if (!value) {
      error = "😢 Please enter your name.";
    }
    return error;
  }
  validateEmail(value) {
    let error;
    if (!value) {
      error = "💔 Oops! We need your email.";
    }
    return error;
  }
  validatePassword(password) {
    let error;
    if (!password) {
      error = "🐱 Shhhh! You need to have a password.";
    } else if (password.length < 8) {
      error = "🦆 Toooooooo short! It has to be atleast 8 characters long.";
    }
    return error;
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Layout
        title="Register"
      >
        <Flex
          align="center"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={5}
          padding={15}
        >
          <Text fontSize="6xl">Register</Text>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={(values, actions) => {
              postData(serverURL + "/user", values).then((data) => {
                if (data.error) {
                  toast.error("🤐 Oops! " + data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  actions.setSubmitting(false);
                } else {
                  toast.dark("✅ Registered...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setCredentials(data.token);
                  localStorage.setItem('user', JSON.stringify(data.user));
                  actions.setSubmitting(false);
                  this.setState({ redirect: "/dashboard" });
                  console.log(data);
                }
              });
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Field name="name" validate={this.validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        {...field}
                        id="name"
                        placeholder="eg. Elon Musk"
                        type="text"
                        autoComplete="name"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={this.validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="eg. hello@tesla.com"
                        type="email"
                        autoComplete="email"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={this.validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        {...field}
                        id="password"
                        placeholder="eg. ISecretleyLoveNasa@28"
                        type="password"
                        autoComplete="new-password"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  style={{ marginTop: "2rem", width: "100%" }}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Sign Up
                </Button>
                <Link to="/login">
                  <Button style={{ marginTop: "1rem", width: "100%" }}>
                    <span role="img" aria-label="Peeking above.">
                      🙄
                    </span>{" "}
                    Want to login instead?
                  </Button>
                </Link>
              </form>
            )}
          </Formik>
        </Flex>
      </Layout>
    );
  }
}

export default Register;