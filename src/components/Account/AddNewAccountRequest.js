import { Stack, TextField, MenuItem, Button } from "@mui/material"
import { Fragment, useEffect, useState, useContext } from "react"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAllLanguage } from "../../service/languageService";
import { fetchAllAcademicRanks } from "../../service/academicRankService";
import { UserContext } from "../../context/UserContext";
import { toast } from 'react-toastify'
import { checkEmailFormat, checkAfterToday, isVietnamesePhoneNumber } from "../../utils/utils.function";
import dayjs from "dayjs";
import { sendNewLecturerAccountRequest } from "../../service/lecturerAccountListService";
import { sendNewStudentAccountRequest } from "../../service/studentAccountListService";
import { useNavigate } from "react-router-dom";
import { ScheduleSend } from "@mui/icons-material";
const AddNewAccountRequest = (props) => {

    // const [startDate, setStartDate] = useState(new Date())
    const role = props.addRole
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const currentUserId = user.user.userId

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dateofBirth, setDateofBirth] = useState("")
    const [gender, setGender] = useState("Male")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [language, setLanguage] = useState(1)
    const [academicRank, setAcademicRank] = useState(1)

    const [allLanguage, setAllLanguage] = useState([])
    const [allAcademicRanks, setAllAcademicRanks] = useState([])

    const handleGetAllLanguages = async () => {
        return await getAllLanguage()
    }
    const handleGetAllAcademicRanks = async () => {
        return await fetchAllAcademicRanks()
    }

    useEffect(() => {
        handleGetAllLanguages().then((res) => {
            setAllLanguage(res.DT)
        })
        handleGetAllAcademicRanks().then((res) => {
            setAllAcademicRanks(res.DT)
        })
    }, [])

    const handleSendRequestButton = async () => {
        if (!firstName || firstName.trim() === "") {
            toast.error("First Name is empty")
            setFirstName("")
            return
        }
        if (!lastName || lastName.trim() === "") {
            toast.error("Last Name is empty")
            setLastName("")
            return
        }
        if (!email || email.trim() === "") {
            toast.error("Email is empty")
            setEmail("")
            return
        }
        if (!checkEmailFormat(email)) {
            toast.error("Email is not in correct format")
            return
        }
        if (!dateofBirth || dateofBirth === "NaN-NaN-NaN") {
            toast.error("Invalid Date of Birth")
            return
        }
        if (checkAfterToday(dateofBirth)) {
            toast.error("Date of birth cannot be after current date")
            return
        }
        if (!phone || phone.trim() === "") {
            toast.error("Phone is empty")
            setPhone("")
            return
        }
        if(!isVietnamesePhoneNumber(phone)){
            toast.error("Only Vietnamese phone number (+84) supported ")
            return
        }

        if(role==="student"){
            const response = await sendNewStudentAccountRequest(firstName, lastName, email, gender, dateofBirth, phone, address, currentUserId)
            if(response  && +(await response).EC === 2){
                toast.error(response.EM) 
                return
            }
            if(response  && +(await response).EC === 1){
                toast.success("Request sent successfully")
                navigate('/educational-affair/student/waiting-list')
            } else {
                toast.error("An error has occured")
            }
        }
        if(role==="teacher"){
            const response = await sendNewLecturerAccountRequest(firstName, lastName, email, gender, dateofBirth, phone, address,language,academicRank, currentUserId)
            if(response  && +(await response).EC === 2){
                toast.error("Email or Phone is already in use") 
                return
            }
            if(response  && +(await response).EC === 1){
                toast.success("Request sent successfully")
                navigate('/educational-affair/lecturer/waiting-list')
            } else {
                toast.error("An error has occured")
            }
        }
    }

    return (
        <>
            <Stack direction={'row'} spacing={12} style={{ width: '100%', margin: '40px 20px 0px 20px' }}>
                <Stack style={{ width: '50%' }} rowGap={4} className="basic-info">
                    <Stack style={{ width: '100%' }} direction={'row'} justifyContent={'space-between'}>
                        <TextField required variant="standard" label='First Name' style={{ width: '45%' }} autoFocus
                            onChange={(event) => setFirstName(event.target.value)} value={firstName}
                        />
                        <TextField required variant="standard" label='Last Name' style={{ width: '45%' }}
                            onChange={(event) => setLastName(event.target.value)} value={lastName}
                        />
                    </Stack>
                    <TextField required variant="standard" label='Email'
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                    <TextField
                        select
                        style={{ height: '80px' }}
                        helperText="Please select your gender"
                        size="small"
                        label="Gender"
                        variant="standard"
                        onChange={(event) => setGender(event.target.value)}
                        value={gender}
                    >
                        <MenuItem key={1} value={'Male'} >Male</MenuItem>
                        <MenuItem key={2} value={'Female'} >Female</MenuItem>
                        <MenuItem key={3} value={'Other'} >Other</MenuItem>
                    </TextField>
                    <div className="dateOfBirthPicker" style={{ width: '100%', marginTop: '-30px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker label="Date of Birth" maxDate={dayjs(new Date())} format="YYYY/MM/DD" onChange={(value) => {
                                    const trueFormat = value.$y + "/" + (value.$M + 1) + "/" + value.$D
                                    setDateofBirth(trueFormat)
                                }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <TextField required variant="standard" label="Phone" style={{ width: '100%' }}
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        helperText="Only Vietnam region (+84) supported"

                    />
                    <TextField variant="standard" label="Address" style={{ width: '100%' }}
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}

                    />
                    {role === "student" && (
                        <Button startIcon={<ScheduleSend/>} className="studentSend" variant="contained" color="success" onClick={handleSendRequestButton}>Send Request</Button>
                    )}
                    {role === "teacher" && (
                        <Button startIcon={<ScheduleSend/>} className="teacherSend" variant="contained" color="success" onClick={handleSendRequestButton}>Send Request</Button>
                    )}
                </Stack>
                <Stack style={{ width: '50%' }} rowGap={4} className="teacher-info">
                    {role === "teacher" && (
                        <Fragment>
                            <TextField
                                select
                                style={{ width: '80%' }}
                                helperText="Please select language"
                                size="small"
                                label="Language"
                                value={language}
                                variant="standard"
                                onChange={(event) => setLanguage(event.target.value)}
                            >
                                {
                                    allLanguage.map((item, index) => {
                                        return (<MenuItem key={index + 1} value={index + 1}>{item.languageName}-{item.languageCode}</MenuItem>)
                                    })
                                }
                            </TextField>
                            <TextField
                                select
                                style={{ width: '80%' }}
                                helperText="Please select academic ranks"
                                size="small"
                                label="Academic Ranks"
                                value={academicRank}
                                variant="standard"
                                onChange={(event) => setAcademicRank(event.target.value)}
                            >
                                {
                                    allAcademicRanks.map((item, index) => {
                                        return (<MenuItem key={index + 1} value={index + 1}>{item.levelName}</MenuItem>)
                                    })
                                }
                            </TextField>
                        </Fragment>
                    )}
                </Stack>
            </Stack>
        </>
    )
}

export default AddNewAccountRequest