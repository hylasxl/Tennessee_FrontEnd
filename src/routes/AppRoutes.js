import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import AccountPage from "../pages/Account/Account";

import AdminAccountManagementPage from "../pages/Admin/Admin_AccountManagement";
import AdminAccountManagementUserInfo from "../pages/Admin/Admin_AccountManagement_UserInfo"
import AdminCourseManagement from "../pages/Admin/Admin_CourseManagement"
import AdminClassManagement from "../pages/Admin/Admin_ClassManagement";
import AdminCourseDetail from "../pages/Admin/Admin_CourseDetail";

import EducationalAffairCourseManagement from "../pages/Educational_Affair/Educational_Affair_Course_Management";
import EducationalAffairCreateCourse from "../pages/Educational_Affair/Educational_Affair_Create_Course";
import EducationalAffairClassManagement from "../pages/Educational_Affair/Educational_Affair_Class_Management";
import EducationalAffairLecturerManagement from "../pages/Educational_Affair/Educational_Affair_Lecturer_Management";


const AppRoutes = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage page="LOGIN" pageTitle="LOGIN" />}
        />


      <Route path='/account' element={<AccountPage />}></Route>
      <Route path='/admin/account' element={<AdminAccountManagementPage />}></Route>
      <Route path='/admin/account/user-info/:username' element={<AdminAccountManagementUserInfo />}>
      </Route>
      <Route path='/admin/course' element={<AdminCourseManagement />}></Route>
      <Route path='admin/course/detail/:data' element={<AdminCourseDetail/>}></Route>
      <Route path='/admin/class' element={<AdminClassManagement />}></Route>


      <Route path='/educational-affair/course' element={<EducationalAffairCourseManagement />}></Route>
      <Route path='/educational-affair/course/create-new-course' element={<EducationalAffairCreateCourse/>}></Route>
      <Route path='/educational-affair/class' element={<EducationalAffairClassManagement/>}></Route>
      <Route path="/educational-affair/lecturer" element={<EducationalAffairLecturerManagement/>}></Route>
      
      </Routes>
    </>
  );
};

export default AppRoutes;
