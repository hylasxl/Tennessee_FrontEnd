import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import CourseTable from "../../components/Tables/CourseTable";
import { Button } from "@mui/material";
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
                <div style={{margin: '80px 20px'}}>
                    <CourseTable role='edu'/>
                </div>

                <div className="button-section">
                    <Button variant="contained" onClick={() => handleCreateCourseClick()}>Create new course</Button>
                </div>
            </div>


        </>)
}

export default EducationalAffairCourseManagement;   