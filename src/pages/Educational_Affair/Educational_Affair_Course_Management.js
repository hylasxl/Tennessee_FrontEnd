import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import CourseTable from "../../components/Tables/CourseTable";

const EducationalAffairCourseManagement = () => {
    return (
    <>
        <EducationalAffairNavigation/>
        <div className='mt-5 ps-3 pe-3'>
            <CourseTable/>
        </div>
        
    </>)
}

export default EducationalAffairCourseManagement;   