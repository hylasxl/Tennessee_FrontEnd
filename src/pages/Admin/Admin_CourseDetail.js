import AdminNavigation from "../../components/Navigation/Admin_Navigation/Admin_Navigation"
import CourseDetail from "../../components/Course/CourseDetail"


const AdminCourseDetail = (props) => {
    return (<>

        <div className="page-container">
            <AdminNavigation/>

            <div className="page-content" style={{margin: '80px 20px'}}>
                <CourseDetail role="admin"/>
            </div>
        </div>

    </>)
}

export default AdminCourseDetail