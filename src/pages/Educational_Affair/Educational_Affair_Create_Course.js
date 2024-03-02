import { useEffect, useState, useContext } from "react";
import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import { getAllLanguage } from "../../service/languageService";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { sendRequestCreateCourse } from "../../service/courseService";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


const EducationalAffairCreateCourse = () => {

    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const [languages, setLanguages] = useState(null)
    const [isFilled, setIsFilled] = useState(false)
    const [lesson, setLesson] = useState([])

    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [duration, setDuration] = useState('')
    const [numberofLesson, setNumberofLesson] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [isNumberEmpty, setIsNumberEmpty] = useState(true)
    const [isLessonLoaded, setIsLessonLoaded] = useState(false)

    const handleGetAllLanguages = async () => {
        return await getAllLanguage();
    }


    useEffect(() => {
        if (!languages) {
            handleGetAllLanguages().then((res) => {
                if (+res.EC === 1) {
                    setLanguages(res.DT)
                }
            })

        }
    }, [languages])

    const decimalToTime = (time) => {
        return `${time} Hours`;
    }

    const allowSpecificKeys = (event) => {
        const allowedKeys = [8, 9, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 116];

        if (!allowedKeys.includes(event.keyCode)) {
            event.preventDefault();
        }

        // return event.target.value
    }

    const allowSpecificKeysofrDuration = (event) => {
        const allowedKeys = [8, 9, 50, 51, 52, 116];

        if (!allowedKeys.includes(event.keyCode)) {
            event.preventDefault();
        }

        // return event.target.value
    }


    useEffect(() => {
        if (duration && numberofLesson && duration !== '' && numberofLesson !== '') {
            setIsFilled(true)
        } else setIsFilled(false)
    }, [duration, numberofLesson])




    useEffect(() => {
        setIsLessonLoaded(false)
        setLesson([])

        if (numberofLesson && +numberofLesson > 0 && numberofLesson !== '') {
            for (let index = 0; index < +numberofLesson; index++) {

                let obj = {
                    'id': index + 1,
                    'data': '',
                }

                setLesson(arr => [...arr, obj])
            }
            setIsLessonLoaded(true)
            setIsNumberEmpty(false)
        } else setIsNumberEmpty(true)
    }, [numberofLesson])

    useEffect(() => {
        if (isLessonLoaded) {
            for (let index = 0; index < +numberofLesson; index++) {
                const inputId = `lesson${index + 1}`;
                const element = document.getElementById(inputId)
                element.value = ''
                // console.log(element);
            }
        }
    }, [isLessonLoaded, numberofLesson])

    const handleSubmitButtonCLick = async () => {
        if (!name || name === '') {
            toast.error("Course name is empty")
            return
        }
        if (!language || language === '') {
            toast.error("Language is not selected")
            return
        }
        if (!duration || duration === '') {
            toast.error("Duration is empty")
            return
        }
        if (+duration < 2 || +duration > 4) {
            toast.warning("Duration must between 2 and 4 Hours")
        }
        if (!numberofLesson || numberofLesson === '') {
            toast.error("Number of lesson is empty")
            return
        }
        if (!price || price === '') {
            toast.error("Price is empty")
            return
        }

        if (lesson.length < 1) return
        if (lesson.length > 0) {
            var validLesson = true
            lesson.some(item => {
                if (item.data === "") {
                    validLesson = false
                    toast.error(`Lesson ${item.id} is empty`)
                    return
                }
            })
            if (!validLesson) return
        }

        // console.log(name,
        //    language, 
        //    duration, 
        //    numberofLesson, 
        //    price, 
        //    description, JSON.stringify(lesson));
        const totalDuration = duration * numberofLesson
        const data = await sendRequestCreateCourse(
            name,
            language,
            totalDuration,
            duration,
            numberofLesson,
            price,
            description,
            JSON.stringify(lesson),
            user.user.userId
        )

        if(data && +data.EC === 1){
            toast.success("Created course successfully")
            navigate('/educational-affair/course')
        } else if (data && +data.EC !== 1){
            toast.error("There is an error while creating course")
        }
    }

    return (
        <>
            <div className="create-new-course-container w-100" style={{ marginBottom: '30px' }}>
                <EducationalAffairNavigation />
                <div className="input-field-container mt-5 ps-5 pe-4 w-100 d-flex flex-row gap-4">
                    <div className="course-information w-50">
                        <div className="table-header">
                            <h4>Course Information</h4>
                        </div>
                        <div className="input-group mb-3 mt-5">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Course Name
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Course name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Language
                                </span>
                            </div>
                            <select className="form-select" value={language} onChange={(e) => { setLanguage(e.target.value) }}>
                                <option value={null}>Select Language</option>
                                {
                                    languages && (languages.map((item, index) => (
                                        <option value={item.id} key={index}>{item.languageName}</option>
                                    ))
                                    )
                                }
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Duration of Each Lesson
                                </span>
                            </div>
                            <input
                                type="text"
                                id="durationeachlesson"
                                className="form-control"
                                placeholder="Input duration of each lesson (From 2 to 4Hours)"
                                aria-label="Username"
                                maxLength={1}
                                aria-describedby="basic-addon1"
                                value={duration}
                                onKeyDown={(e) => {
                                    allowSpecificKeysofrDuration(e)
                                    // setDuration(e.target.value)

                                }}
                                onChange={(e) => {
                                    setDuration(e.target.value)
                                }}

                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Number of lesson
                                </span>
                            </div>
                            <input
                                type="number"
                                id="numberoflesson"
                                className="form-control"
                                placeholder="Number of lessons"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                min={0}
                                value={numberofLesson}
                                onKeyDown={(e) => {
                                    allowSpecificKeys(e)
                                    // setDuration(e.target.value)

                                }}
                                onChange={(e) => {
                                    setNumberofLesson(e.target.value)
                                }}

                            />
                        </div>
                        {isFilled && (
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        Total Duration
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    id="numberoflesson"
                                    className="form-control"
                                    placeholder="Number of lessons"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    min={0}
                                    value={decimalToTime(duration * numberofLesson)}
                                />
                            </div>
                        )}
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Price
                                </span>
                            </div>
                            <input
                                type="number"
                                id="price"
                                className="form-control"
                                placeholder="Price"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                min={0}
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                placeholder="Image"
                                aria-label="Username"
                                aria-describedby="basic-addon1"

                            />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Description
                                </span>
                            </div>
                            <textarea
                                type="text"
                                id="durationeachlesson"
                                className="form-control"
                                placeholder="Description"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                style={{ height: '120px' }}
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </div>

                        <div className="submit-button-section justify-content-end">
                            <Button variant="contained" sx={{
                                backgroundColor: '#1a2d59'
                            }} onClick={() => handleSubmitButtonCLick()}>Send Request</Button>
                        </div>

                    </div>
                    <div className="lesson-information w-50">
                        {!isNumberEmpty && (

                            <div className="d-flex flex-column gap-4" >
                                {[...Array(+numberofLesson)].map((_, index) => (
                                    <div className="input-group" key={`lesson${index + 1}`}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">
                                                Lesson {index + 1}
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control lesson-input"
                                            placeholder="Lesson name"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            id={`lesson${index + 1}`}

                                            onChange={(e) => {

                                                const data = e.target.value
                                                const id = e.target.id
                                                var num = id.replace(/[^0-9]/g, '');
                                                const updatedObject = {
                                                    'id': +num,
                                                    'data': data
                                                }
                                                const indexOfUpdatedObject = lesson.findIndex(obj => obj.id === updatedObject.id);
                                                const newArray = [
                                                    ...lesson.slice(0, indexOfUpdatedObject), // elements before the updated object
                                                    updatedObject, // updated object
                                                    ...lesson.slice(indexOfUpdatedObject + 1) // elements after the updated object
                                                ];
                                                setLesson(newArray)
                                            }}

                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default EducationalAffairCreateCourse;