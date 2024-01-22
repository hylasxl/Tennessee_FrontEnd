import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import AccountPage from "../pages/Account/Account";
import AdminAccountManagementPage from "../pages/Admin/Admin_AccountManagement";
import AdminAccountManagementUserInfo from "../pages/Admin/Admin_AccountManagement_UserInfo"
import AdminCourseManagement from "../pages/Admin/Admin_CourseManagement"
import AdminClassManagement from "../pages/Admin/Admin_ClassManagement";
import EducationalAffairCourseManagement from "../pages/Educational_Affair/Educational_Affair_Course_Management";
import EducationalAffairCreateCourse from "../pages/Educational_Affair/Educational_Affair_Create_Course";

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

      <PrivateRoutes path='/account' element={<AccountPage />}></PrivateRoutes>
      <PrivateRoutes path='/admin/account' element={<AdminAccountManagementPage />}></PrivateRoutes>
      <PrivateRoutes path='/admin/account/user-info/:username' element={<AdminAccountManagementUserInfo />}>
      </PrivateRoutes>
      <PrivateRoutes path='/admin/course' element={<AdminCourseManagement />}></PrivateRoutes>
      <PrivateRoutes path='/admin/class' element={<AdminClassManagement />}></PrivateRoutes>
      <PrivateRoutes path='/educational-affair/course' element={<EducationalAffairCourseManagement />}></PrivateRoutes>
      <PrivateRoutes path='/educational-affair/course/create-new-course' element={<EducationalAffairCreateCourse/>}></PrivateRoutes>
    </>
  );
};

export default AppRoutes;
