import './Education_Affair.scss'
import EducationalAffairNavigation from '../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation'
import StudentAccountListTable from '../../components/Tables/studentAccountListTable'

const EducationalAffairStudentWaitingList = (props) => {
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation subStudentNavigation="Waiting List" />
            <div className="page-content">
                <h3 style={{margin:'-20px 0 20px 0',fontWeight:'bold'}}>Waiting List</h3>
                <StudentAccountListTable />
            </div>
        </div>
    </>)
}

export default EducationalAffairStudentWaitingList