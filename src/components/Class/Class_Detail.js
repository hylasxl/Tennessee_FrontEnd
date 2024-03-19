import { convertDays } from "../../utils/utils.function";

const ClassInfo = ({ classData }) => {
    console.log(classData);
    const lessonList = classData?.course?.lessons || []
    return (
        <>
            <div className="row d-flex">
                <div className="col col-6">
                    <h2>{classData.className}</h2>
                    <h4><span style={{ fontWeight: 'bold' }}>Lecturer: </span>{classData.lecturerByAccount.firstName} {classData.lecturerByAccount.lastName}</h4>
                    <p style={{ marginTop: '50px' }}><span style={{ fontWeight: 'bold' }}>Start Date: </span>{classData.startDate}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Weekdays: </span>{convertDays(classData.weekdays)}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Shift: </span>{classData.class_classShift.startTime}-{classData.class_classShift.endTime}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Course: </span>{classData.course.courseName}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Description: </span>{classData.description}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Status: </span>{classData.operatingStatus}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Quantity: </span>{classData.currentQuantity}/{classData.maxQuantity}</p>
                </div>
                <div className="col col-6" style={{ marginTop: '50px' }}>
                    <h4>Lesson List</h4>
                    <div style={{ marginTop: '30px' }}>
                        {
                            lessonList.map((item, index) => {
                                return (<p><span style={{ fontWeight: 'bold' }}>Lesson {index + 1}: </span>{item.lessonName}</p>)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClassInfo