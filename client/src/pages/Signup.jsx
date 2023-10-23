import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "../store/api/AuthSlice";
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

function Signup() {

  const [signup] = useSignupMutation()
  const navigate = useNavigate()

  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    email: Yup.string()
      .required("Please enter email")
      .email("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });

  const handleSubmit = (values) => {
    signup(values).then((result) => {
      alert(result.data.message)
      navigate("/login")
    })
  };

  useEffect(() => {
    const token = Cookies.get("token")

    if(token) {
      navigate("/Profile")
    }
  }, [])

  return (
    <div className="max-w-xl mx-auto h-screen flex items-center justify-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValue}
        onSubmit={handleSubmit}
      >
        <Form className="w-full h-screen flex flex-col items-center justify-center gap-3">
          <h1 className="text-slate-900 font-bold text-3xl my-4">Sign Up</h1>

          <div className="w-full flex flex-col gap-2">
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="p-3 w-full rounded bg-slate-100"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Field
              type="text"
              name="email"
              placeholder="Email"
              className="p-3 w-full rounded bg-slate-100"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="p-3 w-full rounded bg-slate-100"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-slate-900 text-white rounded-lg"
          >
            Create Account
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
