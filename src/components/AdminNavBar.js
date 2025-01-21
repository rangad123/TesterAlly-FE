import { Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import './AppNavBar.css';  

const AdminNavBar = () => {
  let navigate = useNavigate();

  const handleLogoClick = () => {
      navigate("/");
  };

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
      </Navbar>
    </div>
  );
};

export default AdminNavBar;

