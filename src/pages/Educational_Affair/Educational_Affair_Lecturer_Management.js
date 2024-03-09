import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import './Education_Affair.scss'
import AccountTable from "../../components/Tables/accountTable";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Add, HourglassBottom } from "@mui/icons-material";
const EducationalAffairLecturerManagement = (props) => {

    const navigate = useNavigate()

    const handleAddNewTeacherClick = () => {
        navigate('/educational-affair/lecturer/add-new-lecturer')
    }
    const handleLecturerListClick = () => {
        navigate('/educational-affair/lecturer/waiting-list')
    }
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation />
            <div className="page-content">
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', margin:'-20px 0 20px 0' }}>
                    <Button style={{fontFamily:'Roboto Slab'}} onClick={handleAddNewTeacherClick} variant="contained" color="primary" startIcon={<Add />}>Add New Lecturer</Button>
                    <Button style={{fontFamily:'Roboto Slab'}} onClick={handleLecturerListClick} variant="contained" color="primary" startIcon={<HourglassBottom />}>LECTURER WAITING LIST</Button>
                </div>
                <AccountTable accountType="lecturer" />
            </div>
        </div>
    </>)
}

export default EducationalAffairLecturerManagement;