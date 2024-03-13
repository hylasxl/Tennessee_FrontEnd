import './Lecturer.scss'
import LecturerNavigation from '../../components/Navigation/Lecturer_Navigation/Lecturer_Navigation'
import ClassLecturerTable from '../../components/Tables/classLecturerTable'
const LecturerClass = () => {
    return (<>
        <div className="page-container">
            <LecturerNavigation />
            <div className="page-content">
                <ClassLecturerTable />
            </div>
        </div>
    </>)
}

export default LecturerClass