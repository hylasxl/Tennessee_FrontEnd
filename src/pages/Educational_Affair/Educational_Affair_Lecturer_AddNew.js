import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation"
import './Education_Affair.scss'
import AddNewAccountRequest from "../../components/Account/AddNewAccountRequest"

const EducationalAffairLecturerAddNew = (props) => {
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation />
            <div className="page-content">
                <div className="main-content" style={{ marginLeft: '40px' }}>
                    <h2 style={{ fontWeight: 'bold', width: '100%' }}>Add New Lecturer</h2>
                    <AddNewAccountRequest addRole="teacher"/>
                </div>
            </div>
        </div>
    </>)
}


export default EducationalAffairLecturerAddNew