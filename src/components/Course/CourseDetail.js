import { useParams } from "react-router-dom";
import qs from "qs";
import './CourseDetail.scss'
import { courseRequestApproval } from "../../service/courseService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const CourseDetail = (props) => {

    const navigate = useNavigate()

    const {user} = useContext(UserContext)

    

    const role = props.role || "DEFAULT"
    const { data } = useParams()

    const courseData = qs.parse(data)

    console.log(courseData);

    const handleBtnClick = async (status) => {
        const approveStatus = status === "approveBtn" ? "Approved" : "Rejected";

        const data = await courseRequestApproval(courseData.id,approveStatus,user.user.userId);

        if(data && +data.EC === 1 && approveStatus === "Approved"){
            toast.success("Approve Successfully")
            navigate('/admin/course')
        }
        if(data && +data.EC === 1 && approveStatus === "Rejected"){
            toast.error("Rejected Successfully")
            navigate('/admin/course')
        }
        if(data && +data.EC !== 1){
            toast.error("An error has occured")
        }
    }    

    return (
        <>
            <div className="page-container container">
                <div className="row">
                    <div className="col col-6 basic-info d-flex flex-column gap-1" >
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Course Detail: {courseData.courseName}</p>
                        <div className="course-basic-info d-flex flex-row">
                            <div className="fieldName">Course Name: </div>
                            <div className="fieldDetail">{courseData.courseName}</div>
                        </div>
                        <div className="course-basic-info d-flex flex-row">
                            <div className="fieldName">Duration: </div>
                            <div className="fieldDetail">{courseData.duration}</div>
                        </div>
                        <div className="course-basic-info d-flex flex-row">
                            <div className="fieldName">Language: </div>
                            <div className="fieldDetail">{courseData.language.languageCode} - {courseData.language.languageName}</div>
                        </div>
                        <div className="course-basic-info d-flex flex-row">
                            <div className="fieldName">Description: </div>
                            <div className="fieldDetail">{courseData.description}</div>
                        </div>
                        <div className="course-basic-info d-flex flex-row">
                            <div className="fieldName">Created By: </div>
                            <div className="fieldDetail"><span style={{ fontStyle: 'italic' }}>ID: 0{courseData.createdByAccount.accountId}</span> - {courseData.createdByAccount.firstName} {courseData.createdByAccount.lastName}</div>
                        </div>
                        <div className="course-basic-info d-flex flex-row">
                            <div className="fieldName">Status: </div>
                            <div className="fieldDetail">{courseData.approveStatus}</div>
                        </div>
                        {(courseData.approveStatus === "Pending" || courseData.approveStatus === "RequestForEditting") &&
                            <div className="course-basic-info d-flex flex-row">
                                <div className="fieldName">Approved By: </div>
                                <div className="fieldDetail" style={{ color: 'red', fontStyle: 'italic' }}>None</div>
                            </div>
                        }
                        {courseData.approveStatus !== "Pending" &&
                            <div className="course-basic-info d-flex flex-row">
                                <div className="fieldName">Approved By: </div>
                                <div className="fieldDetail"><span style={{ fontStyle: 'italic' }}>ID: 0{courseData.approvedByAccount.accountId}</span> - {courseData.approvedByAccount.firstName} {courseData.approvedByAccount.lastName}</div>
                            </div>
                        }

                        {((courseData.approveStatus === "Pending" || courseData.approveStatus === "RequestForEditting") && role === "admin") &&
                            <div className="action-button d-flex flex-row gap-3 mt-3">
                                <button className="btn btn-success" id="approveBtn" onClick={(event)=>{
                                    handleBtnClick(event.target.id)
                                }}>Approve</button>
                                <button className="btn btn-danger" id="rejectBtn" onClick={(event)=>{
                                    handleBtnClick(event.target.id)
                                }}>Reject</button>
                            </div>
                        }
                    </div>
                    <div className="col col-6 lesson-info">
                        {
                            courseData.course_image !== "" && (
                                <img style={{width:'90%',height:'auto'}} alt="Default" src={courseData.course_image.imagePath}/>
                            )
                        }
                        {courseData.lessons.map((item, index) => {
                            return (
                                <div className="course-basic-info d-flex flex-row" key={index}>
                                    <div className="fieldNameoflesson">Lesson {item.orderofLesson}: </div>
                                    <div className="fieldDetail" style={{ minWidth: '350px',overflow:'hidden' }}>{item.lessonName}</div>
                                    <div className="fieldNameoflesson" style={{minWidth: '100px'}}>Duration:</div>
                                    <div className="fieldDetail">{item.lessonDuration}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetail;