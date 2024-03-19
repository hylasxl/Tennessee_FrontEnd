import AdminNavigation from '../../components/Navigation/Admin_Navigation/Admin_Navigation'
import './Admin.scss'
import AddNewAccountRequest from '../../components/Account/AddNewAccountRequest'

const AdminHighLevelAccountAddNew = (props) => {
    return (<>
        <div className="page-container">
            <AdminNavigation subHigh='Add New'/>
            <div className="page-content">
                <AddNewAccountRequest addRole="admin"/>
            </div>
        </div>
    </>)
}

export default AdminHighLevelAccountAddNew