import { useEffect, useState } from "react";
import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import './Education_Affair.scss'
import { TextField, MenuItem, Autocomplete } from "@mui/material";
import { getAllClass } from '../../service/classService'
import { fetchStudentByClass, saveStudent } from "../../service/studentService";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
const EducationalAffairClassAddStudent = () => {

    const [selectedClass, setSelectedClass] = useState('')
    const [classList, setClassList] = useState([])
    const [studentList, setStudentList] = useState([])
    const [selectedStudentList, setSelectedStudentList] = useState([])

    const handleFetchClass = async () => {
        return await getAllClass("Approved")
    }

    const handleFetchStudent = async (classId) => {
        return await fetchStudentByClass(classId)
    }

    const handleSave = async (classId, studentList) => {
        return await saveStudent(classId, studentList)
    }

    useEffect(() => {
        handleFetchClass().then((res) => {
            setClassList(res.DT)
        })
    }, [])

    useEffect(() => {
        if (selectedClass !== "") {
            handleFetchStudent(selectedClass).then((res) => {
                setStudentList(res.DT)
            })
        }
    }, [selectedClass])



    return (
        <>
            <div className="page-container">
                <EducationalAffairNavigation subClassNavigation='Add Student' />
                <div className="page-content" style={{ margin: '20px 40px' }}>
                    <TextField
                        select
                        style={{ height: '80px', width: '25%', transition: 'all .2s' }}
                        helperText="Please select course"
                        size="small"
                        label="Course"
                        variant="standard"
                        defaultValue={''}
                        onChange={(event) => setSelectedClass(event.target.value)}
                        value={selectedClass}>
                        {
                            classList.map((item, index) => {
                                if (item.operatingStatus === "Incoming")
                                    return (<MenuItem key={item.id} value={item.id}>{item.className}</MenuItem>)

                            })
                        }
                    </TextField>
                    <h2>Available Students</h2>
                    <Autocomplete
                        disablePortal

                        multiple
                        id="tags-standard"
                        options={studentList}
                        getOptionLabel={(option) => option.firstName + " " + option.lastName}
                        onChange={(e, newValue) => {
                            const ids = []
                            newValue.forEach(item => {
                                ids.push(item.accountId)
                            })
                            setSelectedStudentList(ids)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Students"
                                placeholder="Students"
                            />
                        )}
                    />
                    <Button style={{ fontFamily: 'Roboto Slab', marginTop: '20px' }} disabled={selectedStudentList.length > 0 ? false : true} onClick={() => {
                        handleSave(selectedClass, selectedStudentList).then((res) => {
                            if (res && +res.EC === 2) {
                                toast.warn(res.EM)
                                return
                            }
                            if (res && +res.EC === 1) {
                                toast.success("Add Student Successfully")
                                return
                            }
                        })
                    }} variant="contained" color="primary">SAVE</Button>
                </div>
            </div>

        </>)
}

export default EducationalAffairClassAddStudent;   