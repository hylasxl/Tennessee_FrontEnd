import './Student.scss'
import StudentNavigation from '../../components/Navigation/Student_Navigation/Student_Navigation'
import AttendanceRequest from '../../components/Attendance/Attendance_Request'
import { useState, useEffect, useContext, Fragment } from 'react'
import { UserContext } from '../../context/UserContext'
import { TextField, MenuItem } from '@mui/material'
import { fetchClassByStudent } from '../../service/classService'
const StudentAbsentRequest = () => {
    const { user } = useContext(UserContext)
    const currentUserId = user.user.userId
    const [classList, setClassList] = useState([])
    const [classId, setClassId] = useState(0)

    const handleFecthClass = async (id) => {
        return await fetchClassByStudent(id)
    }
    useEffect(()=>{
        if(currentUserId){
            handleFecthClass(currentUserId)
            .then((res)=>{
                const data = res.DT
                const tempArr = []
                data.forEach((item)=>{
                    tempArr.push({
                        id: item.class.id,
                        className: item.class.className,
                        operatingStatus: item.class.operatingStatus
                    })
                })
                setClassList(tempArr)
            })
        }
    },[currentUserId])
    return (<>
        <div className="page-container">
            <StudentNavigation />
            <div className="page-content">
                <TextField
                    select
                    style={{ height: '80px', width: '50%', transition: 'all .2s' }}
                    helperText="Please select class"
                    size="small"
                    label="Class"
                    variant="standard"
                    onChange={(event) => setClassId(event.target.value)}
                    value={classId}>
                    {
                        classList.map((item, index) => {
                            if (item.operatingStatus === "Operating")
                                return (<MenuItem key={item.id} value={item.id}>{item.className}</MenuItem>)
                            else return (<Fragment></Fragment>)
                        })
                    }
                </TextField>
                {classId && currentUserId && (
                    <AttendanceRequest classId={classId} studentId={currentUserId}/>
                )}
            </div>
        </div>
    </>)
}

export default StudentAbsentRequest