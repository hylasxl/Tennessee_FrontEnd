import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { fetchClassAcademicTranscript } from '../../service/lecturerService';
import { PropagateLoader } from 'react-spinners'
import { Button } from "@mui/material"
import { areArraysEqual } from '../../utils/utils.function';
import { toast } from 'react-toastify'
import { TextField } from '@material-ui/core';
import { saveAcademicTranscript } from '../../service/lecturerService';


const AcademicTranscript = (props) => {


    const MIDTERMTESTPERCENTAGE = 0.4
    const FINALTESTPERCENTAGE = 0.5

    const classId = props.classId
    const [data, setData] = useState([])
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const scoreField = ['Attendance Rate', 'Mid-Term Test', 'Final Test', 'Final Result', 'Status']
    const [nameList, setNameList] = useState([])
    const [scores, setScores] = useState([])
    const [initData, setInitData] = useState([])
    const [idSet, setIdSet] = useState([])
    const [scoreMatrix, setScoreMatrix] = useState([])
    const [isDataChanged, setIsDataChanged] = useState(false)
    const [isUpdated, setIsUpdated]=useState(false)


    useEffect(() => {
        setIsPageLoaded(false)
        setIsUpdated(false)
        if (classId) {
            fetchClassAcademicTranscript(classId).then((res) => {
                setData(res.DT)
                return res.DT
            }).then((data) => {
                let names = []
                let scoreData = []
                let ids = []
                data.forEach(element => {
                    names.push("ID:" + element.studentId + "-" + element.ATS.firstName + " " + element.ATS.lastName)
                    scoreData.push({
                        attendanceRate: element.attendanceRate,
                        midTermTest: element.midTermTest,
                        finalTest: element.finalTest,
                        status: element.status
                    })
                    ids.push(element.studentId)
                })
                setNameList(Array.from(new Set(names)))
                setScores(scoreData)
                setIdSet(Array.from(new Set(ids)))

            }).then(() => {
                setTimeout(() => {
                    setIsPageLoaded(true)
                }, 1000)
            })
        }
    }, [classId,isUpdated])

    useEffect(() => {
        if (data.length > 0) {
            let scores = []
            data.forEach(item => {
                const tempArr = [
                    item.attendanceRate,
                    item.midTermTest,
                    item.finalTest,
                    item.finalResult,
                    +item.status === 1 ? "Passed" : "Failed"
                ]
                scores.push(tempArr)
            })
            setScoreMatrix(scores)
            setInitData(JSON.parse(JSON.stringify(scores)));
        }
    }, [data, classId])


    useEffect(() => {
        if (scoreMatrix.length > 0 && initData.length > 0) {
            if (!areArraysEqual(scoreMatrix, initData)) setIsDataChanged(true)
            else setIsDataChanged(false)
        }
    }, [initData, scoreMatrix])

    const handleChange = (event, idIndex, scoreIndex) => {
        let newValue = parseFloat(event.target.value);
        if (isNaN(newValue) || newValue < 0 || newValue > 10) {
            newValue = Math.min(Math.max(newValue, 0), 10);
        }
        const updatedMatrix = [...scoreMatrix];
        updatedMatrix[idIndex][scoreIndex] = newValue;
        setScoreMatrix(updatedMatrix);
    };

    const handleSaveAcademicTranscript = async () => {
        const fieldNames = ["attendanceRate", "midTermTest", "finalTest", "finalResult", "status"];
        console.log(scoreMatrix);
        const newArrayofObject = scoreMatrix.map((arr, index) => {
            const obj = { studentId: idSet[index], classId: classId };
            arr.forEach((value, index) => {
                if (fieldNames[index] === "status") {
                    obj[fieldNames[index]] = value === "Failed" ? 0 : 1;
                } else {
                    obj[fieldNames[index]] = +value.toFixed(2);
                }
            });
            return obj;
        });

        newArrayofObject.forEach((item) => {
            item.finalResult = item.attendanceRate + item.midTermTest * MIDTERMTESTPERCENTAGE + item.finalTest * FINALTESTPERCENTAGE
            if (item.attendanceRate >= 0.75 && +item.finalResult >= 5) {
                item.status = 1
            } else item.status = 0
        })

        await saveAcademicTranscript(newArrayofObject).then((res) => {
            if(+res.EC===1){
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
                                    <Button variant='contained' color='primary' disabled={!isDataChanged}
                                        onClick={() => handleSaveAcademicTranscript()}>Save Change</Button>
                                </TableCell>
                                {scoreField.map((day, index) => (
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
                                    {scoreField.map((score, scoreIndex) => (
                                        <TableCell key={scoreIndex}>
                                            <TextField
                                                value={scoreMatrix[idIndex][scoreIndex]}
                                                type={scoreIndex !== 4 ? 'number' : 'text'}
                                                disabled={scoreIndex === 0 || scoreIndex === 3 || scoreIndex === 4}
                                                onChange={(e) => {
                                                    handleChange(e, idIndex, scoreIndex)
                                                }}

                                            >
                                            </TextField>
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
                    // This makes sure the div takes up the full height of the screen
                }}>
                    {!isPageLoaded && (
                        <PropagateLoader color='#1a2d59' />
                    )}
                </div>
            )}
        </>
    )
}

export default AcademicTranscript