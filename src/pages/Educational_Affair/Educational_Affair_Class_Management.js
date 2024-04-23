import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import ClassTable from "../../components/Tables/ClassTable";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { HourglassBottom } from "@mui/icons-material";
import './Education_Affair.scss'

const EducationalAffairClassManagement = (props) => {

    const navigate = useNavigate()

    const handleAddClassClick = () => {
        navigate('/educational-affair/class/create-new-class');
    }

    const handleWaitingList = () => {
        navigate('/educational-affair/class/waiting-list');
    }
    const handleAddStudent = () => {
        navigate('/educational-affair/class/add-student');
    }

    return (<>
        <div className="page-container">
            <EducationalAffairNavigation />
            <div className="page-content">
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', margin: '-20px 0 20px 0' }}>
                    <Button style={{ fontFamily: 'Roboto Slab' }} onClick={handleAddStudent} variant="contained" color="primary" startIcon={<Add />}>ADD STUDENT</Button>
                    <Button style={{ fontFamily: 'Roboto Slab' }} onClick={handleAddClassClick} variant="contained" color="primary" startIcon={<Add />}>Add New Class</Button>
                    <Button style={{ fontFamily: 'Roboto Slab' }} onClick={handleWaitingList} variant="contained" color="primary" startIcon={<HourglassBottom />}>CLASS WAITING LIST</Button>
                </div>
                <ClassTable type="Approved" />
            </div>
        </div>
    </>)
}


export default EducationalAffairClassManagement