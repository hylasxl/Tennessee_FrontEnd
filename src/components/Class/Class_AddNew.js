import { Stack, TextField, MenuItem, Button } from "@mui/material"
import { Fragment, useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { toast } from 'react-toastify'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

import { getAllLanguage } from "../../service/languageService";
import { fetchCourseByLanguage } from "../../service/courseService";
import { fetchAllClassShift } from "../../service/classShiftService";
import { fetchLecturerByLanguage } from "../../service/lecturerService";

const AddNewClass = (props) => {



    const { user } = useContext(UserContext)
    const [allLanguages, setAllLanguages] = useState([])
    const [coursebyLanguage, setCourseByLanguage] = useState([])
    const [allClassShift, setAllClassShift] = useState([])
    const [lecturerList, setLecturerList] = useState([])

    const [classLanguage, setClassLanguage] = useState('')
    const [classCourse, setClassCourse] = useState('')
    const [className, setClassName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [classShift, setclassShift] = useState('')
    const [description, setDescription] = useState('')
    const [lecturer, setLecturer] = useState('')

    const handleGetAllLanguages = async () => {
        return await getAllLanguage()
    }
    const handleFetchCourseByLanguage = async (languageId) => {
        return await fetchCourseByLanguage(languageId)
    }
    const handleFetchAllClassShift = async () => {
        return await fetchAllClassShift()
    }
    const handleFetchLecturerByLanguage = async (languageId) => {
        return await fetchLecturerByLanguage(languageId)
    }


    useEffect(() => {
        handleGetAllLanguages().then((response) => {
            setAllLanguages(response.DT)
        })
        handleFetchAllClassShift().then((response) => {
            setAllClassShift(response.DT)
        })
    }, [])

    useEffect(() => {
        setLecturer('')
        if (classLanguage && classLanguage !== "") {
            handleFetchCourseByLanguage(classLanguage).then((response) => {
                setCourseByLanguage(response.DT)
            })
            handleFetchLecturerByLanguage(classLanguage).then((response) => {
                setLecturerList(response.DT)
            })
        }
    }, [classLanguage])

    return (<>
        <Stack direction={'row'} spacing={12} style={{ width: '100%', margin: '40px 20px 0px 20px' }}>
            <Stack style={{ width: '50%' }} className="class-info">
                <TextField
                    style={{ height: '80px', width: '75%' }}
                    size="small"
                    label="Class Name"
                    variant="standard"
                    onChange={(event) => setClassName(event.target.value)}
                    value={className}
                    autoFocus
                />
                <TextField
                    select
                    style={{ height: '80px', width: '75%' }}
                    helperText="Please select class language"
                    size="small"
                    label="Language"
                    variant="standard"
                    defaultValue={''}
                    onChange={(event) => setClassLanguage(event.target.value)}
                    value={classLanguage}>
                    {
                        allLanguages.map((item, index) => {
                            return (<MenuItem key={index} value={item.id}>{item.languageName}</MenuItem>)
                        })
                    }
                </TextField>
                {classLanguage && classLanguage !== '' && (
                    <TextField
                        select
                        style={{ height: '80px', width: '75%' }}
                        helperText="Please select course"
                        size="small"
                        label="Course"
                        variant="standard"
                        defaultValue={''}
                        onChange={(event) => setClassCourse(event.target.value)}
                        value={classCourse}>
                        {
                            coursebyLanguage.map((item, index) => {
                                return (<MenuItem key={index} value={item.id}>{item.courseName}</MenuItem>)
                            })
                        }
                    </TextField>
                )}
                <div style={{ width: '100%', margin: '10px 0' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label="Start Date" minDate={dayjs(new Date())} format="YYYY/MM/DD" onChange={(value) => {
                                const trueFormat = value.$y + "/" + (value.$M + 1) + "/" + value.$D
                                setStartDate(trueFormat)
                            }} slotProps={{
                                textField: {
                                    sx: { width: '75%' }
                                }
                            }} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <TextField
                    type="number"
                    style={{ height: '80px', width: '75%' }}
                    size="small"
                    label="Quantity"
                    variant="standard"
                    onChange={(event) => setQuantity(event.target.value)}
                    value={quantity}
                />
                <TextField
                    select
                    style={{ height: '80px', width: '75%' }}
                    helperText="Please select class shift"
                    size="small"
                    label="Class Shift"
                    variant="standard"
                    defaultValue={''}
                    onChange={(event) => setclassShift(event.target.value)}
                    value={classShift}>
                    {
                        allClassShift.map((item, index) => {
                            return (<MenuItem key={index} value={item.id}>{item.shiftCode} {item.startTime}-{item.endTime}</MenuItem>)
                        })
                    }
                </TextField>
                <TextField
                    style={{ height: '80px', width: '75%' }}
                    size="small"
                    label="Description"
                    variant="standard"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                    multiline
                    maxRows={3}
                />
            </Stack>
            <Stack style={{ width: '50%' }} rowGap={4} className="lesson-info">
                <TextField
                    select
                    style={{ height: '80px', width: '75%' }}
                    size="small"
                    label="Lecturer"
                    variant="standard"
                    onChange={(event) => setLecturer(event.target.value)}
                    value={lecturer}>
                    {
                        lecturerList.map((item, index) => {
                            return (<MenuItem key={index} value={item.account_info.id}>{item.account_info.firstName} {item.account_info.lastName}</MenuItem>)
                        })
                    }
                </TextField>
            </Stack>
        </Stack>
    </>)
}

export default AddNewClass