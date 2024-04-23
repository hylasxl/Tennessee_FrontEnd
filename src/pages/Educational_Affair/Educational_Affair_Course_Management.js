import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import CourseTable from "../../components/Tables/CourseTable";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import './Education_Affair.scss'

const EducationalAffairCourseManagement = () => {
    const navigate = useNavigate()

    const handleCreateCourseClick = () => {
        navigate('/educational-affair/course/create-new-course');
    }

    return (
        <>

            <div className="page-container">
                <EducationalAffairNavigation />
                <div className="page-content">
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', margin:'-20px 0 20px 0'}}>
                        <Button style={{fontFamily:'Roboto Slab'}} variant="contained" color="primary" startIcon={<Add />} onClick={() => handleCreateCourseClick()}>Create new course</Button>
                    </div>
                    <CourseTable role='edu' />
                </div>
            </div>


        </>)
}

export default EducationalAffairCourseManagement;   