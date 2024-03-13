import './Student.scss'
import ClassStudentTable from '../../components/Tables/classStudentTable'
import StudentNavigation from '../../components/Navigation/Student_Navigation/Student_Navigation'
const StudentClass = () => {
    return (<>
        <div className="page-container">
            <StudentNavigation />
            <div className="page-content">
                <ClassStudentTable/>
            </div>
        </div>
    </>)
}

export default StudentClass