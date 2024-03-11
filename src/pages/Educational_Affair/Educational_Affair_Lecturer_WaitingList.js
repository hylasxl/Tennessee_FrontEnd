import './Education_Affair.scss'
import EducationalAffairNavigation from '../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation'
import LecturerAccountListTable from '../../components/Tables/lecturerAccountListTable'
const EducationalAffairLecturerWaitingList = (props) => {
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation subLecturerNavigation="Waiting List"/>
            <div className="page-content">
                <h3 style={{margin:'-20px 0 20px 0',fontWeight:'bold'}}>Waiting List</h3>
                <LecturerAccountListTable />
            </div>
        </div>
    </>)
}

export default EducationalAffairLecturerWaitingList