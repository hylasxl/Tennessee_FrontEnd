import AdminNavigation from '../../components/Navigation/Admin_Navigation/Admin_Navigation'
import './Admin.scss'
import AccountTable from '../../components/Tables/AccountTable'
import { Button } from "@mui/material";
import { Add } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";


const AdminHighLevelAccount = (props) => {
    const navigate = useNavigate()
    return (<>
        <div className="page-container">
            <AdminNavigation />
            <div className="page-content">
                <div className="main-content">
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', margin: '-20px 0 20px 0' }}>
                        <Button style={{ fontFamily: 'Roboto Slab' }} onClick={()=>{
                            navigate('/admin/high-level-account/add-new')
                        }} variant="contained" color="primary" startIcon={<Add />}>ADD NEW</Button>
                    </div>
                    <AccountTable isHighLevel={true} />
                </div>
            </div>
        </div>
    </>)
}

export default AdminHighLevelAccount