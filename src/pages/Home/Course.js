import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { getAllClass } from "../../service/classService"
import { useEffect, useState } from "react"
import ClassCard from "../../components/Class/ClassCard"

const Course = () => {

    const [classList, setClassList] = useState([])
    useEffect(() => {
        getAllClass().then(res => {
            setClassList(res.DT)
        })
    }, [])

    return (
        <>
            <Header />
            <div style={{padding:'50px',display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                {classList.map((item,index)=>{
                    if(item.approveStatus==="Approved"&&(item.operatingStatus==="Incoming"||item.operatingStatus==="Operating")){
                        return(<ClassCard classInfo={item}/>)
                    } else return (<></>)
                })}
            </div>
            <Footer />
        </>
    )
}

export default Course