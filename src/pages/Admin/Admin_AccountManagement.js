import AdminNavigation from '../../components/Navigation/Admin_Navigation/Admin_Navigation'
import AccountTable from '../../components/Tables/AccountTable';

const AdminAccountManagementPage = (props) => {

    
    return (<>
        <AdminNavigation />
        <div className='mt-5 ps-3 pe-3'>
            <AccountTable/>
        </div>
    </>)
}

export default AdminAccountManagementPage;