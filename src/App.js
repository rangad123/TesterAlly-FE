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
import Sidebar from "./pages/Sidebar";
import UserDashboard from "./pages/UserDashboard";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import CreateTestCases from "./pages/CreateTestCases";
import WriteTestManually from "./pages/WriteTestManually";
import TestSuite from "./pages/TestSuite";
import CreateTestSuite from "./pages/CreateTestSuite";
import DashBoard from "./pages/DashBoard";
import PrivateRoute from "./pages/PrivateRoute";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectMembers from "./pages/ProjectMembers";
import TestCasePriorities from "./pages/TestCasePriorities";
import TestCases from "./pages/TestCases";
import Requirement from "./pages/Requirement";
import RequirementTypes from "./pages/RequirementTypes";
import TestcasesTypes from "./pages/TestcasesTypes"
import TestSuites from "./pages/TestSuites";
import RequirementDetails from "./pages/RequirementDetails";
// import { MdDashboard } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";
// import { RiLogoutBoxLine } from "react-icons/ri";
// import Dropdown from "./pages/Dropdown";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const sessionActive = sessionStorage.getItem("sessionActive");

    if (storedIsLoggedIn === "true" && sessionActive !== "true") {
      handleLogout();
    } else if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setName(storedName);
      setEmail(storedEmail);
      sessionStorage.setItem("sessionActive", "true");
    }

    const handleStorageChange = (event) => {
      if (event.key === "isLoggedIn" && event.newValue !== "true") {
        handleLogout(); 
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`selectedProject_${userId}`);
    }
    localStorage.removeItem("userId");
  
    setIsLoggedIn(false);
    setName("");
    setEmail("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("sessionActive");

  };

  console.log("localStorage after logout:", localStorage);
  console.log("sessionStorage after logout:", sessionStorage);

  


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
              {/* Sidebar Component */}
              <div>
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

            </>
          )}
          {/* Content Area */}
          <div
            className={`transition-all duration-300 ease-in-out flex-grow ${
              isSidebarOpen && isLoggedIn ? "ml-64" : "ml-0"
            }`}
          >
            <Routes>
              <Route
                path="dashboard"
                exact
                element={
                  <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                }
              />
              <Route
                path="dashboard/register"
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
                path="dashboard/login"
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
                path="resetPassword/:token"
                element={<ResetPassword isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="profile"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Profile name={name} email={email} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                exact
                element={
                  <DashBoard
                    isLoggedIn={isLoggedIn}
                    name={name}
                    email={email}
                  />
                }
              />
              <Route
                path="dashboard-user"
                exact
                element={ 
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="create-project"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <CreateProject  />
                  </PrivateRoute>
                }
              />
              <Route
                path="test-cases/create-testcases"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <CreateTestCases />
                  </PrivateRoute>
                }
              />
              <Route
                path="write-manually"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <WriteTestManually />
                  </PrivateRoute>
                }
              />
              <Route
                path="testsuite"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <TestSuite />
                  </PrivateRoute>
                }
              />
              <Route
                path="/test-suites/create-testsuite"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <CreateTestSuite />
                  </PrivateRoute>
                }
              />
              <Route
                path="project-details"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <ProjectDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="project-members"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <ProjectMembers />
                  </PrivateRoute>
                }
              />
              <Route
                path="test-cases"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <TestCases />
                  </PrivateRoute>
                }
              />
              <Route
                path="testcase-Priorities"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <TestCasePriorities />
                  </PrivateRoute>
                }
              />
              <Route
                path="create-requirement"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Requirement />
                  </PrivateRoute>
                }
              />
              <Route
                path="requirement-type"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <RequirementTypes />
                  </PrivateRoute>
                }
              />
              <Route
                path="testcases-type"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <TestcasesTypes />
                  </PrivateRoute>
                }
              />
              <Route
                path="test-suites"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <TestSuites />
                  </PrivateRoute>
                }
              />
              <Route
                path="requirement-details"
                exact
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <RequirementDetails />
                  </PrivateRoute>
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