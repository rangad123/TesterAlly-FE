// // App.js

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
// import AppNavBar from "./components/AppNavBar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import ForgotPassword from "./pages/ForgotPassword";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ResetPassword from "./pages/ResetPassword";
// import Profile from "./pages/Profile";
// import PostLogin from "./pages/DashBoard";
// import Sidebar from "./pages/Sidebar";
// import { useState,useEffect } from "react";
// import { TiThMenu } from "react-icons/ti";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     // Check if the user is logged in when the app loads
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     const storedName = localStorage.getItem("name");
//     const storedEmail = localStorage.getItem("email");

//     if (storedIsLoggedIn === "true") {
//       setIsLoggedIn(true);
//       setName(storedName);
//       setEmail(storedEmail);
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
//   };

//   return (
//     <div className="md:h-screen bg-purple-100">
//       <BrowserRouter>
//         <ToastContainer />
//         <AppNavBar
//           isLoggedIn={isLoggedIn}
//           setIsLoggedIn={setIsLoggedIn}
//           name={name}
//           setName={setName}
//           email={email}
//           setEmail={setEmail}
//         />
//         {isLoggedIn && (
//           <button
//             onClick={toggleSidebar}
//             className="fixed top-14 left-0 z-50 px-4 py-2 bg-gray-300 rounded shadow-md"
//           >
//             <TiThMenu />
//           </button>
//         )}
//         {/* Sidebar Component */}
//         <div className="">
//         <Sidebar
//           isOpen={isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//           isLoggedIn={isLoggedIn}
//           setIsLoggedIn={setIsLoggedIn}
//           setName={setName}
//           setEmail={setEmail}
//         />

//         <div
//         // className={`transition-all duration-300 ease-in-out ${
//         //       isSidebarOpen ? "ml-96" : "ml-64"
//         //     }`}

//             >
//           <Routes>
//             <Route path="/" exact
//               element={
//                 <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//               }
//             />
//             <Route path="register" exact
//               element={
//                 <Register
//                   isLoggedIn={isLoggedIn}
//                   setIsLoggedIn={setIsLoggedIn}
//                   setName={setName}
//                   setEmail={setEmail}
//                 />
//               }
//             />
//             <Route path="login" exact
//               element={
//                 <Login
//                   isLoggedIn={isLoggedIn}
//                   setIsLoggedIn={setIsLoggedIn}
//                   setName={setName}
//                   setEmail={setEmail}
//                 />
//               }
//             />
//             <Route path="forgotPassword" exact
//               element={<ForgotPassword isLoggedIn={isLoggedIn} />}
//             />
//             <Route path="resetPassword"
//               element={<ResetPassword isLoggedIn={isLoggedIn} />}
//             />
//             <Route path="profile" exact
//               element={
//                 <Profile isLoggedIn={isLoggedIn} name={name} email={email} />
//               }
//             />
//             <Route path="dashboard" exact
//               element={
//                 <PostLogin isLoggedIn={isLoggedIn} name={name} email={email} />
//               }
//             />
//           </Routes>
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
// import AppNavBar from "./components/AppNavBar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import ForgotPassword from "./pages/ForgotPassword";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ResetPassword from "./pages/ResetPassword";
// import Profile from "./pages/Profile";
// import PostLogin from "./pages/DashBoard";
// import Sidebar from "./pages/Sidebar";
// import { useState, useEffect } from "react";
// import { TiThMenu } from "react-icons/ti";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     const storedName = localStorage.getItem("name");
//     const storedEmail = localStorage.getItem("email");

//     if (storedIsLoggedIn === "true") {
//       setIsLoggedIn(true);
//       setName(storedName);
//       setEmail(storedEmail);
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setIsSidebarOpen(false); // Reset sidebar state on logout
//     setName("");
//     setEmail("");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("name");
//     localStorage.removeItem("email");
//   };

//   return (
//     <div className="md:h-screen bg-purple-100">
//       <BrowserRouter>
//         <ToastContainer />
//         {/* <div className="fixed top-0 left-0 w-full z-50 bg-white"> */}
//         <AppNavBar
//           isLoggedIn={isLoggedIn}
//           setIsLoggedIn={setIsLoggedIn}
//           name={name}
//           setName={setName}
//           email={email}
//           setEmail={setEmail}
//         />
//         {/* </div> */}
//         <div className="h-full flex">
//           {isLoggedIn && (
//             <>
//               <button
//                 onClick={toggleSidebar}
//                 className="fixed left-0 z-50 px-4 py-2 bg-gray-300 rounded shadow-md"
//                 style={{ top: "52px" }}
//               >
//                 <TiThMenu />
//               </button>
//               <Sidebar
//                 isOpen={isSidebarOpen}
//                 toggleSidebar={toggleSidebar}
//                 isLoggedIn={isLoggedIn}
//                 setIsLoggedIn={setIsLoggedIn}
//                 setName={setName}
//                 setEmail={setEmail}
//                 onLogout={handleLogout}
//               />
//             </>
//           )}
//           <div
//             className={`transition-all duration-300 ease-in-out flex-grow ${
//               isSidebarOpen && isLoggedIn ? "ml-72" : "ml-0"
//             }`}
//           >
//             <Routes>
//               <Route
//                 path="/"
//                 exact
//                 element={
//                   <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//                 }
//               />
//               <Route
//                 path="register"
//                 exact
//                 element={
//                   <Register
//                     isLoggedIn={isLoggedIn}
//                     setIsLoggedIn={setIsLoggedIn}
//                     setName={setName}
//                     setEmail={setEmail}
//                   />
//                 }
//               />
//               <Route
//                 path="login"
//                 exact
//                 element={
//                   <Login
//                     isLoggedIn={isLoggedIn}
//                     setIsLoggedIn={setIsLoggedIn}
//                     setName={setName}
//                     setEmail={setEmail}
//                   />
//                 }
//               />
//               <Route
//                 path="forgotPassword"
//                 exact
//                 element={<ForgotPassword isLoggedIn={isLoggedIn} />}
//               />
//               <Route
//                 path="resetPassword"
//                 element={<ResetPassword isLoggedIn={isLoggedIn} />}
//               />
//               <Route
//                 path="profile"
//                 exact
//                 element={
//                   <Profile isLoggedIn={isLoggedIn} name={name} email={email} />
//                 }
//               />
//               <Route
//                 path="dashboard"
//                 exact
//                 element={
//                   <PostLogin
//                     isLoggedIn={isLoggedIn}
//                     name={name}
//                     email={email}
//                   />
//                 }
//               />
//             </Routes>
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import PostLogin from "./pages/DashBoard";
import Sidebar from "./pages/Sidebar";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
// import { MdDashboard } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";
// import { RiLogoutBoxLine } from "react-icons/ri";
// import Dropdown from "./pages/Dropdown";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setName(storedName);
      setEmail(storedEmail);
    }
  }, []);

  
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  // let navigate = useNavigate();
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false); // Reset sidebar state on logout
    setName("");
    setEmail("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    // navigate("/");
  };

  return (
    <div className="bg-purple-100">
      <BrowserRouter>
        <ToastContainer />
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <AppNavBar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
          />
        </div>

        {/* Main Content with Padding */}
        <div className="h-full flex flex-col" style={{ paddingTop: "64px" }}>
          {isLoggedIn && (
            <>
              {/* Sidebar Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="md:fixed md:top-[78px] md:left-0 md:z-50 md:px-4 md:py-2 bg-gray-300 md:rounded md:shadow-md"
              >
                <TiThMenu />
              </button>
              {/* Sidebar Component */}
              <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'} md:relative`}>
                <Sidebar
                  isOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setName={setName}
                  setEmail={setEmail}
                  onLogout={handleLogout}
                  className='w-64 md:w-48 h-full md:h-64'
                />
              </div>

              

              
              {/* Dropdown for small screens */}
              {/* <div className="block md:hidden"> */}
                {/* <button
                  onClick={toggleDropdown}
                  className="fixed top-[78px] left-0 z-50 px-4 py-2 bg-gray-300 rounded shadow-md"
                >
                  <TiThMenu />
                </button>
                {isDropdownOpen && (
                    <div className="block md:hidden">
                    <Dropdown
                      isDropdownOpen={isDropdownOpen}
                      toggleDropdown={toggleDropdown}
                      // isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      setName={setName}
                      setEmail={setEmail}
                    />
                  </div>
                )} */}
              {/* </div> */}
            </>
          )}
          {/* Content Area */}
          <div
            className={`transition-all duration-300 ease-in-out flex-grow ${
              isSidebarOpen && isLoggedIn ? "ml-72" : "ml-0"
            }`}
          >
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                }
              />
              <Route
                path="register"
                exact
                element={
                  <Register
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setName={setName}
                    setEmail={setEmail}
                  />
                }
              />
              <Route
                path="login"
                exact
                element={
                  <Login
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setName={setName}
                    setEmail={setEmail}
                  />
                }
              />
              <Route
                path="forgotPassword"
                exact
                element={<ForgotPassword isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="resetPassword"
                element={<ResetPassword isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="profile"
                exact
                element={
                  <Profile isLoggedIn={isLoggedIn} name={name} email={email} />
                }
              />
              <Route
                path="dashboard"
                exact
                element={
                  <PostLogin
                    isLoggedIn={isLoggedIn}
                    name={name}
                    email={email}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
