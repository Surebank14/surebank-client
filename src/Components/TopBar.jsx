import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../redux/slices/loginSlice";
import logo from "../images/customerlogo2.png";

const Topbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white text-white px-10 py-1 z-50">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10">
          <img src={logo} alt="Sure Bank" className="rounded-md shadow-sm w-full" />
        </div>

        <div className="flex items-center space-x-3">
          {token &&
            <button
              className="bg-red-600 px-3 py-1.5 rounded text-sm hover:bg-red-500 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Topbar;