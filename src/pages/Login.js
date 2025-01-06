import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const URL = "https://testerally-be-ylpr.onrender.com/api/login/";

const Login = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  const togglePasswordVisiblity = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setName, setEmail } = props;

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard-user");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const form = document.querySelector("form");
    if (form) {
      form.setAttribute("autocomplete", "off");
    }
  }, []);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    setLoading(true); 

    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const formData = { email, password };
  
    try {
      const res = await axios.post(URL, formData);
      const data = res.data;
  
      if (data.success === true) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", data.user.name);
        toast.success(data.message);
        
        console.log("user data", data.user);

        setIsLoggedIn(true);
        setEmail(email);
        setName(data.user.name);
        navigate("/dashboard-user");
      } else {
        toast.error(data.message || "An error occurred during login.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Invalid email or password."
        );
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div className="w-full flex justify-center my-4 items-center min-h-screen -mt-10">
      <div className="hidden lg:block w-1/2">
        <img src="/login.svg" alt="TesterAlly Login" className="w-full max-w-lg mx-auto" />
      </div>
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Login to your account
        </h5>
        <form
          className="w-full flex max-w-md flex-col gap-4"
          onSubmit={handleLogin}
          autoComplete="off"
        >
          <div>
            <label htmlFor="email" className="text-sm font-medium required">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium required">
              Password
            </label>
            <div className="text-sm">
              <span
                className="font-semibold text-purple-600 hover:text-purple-500 cursor-pointer"
                onClick={() => navigate("/forgotPassword")}
              >
                Forgot password?
              </span>
              </div>
              </div>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Your Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 pr-10"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisiblity}
              >
                {isPasswordVisible ? (
                  <FaEyeSlash className="w-5 h-5 text-gray-400" />
                ) : (
                  <FaEye className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="remember" className="text-sm font-medium">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Not yet registered?{" "}
            <a
              href="/dashboard/register"
              className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
            >
              Register Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
