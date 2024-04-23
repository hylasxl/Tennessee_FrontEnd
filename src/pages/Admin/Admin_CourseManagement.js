import AdminNavigation from "../../components/Navigation/Admin_Navigation/Admin_Navigation";
import CourseTable from "../../components/Tables/CourseTable";


const AdminCourseManagement = ()=>{
    return (<>
            <div className="page-container">
                <AdminNavigation />
                <div style={{margin: '80px 20px'}}>
                    <CourseTable role='admin'/>
                </div>
            </div>
    </>)
}


export default AdminCourseManagement;