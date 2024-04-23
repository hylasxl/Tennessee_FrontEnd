import AdminNavigation from "../../components/Navigation/Admin_Navigation/Admin_Navigation";
import ClassTable from "../../components/Tables/ClassTable";
const AdminClassManagement = () => {
    return (<>
        <div className="page-container">
            <AdminNavigation />
            <div className="page-content">
                    <ClassTable controlType='Admin'/>
                
            </div>
        </div>
    </>)
}

export default AdminClassManagement;