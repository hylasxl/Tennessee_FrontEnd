import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import ClassTable from "../../components/Tables/classTable";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import './Education_Affair.scss'

const EducationalAffairClassManagement = (props) => {

    const navigate = useNavigate()

    const handleAddClassClick = ()=>{
        navigate('/educational-affair/class/create-new-class');
    }

    return (<>
        <div className="page-container">
            <EducationalAffairNavigation />
            <div className="page-content">
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', margin: '-20px 0 20px 0' }}>
                    <Button style={{ fontFamily: 'Roboto Slab' }} onClick={handleAddClassClick} variant="contained" color="primary" startIcon={<Add />}>Add New Class</Button>
                </div>
                <ClassTable />
            </div>
        </div>
    </>)
}


export default EducationalAffairClassManagement