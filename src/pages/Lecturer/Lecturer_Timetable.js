import './Lecturer.scss'
import LecturerNavigation from '../../components/Navigation/Lecturer_Navigation/Lecturer_Navigation'
import TimeTable from '../../components/Timetable/TimeTable'
const LecturerTimetable = () => {
    return (<>
        <div className="page-container">
            <LecturerNavigation />
            <div className="page-content">
                <TimeTable controlType='lecturer' />
            </div>
        </div>
    </>)
}

export default LecturerTimetable