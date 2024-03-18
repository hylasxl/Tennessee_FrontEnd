import { useState, useEffect, Fragment } from "react";
import { fetchClassSchedule } from "../../service/classService";
import { Checkbox, Button } from '@mui/material';
import { Textarea } from "@mui/joy";
import { ScheduleSend } from "@mui/icons-material";
import { compareArraysOfObjects } from "../../utils/utils.function";
import { sendAbsentRequest } from "../../service/studentService"
import { toast } from "react-toastify";
import { PropagateLoader } from 'react-spinners'
const AttendanceRequest = (props) => {

    const classId = props.classId
    const studentId = props.studentId
    const [dateList, setDateList] = useState([])
    const [objectData, setObjectData] = useState([])
    const [isDataChanged, setIsDataChanged] = useState(false)
    const [initData, setInitData] = useState(false)
    const [reason, setReason] = useState("")
    const [isUpdated, setIsUpdated] = useState(false)
    const [isPageLoaded, setIsPageLoaded] = useState(false)

    useEffect(() => {
        setIsUpdated(false)
        setIsPageLoaded(false)
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
                    setInitData(tempObjArr)
                    setTimeout(() => {
                        setIsPageLoaded(true)
                    }, 1000)
                })
        }
    }, [classId, studentId, isUpdated])
    const handleChangeCheckBoxes = (e, index) => {
        const newArray = [...objectData];
        newArray[index] = {
            ...newArray[index],
            status: !newArray[index].status
        };
        setObjectData(newArray);
    }

    useEffect(() => {
        if (objectData && initData) {
            if (!compareArraysOfObjects(objectData, initData)) setIsDataChanged(true)
            else setIsDataChanged(false)
        } else return
    }, [objectData, initData])

    const sendRequest = async (filteredData) => {
        return new Promise((resolve, reject) => {
            sendAbsentRequest(filteredData)
                .then((res) => {
                    if (res.EC === 1) {
                        resolve()
                        setTimeout(() => {
                            setIsUpdated(true)
                        }, 500)
                    }
                    else reject()
                })
        })
    }


    const handleSendRequest = async () => {
        const filteredData = objectData.filter(item => item.status !== false);
        if (reason.trim().length === 0) {
            toast.warn("Please input reason")
            return
        }
        const queryData = filteredData.map(item => {
            return { ...item, reason }
        })
        const result = sendRequest(queryData)
        toast.promise(result, {
            pending: 'Sending Request',
            success: 'Sent Successfully',
            error: 'Error when sending',
        })

    }

    return (
        <>
            <div >
                {
                    dateList && objectData && isPageLoaded && (
                        <div style={{ padding: '20px 50px' }}>
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
                            {
                                dateList.length > 0 && (
                                    <>
                                        <div style={{ width: '50%', margin: '10px 0 20px 0' }}>
                                            <Textarea
                                                minRows={4}
                                                placeholder="Reason"
                                                size="sm"
                                                variant="soft"
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                            />
                                        </div>
                                        <Button
                                            style={{ fontFamily: 'Roboto Slab' }}
                                            disabled={!isDataChanged}
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ScheduleSend />}
                                            onClick={handleSendRequest}>
                                            Send Request
                                        </Button>
                                    </>
                                )
                            }

                        </div>
                    )
                }
                {!isPageLoaded && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {!isPageLoaded && (
                            <PropagateLoader color='#1a2d59' />
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default AttendanceRequest