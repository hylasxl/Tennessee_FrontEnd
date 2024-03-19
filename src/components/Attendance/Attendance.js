import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { fetchClassAttendance } from '../../service/lecturerService';
import { PropagateLoader } from 'react-spinners'
import { Button } from "@mui/material"
import { areArraysEqual } from '../../utils/utils.function';
import { checkAttendance } from '../../service/lecturerService';
import { toast } from 'react-toastify'

const Attendance = (props) => {
    const classId = props.classId
    const lecturerId = props.lecturerId
    const [data, setData] = useState([])
    const [nameList, setNameList] = useState([])
    const [dateList, setDateList] = useState([])
    const [attendance, setAttendance] = useState([]);
    const [idSet, setIdSet] = useState([])
    const [isChecked, setIsChecked] = useState([])
    const [isDataChanged, setIsDataChanged] = useState(false)
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [initData, setInitData] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        setIsUpdated(false)
        if (lecturerId && classId) {
            setIsPageLoaded(false)
            fetchClassAttendance(classId, lecturerId).then(res => {
                setData(res.DT)
                return res.DT
            }).then((res) => {
                const nameArr = []
                const dateArr = []
                const idArr = []
                res.forEach(element => {
                    nameArr.push("ID:" + element.studentId + "-" + element.CAS.firstName + " " + element.CAS.lastName)
                    dateArr.push(element.date)
                    idArr.push(element.studentId)
                });
                setNameList(Array.from(new Set(nameArr)))
                setDateList(Array.from(new Set(dateArr)))
                setIdSet(Array.from(new Set(idArr)))
                setTimeout(() => {
                    setIsPageLoaded(true)
                }, 1000)
            })
        }

    }, [lecturerId, classId, isUpdated])

    const handleCheckboxChange = (idIndex, dayIndex) => {
        setIsChecked(prevState => {
            const tempData = [...prevState];
            tempData[idIndex] = [...tempData[idIndex]];
            tempData[idIndex][dayIndex] = !tempData[idIndex][dayIndex];
            return tempData;
        });
    };

    useEffect(() => {
        if (idSet.length > 0 && data.length > 0 && dateList.length > 0) {
            const attendanceList = []
            const checkedState = []
            idSet.forEach((id) => {
                dateList.forEach((date) => {
                    attendanceList.push({
                        studentId: id,
                        date,
                        classId
                    })
                })
                let tempArr = []
                const result = data.filter(item => item.studentId === id)
                result.forEach(item => {
                    if (item.status === 1) tempArr.push(true)
                    if (item.status === 0) tempArr.push(false)
                    if (item.status === 2) tempArr.push("excused")

                })
                checkedState.push(tempArr)
            })
            setIsChecked(checkedState)
            setInitData(checkedState)
            setAttendance(attendanceList)
        }
    }, [idSet, data, dateList, classId])

    useEffect(() => {
        if (isChecked.length > 0 && initData.length > 0) {
            if (!areArraysEqual(isChecked, initData)) setIsDataChanged(true)
            else setIsDataChanged(false)
        }
    }, [initData, isChecked])

    const handleCheckAttendance = async () => {
        const copyArr = isChecked.map(row =>
            row.map(value => {
                if (value === 'excused') {
                    return 2;
                } else if (typeof value === 'boolean') {
                    return value ? 1 : 0;
                } else {
                    return value;
                }
            })
        );

        let result = attendance.map((obj, index) => {
            const newObj = { ...obj };
            newObj.status = copyArr[Math.floor(index / copyArr[0].length)][index % copyArr[0].length];
            return newObj;
        });
        const percentageMap = {};
        result.forEach(({ studentId, status }) => {
            if (!percentageMap[studentId]) {
                percentageMap[studentId] = 0;
            }
            percentageMap[studentId] += status;
        });
        Object.keys(percentageMap).forEach(studentId => {
            const items = result.filter(item => item.studentId === parseInt(studentId));
            const countOfStatus = items.reduce((count, item) => (item.status === 1 || item.status === 2) ? count + 1 : count, 0);
            const total = items.length;
            const percentage = countOfStatus / total;
            result.forEach(item => {
                if (item.studentId === parseInt(studentId)) {
                    item.percent = percentage.toFixed(2);
                }
            });
        });

        await checkAttendance(result).then((res) => {
            if (+res.EC === 1) {
                toast.success("Update Successfully")
                setIsUpdated(true)
            } else {
                toast.error("Update Failed")
            }
        })
    }


    return (
        <>
            {isPageLoaded && classId && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Button variant='contained' color='primary' disabled={!isDataChanged} onClick={() => handleCheckAttendance()}>Save Changes</Button>
                                </TableCell>
                                {dateList.map((day, index) => (
                                    <TableCell key={index} style={{ fontWeight: 'bold', fontSize: 16 }}>{day}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {idSet.map((id, idIndex) => (
                                <TableRow key={idIndex}>
                                    <TableCell component="th" scope="row" style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        {nameList[idIndex]}
                                    </TableCell>
                                    {dateList.map((date, dayIndex) => (
                                        <TableCell key={dayIndex}>
                                            {isChecked && isChecked.length > 0 && (
                                                <Checkbox
                                                    color="primary"
                                                    checked={isChecked[idIndex][dayIndex]}
                                                    onChange={() => {
                                                        handleCheckboxChange(idIndex, dayIndex)
                                                    }}
                                                    disabled={isChecked[idIndex][dayIndex] === "excused"}
                                                />
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)}
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
        </>
    );
};

export default Attendance;