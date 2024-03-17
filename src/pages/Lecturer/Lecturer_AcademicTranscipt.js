import './Lecturer.scss'
import LecturerNavigation from '../../components/Navigation/Lecturer_Navigation/Lecturer_Navigation'
import { fetchClassByLecturer } from '../../service/classService'
import { useState, useEffect, useContext, Fragment } from 'react'
import { UserContext } from '../../context/UserContext'
import { TextField, MenuItem } from '@mui/material'
import AcademicTranscript from '../../components/Academic_Transcript/Academic_Transcript'


const LecturerAcademicTranscript = () => {

    const { user } = useContext(UserContext)
    const currentUserId = user.user.userId
    const [classList, setClassList] = useState([])
    const [classId, setClassId] = useState(0)

    const handleFecthClass = async (id) => {
        return await fetchClassByLecturer(id)
    }

    useEffect(() => {
        if (currentUserId) {
            handleFecthClass(currentUserId)
                .then((res) => {
                    const data = res.DT
                    let classIds = []
                    data.forEach(element => {
                        classIds.push(
                            { id: element.id, className: element.className }
                        )
                    });
                    setClassList(classIds)
                })
        }
    }, [currentUserId])

    return (<>
        <div className="page-container">
            <LecturerNavigation />
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
                            if (item.operatingStatus === "Incoming" || "Operating" || "Completed")
                                return (<MenuItem key={item.id} value={item.id}>{item.className}</MenuItem>)
                            else return (<Fragment></Fragment>)
                        })
                    }
                </TextField>
                {classId !== 0 && (
                    <AcademicTranscript classId={classId} lecturerId={currentUserId ? currentUserId : null} />
                )}
            </div>
        </div>
    </>)
}

export default LecturerAcademicTranscript