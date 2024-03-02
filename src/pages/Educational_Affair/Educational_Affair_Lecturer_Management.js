import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import './Education_Affair.scss'
import AccountTable from "../../components/Tables/AccountTable";

const EducationalAffairLecturerManagement = (props)=>{
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation/>
            <div className="page-content">
                <AccountTable  accountType="lecturer" />
            </div>
        </div>
    </>)
}

export default EducationalAffairLecturerManagement;