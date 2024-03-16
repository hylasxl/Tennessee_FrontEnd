import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import AccountPage from "../pages/Account/Account";
import NotFound from "../pages/404NotFound";

import AdminAccountManagementPage from "../pages/Admin/Admin_AccountManagement";
import AdminAccountManagementUserInfo from "../pages/Admin/Admin_AccountManagement_UserInfo"
import AdminCourseManagement from "../pages/Admin/Admin_CourseManagement"
import AdminClassManagement from "../pages/Admin/Admin_ClassManagement";
import AdminCourseDetail from "../pages/Admin/Admin_CourseDetail";
import AdminLecturerRequest from "../pages/Admin/Admin_LecturerRequest";
import AdminStudentRequest from "../pages/Admin/Admin_StudentRequest";


import EducationalAffairCourseManagement from "../pages/Educational_Affair/Educational_Affair_Course_Management";
import EducationalAffairCreateCourse from "../pages/Educational_Affair/Educational_Affair_Create_Course";
import EducationalAffairClassManagement from "../pages/Educational_Affair/Educational_Affair_Class_Management";
import EducationalAffairLecturerManagement from "../pages/Educational_Affair/Educational_Affair_Lecturer_Management";
import EducationalAffairStudentManagement from "../pages/Educational_Affair/Educational_Affair_Student_Management";
import EducationalAffairRoomManagement from "../pages/Educational_Affair/Educational_Affair_Room_Management";
import EducationalAffairStudentAddNew from "../pages/Educational_Affair/Educational_Affair_Student_AddNew";
import EducationalAffairLecturerAddNew from "../pages/Educational_Affair/Educational_Affair_Lecturer_AddNew";
import EducationalAffairStudentWaitingList from "../pages/Educational_Affair/Educational_Affair_Student_WaitingList";
import EducationalAffairLecturerWaitingList from "../pages/Educational_Affair/Educational_Affair_Lecturer_WaitingList";
import EducationalAffairClassAddNeww from "../pages/Educational_Affair/Educational_Affair_Class_AddNew";
import EducationalAffairClassWaitingList from "../pages/Educational_Affair/Educational_Affair_Class_WaitingList";
import EducationalAffairClassAddStudent from "../pages/Educational_Affair/Educational_Affair_Class_AddStudent";

import StudentClass from "../pages/Student/Student_Class";
import StudentTimetable from "../pages/Student/Student_Timetable"

import LecturerClass from "../pages/Lecturer/Lecturer_Class";
import LecturerTimetable from "../pages/Lecturer/Lecturer_Timetable";
import LecturerAcademicTranscript from "../pages/Lecturer/Lecturer_AcademicTranscipt";
import LecturerCheckAttendance from "../pages/Lecturer/Lecturer_CheckAttendance";

const AppRoutes = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage page="LOGIN" pageTitle="LOGIN" />}
        />


        <Route path='/account' element={<AccountPage />} />
        <Route path='/admin/account' element={<AdminAccountManagementPage />} />
        <Route path='/admin/account/user-info/:username' element={<AdminAccountManagementUserInfo />} />
        <Route path='/admin/course' element={<AdminCourseManagement />} />
        <Route path='admin/course/detail/:data' element={<AdminCourseDetail />} />
        <Route path='/admin/class' element={<AdminClassManagement />} />
        <Route path="/admin/lecturer-request" element={<AdminLecturerRequest/>}/>
        <Route path="/admin/student-request" element={<AdminStudentRequest/>}/>


        <Route path='/educational-affair/course' element={<EducationalAffairCourseManagement />} />
        <Route path='/educational-affair/course/create-new-course' element={<EducationalAffairCreateCourse />} />
        <Route path='/educational-affair/class' element={<EducationalAffairClassManagement />} />
        <Route path="/educational-affair/lecturer" element={<EducationalAffairLecturerManagement />} />
        <Route path="/educational-affair/student" element={<EducationalAffairStudentManagement />} />
        <Route path="/educational-affair/room" element={<EducationalAffairRoomManagement />} />
        <Route path="/educational-affair/student/add-new-student" element={<EducationalAffairStudentAddNew />} />
        <Route path="/educational-affair/student/waiting-list" element={<EducationalAffairStudentWaitingList />} />
        <Route path="/educational-affair/lecturer/add-new-lecturer" element={<EducationalAffairLecturerAddNew />} />
        <Route path="/educational-affair/lecturer/waiting-list" element={<EducationalAffairLecturerWaitingList />} />
        <Route path="/educational-affair/class/create-new-class" element={<EducationalAffairClassAddNeww />} />
        <Route path="/educational-affair/class/waiting-list" element={<EducationalAffairClassWaitingList />} />
        <Route path="/educational-affair/class/add-student" element={<EducationalAffairClassAddStudent />} />

        <Route path="/student/class" element={<StudentClass/>}/>
        <Route path="/student/timetable" element={<StudentTimetable/>}/>

        <Route path="/lecturer/class" element={<LecturerClass/>}/>
        <Route path="/lecturer/timetable" element={<LecturerTimetable />}/>
        <Route path="/lecturer/academic-transcript" element={<LecturerAcademicTranscript />}/>
        <Route path="/lecturer/check-attendance" element={<LecturerCheckAttendance />}/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
