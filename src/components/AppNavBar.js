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
import UserIcon from "../images/user.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const AppNavBar = (props) => {
  let navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/");
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

  const currentEmail = email || localStorage.getItem("userEmail") || "No email"

  const handleLogoClick = () => {
    if (!isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <div className="py-2">
      <Navbar fluid>
        <Navbar.Brand>
          <img
            src="/logo2.jpg"
            className="mr-3 h-8 sm:h-12"
            alt="Flowbite React Logo"
            onClick={handleLogoClick}
          />
          <span className="self-center whitespace-nowrap text-3xl font-bold dark:text-white bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent" >
            TesterAlly
          </span>
        </Navbar.Brand>

        {isLoggedIn ? (
            <>
            <div className="flex items-center space-x-4">
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
            </>
          ) : (

            <>
            <div className="auth-buttons">
              <button
                onClick={() => navigate("/dashboard/login")}
                className="text-white font-medium text-lg px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/dashboard/register")}
                className="text-white font-medium text-lg px-4 py-2 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
              >
                Sign Up
              </button>
            </div>
            </>
          )}
      </Navbar>
    </div>
  );
};

export default AppNavBar;
