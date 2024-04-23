import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import './Education_Affair.scss'
import AccountTable from "../../components/Tables/AccountTable"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Add,HourglassBottom } from "@mui/icons-material";
const EducationalAffairStudentManagement = (props) => {

    const navigate = useNavigate()
    const handleAddNewStudentClick = () => {
        navigate('/educational-affair/student/add-new-student')
    }
    const handleStudentListClick = () => {
        navigate('/educational-affair/student/waiting-list')

    }
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation />
            <div className="page-content">
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', margin: '-20px 0 20px 0' }}>
                    <Button style={{ fontFamily: 'Roboto Slab' }} onClick={handleAddNewStudentClick} variant="contained" color="primary" startIcon={<Add />}>Add New Student</Button>
                    <Button style={{ fontFamily: 'Roboto Slab' }} onClick={handleStudentListClick} variant="contained" color="primary" startIcon={<HourglassBottom />}>Student Waiting List</Button>
                </div>
                <AccountTable accountType="student" />
            </div>
        </div>
    </>)
}

export default EducationalAffairStudentManagement;