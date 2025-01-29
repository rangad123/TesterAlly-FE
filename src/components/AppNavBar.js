// import { Avatar, Dropdown, Navbar } from "flowbite-react";
// import UserIcon from "../images/user.png";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const AppNavBar = (props) => {
//   let navigate = useNavigate();

//   const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

//   // Handle Logout
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setName(null);
//     setEmail(null);
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("name");
//     localStorage.removeItem("email");
//     navigate("/");
//     toast.success("You are successfully logged out!");
//   };

//   // On component mount, check if user is logged in using localStorage
//   useEffect(() => {
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     const storedName = localStorage.getItem("name");
//     const storedEmail = localStorage.getItem("email");

//     if (storedIsLoggedIn === "true") {
//       setIsLoggedIn(true);
//       setName(storedName);
//       setEmail(storedEmail);
//     }
//   }, [setIsLoggedIn, setName, setEmail]);

//   console.log("isLoggedIn in AppNavBar:", isLoggedIn);

//   return (
//     <div className="py-2">
//       <Navbar fluid>
//         <Navbar.Brand>
//           <img
//             src="logo.png"
//             className="mr-3 h-6 sm:h-9"
//             alt="Flowbite React Logo"
//           />
//           <span className="self-center whitespace-nowrap text-3xl font-bold dark:text-white bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
//             TesterAlly
//           </span>
//         </Navbar.Brand>

//         {isLoggedIn && (
//           <div className="flex md:order-2">
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={
//                 <Avatar
//                   alt="User settings"
//                   img={UserIcon}
//                   className="h-10 w-10"
//                   rounded
//                 />
//               }
//             >
//               <Dropdown.Header>
//                 <span className="block text-sm">{name}</span>
//                 <span className="block truncate text-sm font-medium">{email}</span>
//               </Dropdown.Header>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
//             </Dropdown>
//           </div>
//         )}
//       </Navbar>
//     </div>
//   );
// };

// export default AppNavBar;

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FaPlay } from "react-icons/fa";
import UserIcon from "../images/user.png";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import "./AppNavBar.css"

import "./AppNavBar.css";

const AppNavBar = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`selectedProject_${userId}`);
    }
    localStorage.removeItem("userId");

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("sessionActive");
    localStorage.removeItem("projects");

    setIsLoggedIn(false);
    setName("");
    setEmail("");

    navigate("/dashboard/login");
    toast.success("You are successfully logged out!");
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setName(storedName);
      setEmail(storedEmail);
    }
  }, [setIsLoggedIn, setName, setEmail]);

  console.log("isLoggedIn in AppNavBar:", isLoggedIn);

  const currentEmail = email || localStorage.getItem("userEmail") || "No email";

  const handleLogoClick = () => {
    if (!isLoggedIn) {
      navigate("/");
    }
  };

  const handleRunClick = () => {
    navigate("/dashboard-user");
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="py-2">
      <Navbar fluid>
        <Navbar.Brand>
          <img
            src="/logo2.jpg"
            className="mr-3 h-8 sm:h-12 logo-img"
            alt="Flowbite React Logo"
            onClick={handleLogoClick}
          />
          <span className="self-center whitespace-nowrap text-3xl font-bold brand-text">
            TesterAlly
          </span>
        </Navbar.Brand>

        {/* If Admin is logged in, show centered blue links */}
        {isAdminRoute && isLoggedIn && (
          <div className="flex-1 flex justify-center space-x-8 admin-nav-container">
            <Link
              to="/admin-dashboard"
              className="text-lg font-medium text-blue-600 hover:text-blue-800 admin-nav-link"
              data-name="Dashboard"
            >
              <DashboardIcon />
            </Link>
            <Link
              to="/admin-organization"
              className="text-lg font-medium text-blue-600 hover:text-blue-800 admin-nav-link"
              data-name="Organization"

            >
              <CorporateFareIcon/>
            </Link>
            <Link
              to="/admin-setting"
              className="text-lg font-medium text-blue-600 hover:text-blue-800 admin-nav-link"
              data-name="SettingPanel"
            >
              <AdminPanelSettingsIcon/>
            </Link>
          </div>
        )}

        {isAdminRoute ? (
          isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Dropdown
                arrowIcon={true}
                inline
                label={
                  <Avatar
                    alt="Admin settings"
                    img={UserIcon}
                    className="h-10 w-10"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">Admin</span>
                  <span className="block truncate text-sm font-medium">
                    {currentEmail}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              </Dropdown>
            </div>
          ) : null
        ) : isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-3 py-1 bg-purple-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition duration-200"
              onClick={handleRunClick}
            >
              <FaPlay className="h-4 w-4 mr-2" />
              Run
            </button>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={UserIcon}
                  className="h-10 w-10"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{name}</span>
                <span className="block truncate text-sm font-medium">
                  {currentEmail}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className="text-sm/6 font-semibold text-gray-900 auth-buttons">
            <button
              onClick={() => navigate("/dashboard/login")}
              className="login-button"
            >
              Login<span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}
      </Navbar>
    </div>
  );
};

export default AppNavBar;
