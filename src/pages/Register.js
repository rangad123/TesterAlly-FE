import axios from "axios";
import { toast } from "react-toastify";
import CountryInput from "../components/CountryInput";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const URL = "https://testerally-be-ylpr.onrender.com/api/register/";

const Register = (props) => {
  const { setName, setEmail } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

  const toggleConfPasswordVisibility = () => {
    setIsConfPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    const form = document.querySelector("form");
    if (form) {
      form.setAttribute("autocomplete", "off");
    }
  }, []);

  const handleRegister = async (ev) => {
    ev.preventDefault();

    const name = ev.target.name.value.trim();
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const confirmpassword = ev.target.confirmpassword.value;
    const country = ev.target.country.value;
    const phone = ev.target.phone.value;

    if (country === "Select Country") {
      toast.error("Select your country!");
    } else if (password !== confirmpassword) {
      toast.error("Passwords do not match!");
    } else {
      const formData = {
        name: name,
        email: email,
        password: password,
        country: country,
        phone: phone,
      };
      try {
        const res = await axios.post(URL, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        if (data.success === true) {
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          toast.success("Registration successful! You can now log in.");
          setName(name);
          setEmail(email);

          ev.target.reset();

          setTimeout(() => {
            window.location.href = "/dashboard/login";
          }, 2000);
          
        } else {
          toast.error(data.message || "Registration failed. Please try again.");
        }
      } catch (err) {

        console.error('Error details:', err.response);
        if (err.response) {

          if (err.response.status === 409) {
            toast.error(err.response.data.message || "Email is already registered..");
          } else {
            toast.error(err.response.data.message || "An error occurred during registration. Please try again.");
          }
        } else {
          toast.error("An error occurred during registration. Please try again.");
        }
      }
      
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
      <div className="hidden lg:block w-1/2">
        <img src="/register-illustration.svg" alt="TesterAlly Register" className="w-full max-w-2xl mx-auto transform scale-125 transition-transform duration-300 hover:scale-130" />
      </div>
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 " style={{ marginTop: "50px" }}>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-"
            action="POST"
            onSubmit={handleRegister}
            autoComplete="new-password"
          >
            <div>
              <div className="mb-2 block">
                <label htmlFor="name" className="text-sm font-medium required">
                  Name
                </label>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => {
                  const { value } = e.target;
                  if (/[^a-zA-Z\s]/.test(value)) {
                    toast.error("Name can only contain letters.");
                  }
                }}
                placeholder="Your Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
                autoComplete="off"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <label htmlFor="email" className="text-sm font-medium required">
                  Email
                </label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                placeholder="Your Email"
                required
                autoComplete="off"
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <div className="mb-2 block">
                  <label htmlFor="password" className="text-sm font-medium required">
                    Password
                  </label>
                </div>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                  minLength="6"
                  autoComplete="new-password"
                />
                <div
                  className="-mt-8 md:ml-52 ml-60 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FaEye className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <label
                    htmlFor="confirmpassword"
                    className="text-sm font-medium required"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  type={isConfPasswordVisible ? "text" : "password"}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="Re-enter Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                  autoComplete="new-password"
                />
                <div
                  className="-mt-8 md:ml-52 ml-60 cursor-pointer"
                  onClick={toggleConfPasswordVisibility}
                >
                  {isConfPasswordVisible ? (
                    <FaEyeSlash className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FaEye className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <CountryInput />
            <div className="max-w-xl">
              <div className="mb-2 block">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
              </div>
              <input
                type="text"
                id="phone"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                maxLength={10}
                pattern="^[79][0-9]{9}"
                placeholder="Your Phone Number"
                aria-errormessage="Phone number must start with 7 or 9"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
            >
              Create an account
            </button>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/dashboard/login"
                className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
              >
                Login Here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
