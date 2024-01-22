import { useEffect, useState } from "react";
import EducationalAffairNavigation from "../../components/Navigation/Educational_Affair_Navigation/Educational_Affair_Navigation";
import { getAllLanguage } from "../../service/languageService";
import AirDatepicker from "air-datepicker";
import { set } from "lodash";

const EducationalAffairCreateCourse = () => {


    const [languages, setLanguages] = useState(null)
    const [isFilled, setIsFilled] = useState(false)

    const [name, setName] = useState(null)
    const [language, setLanguage] = useState(null)
    const [duration, setDuration] = useState(null)
    const [numberofLesson, setNumberofLesson] = useState(null)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)


    const [lesson, setLesson] = useState([])

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

    // function decimalToTime(decimalHours) {
    //     // Calculate hours and minutes
    //     const hours = Math.floor(decimalHours);
    //     const minutes = Math.round((decimalHours % 1) * 60);

    //     // Format hours and minutes
    //     const formattedHours = (hours < 10 ? "0" : "") + hours;
    //     const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

    //     return `${formattedHours}:${formattedMinutes}:00`;
    // }

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

    useEffect(() => {
        if (duration && numberofLesson && duration !== '' && numberofLesson !== '') {
            setIsFilled(true)
        } else setIsFilled(false)
    }, [duration, numberofLesson])

    useEffect(() => {
        setLesson([])
        if (numberofLesson && +numberofLesson > 1) {
            for (let index = 0; index < +numberofLesson; index++) {

                let obj = {
                    'id': index + 1,
                    'data': ''
                }

                setLesson(arr => [...arr, obj])
            }
        }
    }, [numberofLesson])

    return (
        <>
            <div className="create-new-course-container w-100">
                <EducationalAffairNavigation />
                <div className="input-field-container mt-5 ps-5 pe-4 w-100 d-flex flex-row gap-4">
                    <div className="course-information w-50">
                        <div className="table-header">
                            <h4>Course Information</h4>
                        </div>
                        <div class="input-group mb-3 mt-5">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    Course Name
                                </span>
                            </div>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Course name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    Language
                                </span>
                            </div>
                            <select className="form-select" value={language} onChange={(e) => { setLanguage(e.target.value) }}>
                                {
                                    languages && (languages.map((item, index) => (
                                        <option value={item.id} key={index}>{item.languageName}</option>
                                    ))
                                    )
                                }
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    Duration of Each Lesson
                                </span>
                            </div>
                            <input
                                type="text"
                                id="durationeachlesson"
                                class="form-control"
                                placeholder="Input duration of each lesson (From 2 to 4Hours)"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={duration}
                                onKeyDown={(e) => {
                                    allowSpecificKeys(e)
                                    // setDuration(e.target.value)

                                }}
                                onChange={(e) => {
                                    setDuration(e.target.value)
                                }}

                            />
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    Number of lesson
                                </span>
                            </div>
                            <input
                                type="number"
                                id="numberoflesson"
                                class="form-control"
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
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Total Duration
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    id="numberoflesson"
                                    class="form-control"
                                    placeholder="Number of lessons"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    min={0}
                                    value={decimalToTime(duration * numberofLesson)}
                                />
                            </div>
                        )}
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    Price
                                </span>
                            </div>
                            <input
                                type="number"
                                id="price"
                                class="form-control"
                                placeholder="Price"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                min={0}
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}
                            />
                        </div>
                        <div class="input-group mb-3">
                            <input
                                type="file"
                                id="image"
                                class="form-control"
                                placeholder="Image"
                                aria-label="Username"
                                aria-describedby="basic-addon1"

                            />
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    Description
                                </span>
                            </div>
                            <textarea
                                type="text"
                                id="durationeachlesson"
                                class="form-control"
                                placeholder="Description"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                style={{ height: '150px' }}
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </div>


                    </div>
                    <div className="lesson-information w-50">
                        {numberofLesson && numberofLesson !== '' && (
                            <div className="d-flex flex-column gap-4">
                                {[...Array(+numberofLesson)].map((_, index) => (
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
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