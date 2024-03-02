import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import ClassTable from "../../components/Tables/ClassTable";
import './Education_Affair.scss'

const EducationalAffairClassManagement = (props) => {
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation />
            <div className="page-content">
                <ClassTable/>
            </div>
        </div>
    </>)
}


export default EducationalAffairClassManagement