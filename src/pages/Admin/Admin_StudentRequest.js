import AdminNavigation from "../../components/Navigation/Admin_Navigation/Admin_Navigation";
import StudentAccountListTable from "../../components/Tables/studentAccountListTable";

const AdminStudentRequest = () => {
    return (<>
        <div className="page-container">
            <AdminNavigation />
            <div className="page-content">
                <StudentAccountListTable controllType="Admin" />
            </div>
        </div>
    </>)
}


export default AdminStudentRequest;