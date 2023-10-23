import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../store/api/AuthSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {

  const [loginUser] = useLoginMutation()
  const navigate = useNavigate()

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter email")
      .email("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });

  const handleSubmit = (values) => {
    loginUser(values).then((result) => {
      alert(result.data.message)
      navigate("/profile")
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
          <h1 className="text-slate-900 font-bold text-3xl my-4">Login</h1>
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
            Sign In
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
