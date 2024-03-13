import './Lecturer.scss'
import LecturerNavigation from '../../components/Navigation/Lecturer_Navigation/Lecturer_Navigation'
import TimeTable from '../../components/Timetable/TimeTable'
const LecturerClass = () => {
    return (<>
        <div className="page-container">
            <LecturerNavigation />
            <div className="page-content">
                <TimeTable controlType='lecturer' />
            </div>
        </div>
    </>)
}

export default LecturerClass