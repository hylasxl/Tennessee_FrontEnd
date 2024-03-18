import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation"
import AbsentTable from "../../components/Tables/absentTabble"
import './Education_Affair.scss'

const EducationalAffairAbsentRequest = (props) => {
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation/>
            <div className="page-content">
                <div className="main-content">
                    <AbsentTable/>
                </div>
            </div>
        </div>
    </>)
}

export default EducationalAffairAbsentRequest