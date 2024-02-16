import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; 
import Twitter from "../assets/Twitter.png";
import { useNavigate } from "react-router-dom";
function Signup() {
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    location: "",
    profile: "",
    bio: "",
  };


  const navigate = useNavigate()

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    userName: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(12, "Too Long!")
      .required("Required"),
    location: Yup.string().min(2, "Too Short!").required("Required"),
    profile: Yup.string().required("Required"),
    bio: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });



  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      navigate('./home')
    }, 400);
  };

  return (
    <div className="flex bg-[#16202A] min-h-screen justify-center items-center">
      <div className="">
        <div className=" bg-[#133653] rounded-lg flex flex-col py-5 px-14 justify-between border-gray-300">
          <div className="flex justify-between items-start">
            <div className="flex w-full mt-4 justify-center items-center">
              <img className="w-12" src={Twitter} alt="Twitter Logo" />
            </div>
          </div>
          <div className="mt-7 text-white mb-4 flex flex-col items-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col justify-center items-center">
                  <div className="mt-3 text-left text-2xl">
                    Create an Account
                  </div>
                  <div className=" flex flex-row">
                    <div>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="border mt-7 bg-black border-gray-400 w-44  mr-7  rounded-md py-2 px-4 mb-4 text-white"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="border mt-7 bg-black border-gray-400 w-44   rounded-md py-2 px-4 mb-4 text-white"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="userName"
                      placeholder="User Name"
                      className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email Id"
                      className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      type="Password"
                      name="password"
                      placeholder="Password"
                      className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="location"
                      placeholder="Location"
                      className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="profile"
                      placeholder="Profile"
                      className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                    />
                    <ErrorMessage
                      name="profile"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="bio"
                      placeholder="Bio"
                      className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  {/* Other form fields go here */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-7 mb-7 bg-blue-500 text-white w-72 rounded-md py-2 px-4"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="w-3/6 h-screen">{/* 2nd div */}</div>
    </div>
  );
}

export default Signup;
