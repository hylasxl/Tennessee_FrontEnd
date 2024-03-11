import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation"
import AddNewClass from "../../components/Class/Class_AddNew"
import './Education_Affair.scss'

const EducationalAffairClassAddNeww = (props)=>{
    return (<>
    <div className="page-container">
            <EducationalAffairNavigation subClassNavigation="Add New Class" />
            <div className="page-content">
                <div className="main-content" style={{ marginLeft: '40px' }}>
                    <h2 style={{ fontWeight: 'bold', width: '100%' }}>Class Information</h2>
                    <AddNewClass/>
                </div>
            </div>
        </div>
    </>)
}

export default EducationalAffairClassAddNeww