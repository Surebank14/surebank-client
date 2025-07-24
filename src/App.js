import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Components/CustomerLogin";
import CustomerForgotPassword from "./Components/CustomerForgotPassword";
import CustomerAccountDashboard from "./Components/CustomerAccountDashboard";
import Topbar from "./Components/TopBar";
// import Sidebar from "./Components/SideBar";


function App() {
  const isLoggedIn = useSelector((state) => state.login.token);
  const token = isLoggedIn || localStorage.getItem("authToken");
//  const loggedInStaffRole = useSelector((state) => state.login.staff?.role) || localStorage.getItem("staffRole");

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Track sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Logout logic: Clear token and close sidebar
    localStorage.removeItem("authToken");
    setIsSidebarOpen(false);
  };
  return (
    // <div className="bg-blue-500 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <Router>
      <div className="container mx-auto relative flex  h-screen ">
        {/* Render Sidebar only when logged in */}
        {/* {token && (
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
)} */}

        {/* Overlay for small screens */}
        {isSidebarOpen && token && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1 pt-2">
          {/* Topbar */}
          <Topbar
            isLoggedIn={!!token}
            onLogout={handleLogout}
            toggleSidebar={toggleSidebar}
          />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<CustomerForgotPassword />} />
          <Route path="/customeraccountdashboard/:customerId" element={<CustomerAccountDashboard />} />
        </Routes>
        </div>
        </div>
      </Router>
  );
}

export default App;
