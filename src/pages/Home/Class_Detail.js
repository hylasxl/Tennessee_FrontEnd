import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useLocation } from "react-router-dom"
import ClassInfo from "../../components/Class/Class_Detail"

const ClassDetail = () => {
    const location = useLocation()
    const {classInfo} = location.state||{}
    return (
        <>
            <Header />
            <div style={{ padding: '40px' }}>
                <ClassInfo classData={classInfo}/>
            </div>
            <Footer />
        </>
    )
}

export default ClassDetail