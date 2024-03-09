import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import './Education_Affair.scss'
import RoomTable from "../../components/Tables/roomTable";

const EducationalAffairRoomManagement = (props)=>{
    return (<>
        <div className="page-container">
            <EducationalAffairNavigation/>
            <div className="page-content">
                <RoomTable/>
            </div>
        </div>
    </>)
}

export default EducationalAffairRoomManagement;