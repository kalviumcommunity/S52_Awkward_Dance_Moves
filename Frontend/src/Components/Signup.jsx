import React, { useState } from "react";
import * as Yup from "yup";
import Twitter from "../assets/Twitter.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup({ setlogin, setLoader }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    location: "",
    profile: null,
    bio: "",
  });

  const [errors, setErrors] = useState({});

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
    bio: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const formDataForApi = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataForApi.append(key, value);
      });

      // Resize and upload image
      const blob = await resizeImage(formData.profile);
      formDataForApi.set("profile", blob, "profile.jpg");

      const res = await axios.post(
        "http://localhost:3000/dance/createUser",
        formDataForApi,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201) {
        localStorage.setItem("token", res.data);
        console.log("Image size:", blob.size);
        console.log(res.data.user);
        setlogin(true);
        setLoader(true)
        navigate("/"); // Redirect to home page after successful signup
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  // Function to resize the image
  const resizeImage = async (file) => {
    const maxWidth = 300;
    const maxHeight = 300;
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas to Blob
          canvas.toBlob((blob) => {
            resolve(blob);
          }, "image/jpeg", 0.7); // Adjust quality as needed (0.7 means 70% quality)
        };
      };

      reader.readAsDataURL(file);
    });
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center"
            >
              <div className="mt-3 text-left text-2xl">Create an Account</div>
              <div className=" flex flex-row">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border mt-7 bg-black border-gray-400 w-44  mr-7  rounded-md py-2 px-4 mb-4 text-white"
                  />
                  {errors.firstName && (
                    <div className="text-red-500">{errors.firstName}</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border mt-7 bg-black border-gray-400 w-44   rounded-md py-2 px-4 mb-4 text-white"
                  />
                  {errors.lastName && (
                    <div className="text-red-500">{errors.lastName}</div>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  value={formData.userName}
                  onChange={handleChange}
                  className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                />
                {errors.userName && (
                  <div className="text-red-500">{errors.userName}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Id"
                  value={formData.email}
                  onChange={handleChange}
                  className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                />
                {errors.location && (
                  <div className="text-red-500">{errors.location}</div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={handleChange}
                  className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                />
                {errors.profile && (
                  <div className="text-red-500">{errors.profile}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="border mt-7 bg-black border-gray-400 w-96   rounded-md py-2 px-4 mb-4 text-white"
                />
                {errors.bio && (
                  <div className="text-red-500">{errors.bio}</div>
                )}
              </div>
              <button
                type="submit"
                className="mt-7 mb-7 bg-blue-500 text-white w-72 rounded-md py-2 px-4"
              >
                Sign in
              </button>
              <p className="mt-7 mb-7 text-center text-white rounded-md py-2 px-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className=" underline text-blue-500 font-semibold "
                >
                  Click Here....
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="w-3/6 h-screen">{/* 2nd div */}</div>
    </div>
  );
}

export default Signup;
