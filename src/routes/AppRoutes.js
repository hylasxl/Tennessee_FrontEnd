import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import AccountPage from "../pages/Account/Account";
import Admin_AccountManagementPage from "../pages/Admin/Admin_AccountManagement";
const AppRoutes = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage page="LOGIN" pageTitle="LOGIN" />}
        />
        
        
      </Routes>
      <PrivateRoutes path='/account' element={<AccountPage/>}></PrivateRoutes>
      <PrivateRoutes path='/admin/account' element={<Admin_AccountManagementPage/>}></PrivateRoutes>
    </>
  );
};

export default AppRoutes;
