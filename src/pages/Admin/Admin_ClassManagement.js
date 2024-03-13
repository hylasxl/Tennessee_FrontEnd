import AdminNavigation from "../../components/Navigation/Admin_Navigation/Admin_Navigation";
import ClassTable from "../../components/Tables/classTable";
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