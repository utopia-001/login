import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { register } from "../services/auth.service";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;
    if (username && email && password) {
      register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="grid justify-items-center content-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form>
          {!successful && (
            <div>
              <div className="my-4">
                <Field name="username" type="text" className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-white text-sm"
                />
              </div>

              <div className="my-4">
                <Field name="email" type="email" className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-white text-sm"
                />
              </div>

              <div className="my-4">
                <Field
                  name="password"
                  type="password"
                  className="bg-gray-900 bg-opacity-20 border w-96 border-none text-gray-300 text-sm rounded block p-2.5" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-white text-sm"
                />
              </div>

              <div className="flex gap-8 my-4 justify-center">
                <a href="/login" className="py-2 px-4 text-sm font-medium text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-40 rounded-lg border-1 border-gray-700 hover:bg-gray-900 w-36 text-center">
                  <span>To Login</span>
                </a>

                <button type="submit" className="py-2 px-4 text-sm font-medium text-white bg-gray-800 bg-opacity-20 hover:bg-opacity-40 rounded-lg border-1 border-gray-700 hover:bg-gray-900 w-36 text-center">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="my-4">
              <div className="text-white text-sm">
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
