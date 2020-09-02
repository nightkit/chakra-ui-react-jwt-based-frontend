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
import { serverURL } from '../../server-config';

export class Login extends Component {
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
      validateEmail(value) {
        let error;
        if (!value) error = "💔 Oops! We need your email.";
        return error;
      }
      validatePassword(value) {
        let error;
        if (!value) error = "🥁 Dum dum dum, where's your password?";
        return error;
      }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
          }
        return (
            <div>
                <Layout title="Login">
                <Flex
                    align="center"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    mt={5}
                    padding={15}
                    >
                    <Text fontSize="6xl">Login</Text>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values, actions) => {
                        postData(serverURL + "/user/login", values).then((data) => {
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
                            toast.dark("✅ Logging in...", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setCredentials(data.token);
                            localStorage.setItem("user", JSON.stringify(data.user));
                            actions.setSubmitting(false);
                            this.setState({ redirect: "/" });
                            }
                        });
                        }}
                    >
                        {(props) => (
                        <form onSubmit={props.handleSubmit} style={{ maxWidth: "90vw" }}>
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
                            designType="primary"
                            isLoading={props.isSubmitting}
                            type="submit"
                            >
                            Login
                            </Button>
                            <Link to="/register">
                            <Button style={{ marginTop: "1rem", width: "100%" }}>
                                <span role="img" aria-label="Peeking above.">
                                🙄
                                </span>
                                Don't have an account?
                                
                                <Text display={["none", "block", "block", "block"]}>
                                Register instead.
                                </Text>
                            </Button>
                            </Link>
                        </form>
                        )}
                    </Formik>
                    </Flex>
                </Layout>
            </div>
        )
    }
}

export default Login
