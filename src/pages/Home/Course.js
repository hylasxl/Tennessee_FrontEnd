import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { getAllClass } from "../../service/classService"
import { useEffect, useState } from "react"
import ClassCard from "../../components/Class/ClassCard"

const Course = () => {

    const [classList, setClassList] = useState([])
    useEffect(() => {
        getAllClass().then(res => {
            console.log(res.DT);
            setClassList(res.DT)
        })
    }, [])
    const classInfo = {
        name: "DI ME MAY",
        instructor: "TAO nef",
        time:"55",
        location:"3243"
    }

    return (
        <>
            <Header />
                <ClassCard classInfo={classInfo}/>
            <Footer />
        </>
    )
}

export default Course