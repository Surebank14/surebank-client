import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");
  // const loggedInStaffRole = useSelector((state) => state.login.staff?.role) || localStorage.getItem("staffRole");

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  const handleMenuClick = (menu) => {
    console.log(`Navigating to: ${menu}`);
    toggleSidebar(); // Close the sidebar after clicking a menu item on small screens
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 mt-12 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0 lg:relative lg:block z-20`}
    >
      {/* Close Button */}
      <button
        className="lg:hidden absolute top-4 right-4 text-white bg-gray-700 rounded-full p-2"
        onClick={toggleSidebar}
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-6">Sidebar</h2>
      <ul>
        <Link to="/dashboard">
        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer text-xs"
          onClick={() => handleMenuClick("Dashboard")}
        >
          Dashboard
        </li>
        </Link>
        <Link to="/branches" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
            Branches
          </li>
        </Link>
    
        <Link to="/staff" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
            Staff
          </li>
        </Link>
        {/* {loggedInStaffRole !== "Agent" && (
          <Link to="/createstaff" className="text-xs">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
              Create Staff
            </li>
          </Link>
        )} */}
        <Link to="/customers" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
            Customers
          </li>
        </Link>
        <Link to="/expenditure" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
          Expenditure
          </li>
        </Link>
        <Link to="/transaction" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
          Transaction
          </li>
        </Link>
        <Link to="/order" className="text-xs">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={toggleSidebar}>
          Order
          </li>
        </Link>

        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer text-xs"
          onClick={() => handleMenuClick("Settings")}
        >
          Settings
        </li>

        {/* Login/Logout Buttons (only on small screens) */}
        <div className="block lg:hidden">
          {token ? (
            <li
              className="bg-red-600 hover:bg-red-500 text-center p-2 rounded cursor-pointer mt-4 text-xs"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <Link to="/login" className="text-xs">
              <li className="bg-green-600 hover:bg-green-500 text-center p-2 rounded cursor-pointer mt-4">
                Login
              </li>
            </Link>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
