import AdminNavigation from "../../components/Navigation/Admin_Navigation/Admin_Navigation";
import LecturerAccountListTable from "../../components/Tables/lecturerAccountListTable";
import './Admin.scss'
const AdminLecturerRequest = () => {
    return (<>
        <div className="page-container">
            <AdminNavigation />
            <div className="page-content">
                <LecturerAccountListTable controllType='Admin' />
            </div>
        </div>
    </>)
}


export default AdminLecturerRequest;