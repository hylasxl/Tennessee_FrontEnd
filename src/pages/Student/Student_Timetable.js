import './Student.scss'
import StudentNavigation from '../../components/Navigation/Student_Navigation/Student_Navigation'
import TimeTable from '../../components/Timetable/TimeTable'

const StudentTimetable = () => {
    return (<>
        <div className="page-container">
            <StudentNavigation />
            <div className="page-content">
                <TimeTable controlType='student' />
            </div>
        </div>
    </>)
}

export default StudentTimetable