import './Education_Affair.scss'
import EducationalAffairNavigation from '../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation'
import ClassTable from '../../components/Tables/ClassTable'

const EducationalAffairClassWaitingList = (props) => {
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation subClassNavigation="Waiting List" />
            <div className="page-content">
                <h3 style={{margin:'-20px 0 20px 0',fontWeight:'bold'}}>Waiting List</h3>
                <ClassTable type="Except approved" />
            </div>
        </div>
    </>)
}

export default EducationalAffairClassWaitingList