import { fetchClassByStudent } from "../../service/classService";
import { useState, useEffect } from "react";
import { fetchClassSchedule } from "../../service/classService";
import { Checkbox} from '@mui/material';

const AttendanceRequest = (props) => {

    const classId = props.classId
    const studentId = props.studentId
    const [dateList, setDateList] = useState([])
    const [objectData, setObjectData] = useState([])
    
    useEffect(() => {
        if (classId) {
            fetchClassSchedule(classId)
                .then((res) => {
                    const data = res.DT
                    const tempArr = []
                    const tempObjArr = []
                    data.forEach(item => {
                        if (new Date(item.date) >= new Date()) {
                            tempArr.push(item.date)
                            tempObjArr.push({
                                studentId,
                                classId,
                                date: item.date,
                                status: false
                            })
                        }
                    })
                    setDateList(tempArr)
                    setObjectData(tempObjArr)
                })
        }
    }, [classId, studentId])
    const handleChangeCheckBoxes = (e, index) => {
        const newArray = [...objectData];
        newArray[index] = {
            ...newArray[index],
            status: !newArray[index].status
        };
        setObjectData(newArray);
    }

    return (
        <>
            <div>
                {
                    dateList && objectData && (
                        <>
                            {
                                dateList.map((item, index) => {
                                    return (
                                        <>
                                            <Checkbox
                                                key={index}
                                                color="primary"
                                                checked={objectData[index].status}
                                                onChange={(e) => {
                                                    handleChangeCheckBoxes(e, index)
                                                }}
                                            />
                                            <label htmlFor={item}>{item}</label>
                                        </>
                                    )
                                })
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default AttendanceRequest