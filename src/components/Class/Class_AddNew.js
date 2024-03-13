import { Stack, TextField, MenuItem, Button, Menu } from "@mui/material"
import './Class.scss'
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { WeekdaysInput } from 'react-weekdays-input'
import { ScheduleSend } from "@mui/icons-material";

import { getAllLanguage } from "../../service/languageService";
import { fetchCourseByLanguage } from "../../service/courseService";
import { fetchAllClassShift } from "../../service/classShiftService";
import { fetchLecturerByLanguage } from "../../service/lecturerService";
import { fetchLessonByCourse } from "../../service/lessonService";
import { sendNewClassRequest } from "../../service/classService";

const AddNewClass = (props) => {

    const { user } = useContext(UserContext)
    const currentUserId = user.user.userId
    const [allLanguages, setAllLanguages] = useState([])
    const [coursebyLanguage, setCourseByLanguage] = useState([])
    const [allClassShift, setAllClassShift] = useState([])
    const [lecturerList, setLecturerList] = useState([])
    const [lessonList, setLessonList] = useState([])

    const navigate = useNavigate()

    const [daysAsObject, setDaysAsObject] = useState([0, 0, 0, 0, 0, 0, 0])
    const [forcedState, setForcedState] = useState({
        0: 'none',
        1: 'none',
        2: 'none',
        3: 'none',
        4: 'none',
        5: 'none',
        6: 'inactive'
    })

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
    const handleFetchLecturerByLanguage = async (languageId, startDate, classShift, weekdays, courseId) => {
        return await fetchLecturerByLanguage(languageId, startDate, classShift, weekdays, courseId)
    }
    const handleFetchLessonByCourse = async (courseId) => {
        return await fetchLessonByCourse(courseId)
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
        setLessonList([])
        if (classLanguage && classLanguage !== "") {
            handleFetchCourseByLanguage(classLanguage).then((response) => {
                setCourseByLanguage(response.DT)
            })
        }
    }, [classLanguage])

    useEffect(() => {
        setLessonList([])
        if (classCourse && classCourse !== "") {
            handleFetchLessonByCourse(classCourse).then((response) => {
                setLessonList(response.DT)
            })
        }
    }, [classCourse])

    useEffect(() => {

        if (classLanguage !== "" && startDate !== "" && classShift !== "" && daysAsObject && classCourse) {
            setLecturerList([])
            handleFetchLecturerByLanguage(classLanguage, startDate, classShift, daysAsObject.join(','), classCourse)
                .then((response) => {
                    setLecturerList(response.DT)
                    console.log(response);
                })

        }
    }, [classLanguage, startDate, classShift, daysAsObject, classCourse])

    useEffect(() => {
        setDaysAsObject([0, 0, 0, 0, 0, 0, 0])
        setForcedState({
            0: 'none',
            1: 'none',
            2: 'none',
            3: 'none',
            4: 'none',
            5: 'none',
            6: 'inactive'
        })
        if (startDate && startDate !== "") {
            const day = new Date(startDate)
            const weekDay = (day.getDay() + 6) % 7;
            if (weekDay === 6) return
            setDaysAsObject(days => {
                const newDays = [...days];
                newDays[weekDay] = 1;
                return newDays;
            });
            setForcedState(state => {
                const newState = { ...state }
                newState[weekDay] = 'active'
                return newState
            })
        }
    }, [startDate])

    const handleSubmitRequest = async () => {

        if (!classLanguage || classLanguage.trim === "") {
            toast.error("Please select language")
            return
        }
        if (!classCourse || classCourse.trim === "") {
            toast.error("Please select course")
            return
        }
        if (!className || className.trim === "") {
            toast.error("Class name is empty")
            return
        }
        if (!startDate || startDate.trim === "") {
            toast.error("Please select start date")
            return
        }
        if (!quantity || quantity.trim === "") {
            toast.error("Quantity is empty")
            return
        }
        if (!classShift || classShift.trim === "") {
            toast.error("Please select class shift")
            return
        }
        if (!lecturer || lecturer.trim === "") {
            toast.error("Please choose lecturer")
            return
        }
        const data = await sendNewClassRequest(className, classCourse, classLanguage, startDate, lecturer, quantity, classShift, description, currentUserId, daysAsObject.join(','))


        if (data && +(await data).EC === -1) {
            toast.error("Cannot send request")
            return
        }

        if (data && +(await data).EC === 2) {
            toast.warn(await data.EM)
            return
        }
        if (data && +(await data).EC === 1) {
            toast.success("Send Request Successfully")
            navigate('/educational-affair/class')
        }

    }



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
                        style={{ height: '80px', width: '75%', transition: 'all .2s' }}
                        helperText="Please select course"
                        size="small"
                        label="Course"
                        variant="standard"
                        defaultValue={''}
                        onChange={(event) => setClassCourse(event.target.value)}
                        value={classCourse}>
                        {
                            coursebyLanguage.map((item, index) => {
                                return (<MenuItem key={item.id} value={item.id}>{item.courseName}</MenuItem>)
                            })
                        }
                    </TextField>
                )}
                <div style={{ width: '100%', margin: '10px 0' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label="Start Date" minDate={dayjs(new Date())} format="YYYY-MM-DD" onChange={(value) => {
                                const date = new Date(value.toISOString().split('T')[0]);
                                date.setDate(date.getDate() + 1);
                                setStartDate(date.toISOString().split('T')[0]);
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
                <Button style={{ fontFamily: 'Roboto Slab' }} onClick={handleSubmitRequest} variant="contained" color="primary" startIcon={<ScheduleSend />}>Send Request</Button>
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
                    {lecturerList.map((item, index) => {
                        return (
                            <MenuItem key={item.id} value={item.accountId}>{item.firstName} {item.lastName}
                            </MenuItem>)
                    })}
                </TextField>
                {classCourse && classCourse !== "" && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '-30px' }} >
                        {
                            lessonList.map((item, index) => {
                                return (
                                    <TextField
                                        disabled
                                        label={`Lesson ${item.orderofLesson}`}
                                        variant="standard"
                                        size="small"
                                        style={{ width: '40%' }}
                                        key={index}
                                        value={item.lessonName}>
                                    </TextField>)
                            })
                        }
                    </div>
                )}
                <WeekdaysInput
                    value={daysAsObject}
                    onChange={(value) => setDaysAsObject(value)}
                    days={[
                        'monday',
                        'tuesday',
                        'wednesday',
                        'thursday',
                        'friday',
                        'saturday',
                        'sunday'
                    ]}
                    forcedState={forcedState}
                    textCase={'firstToUpper'} //Mo, Tu, We, Th, Fr, Sa, Su
                />

            </Stack>
        </Stack>
    </>)
}

export default AddNewClass