import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { fetchAbsentRequest } from '../../../service/lecturerService';
import { useEffect, useState } from 'react';


const EducationalAffairNavigation = (props) => {

    const [pendingCount, setPendingCount] = useState(0)

    const subClassNavigation = props.subClassNavigation || "MAIN_PAGE"
    const subCourseNavigation = props.subCourseNavigation || "MAIN_PAGE"
    const subLecturerNavigation = props.subLecturerNavigation || "MAIN_PAGE"
    const subStudentNavigation = props.subStudentNavigation || "MAIN_PAGE"

    const CourseManagementChildrens = ['/educational-affair/course', '/educational-affair/course/create-new-course']
    const ClassManagementChildrens = ['/educational-affair/class', '/educational-affair/class/create-new-class', '/educational-affair/class/waiting-list', '/educational-affair/class/add-student']
    const LecturerManagementChildrens = ['/educational-affair/lecturer', '/educational-affair/lecturer/add-new-lecturer', '/educational-affair/lecturer/waiting-list']
    const StudentManagementChildrens = ['/educational-affair/student', '/educational-affair/student/add-new-student', '/educational-affair/student/waiting-list']
    const RoomManagementChildrens = ['/educational-affair/room']
    const AbsentChildrens = ['/educational-affair/absent-request']

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -1,
            top: 13,
        },
    }))(Badge);

    useEffect(() => {
        fetchAbsentRequest().then(res => {
            const data = res.DT
            data.forEach(item => {
                if (item.status === "Pending") setPendingCount(prev => prev + 1)
            })
        })
    }, [])

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">

                        <Nav.Link href="/educational-affair/course" className={CourseManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Course{subCourseNavigation !== "MAIN_PAGE" && ("-" + subCourseNavigation)}</Nav.Link>
                        <Nav.Link href="/educational-affair/class" className={ClassManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Class{subClassNavigation !== "MAIN_PAGE" && ("-" + subClassNavigation)}</Nav.Link>
                        <Nav.Link href="/educational-affair/lecturer" className={LecturerManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Lecturer{subLecturerNavigation !== "MAIN_PAGE" && ("-" + subLecturerNavigation)}</Nav.Link>
                        <Nav.Link href="/educational-affair/student" className={StudentManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Student{subStudentNavigation !== "MAIN_PAGE" && ("-" + subStudentNavigation)}</Nav.Link>
                        <Nav.Link href="/educational-affair/room" className={RoomManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Room</Nav.Link>

                        <div style={{ paddingLeft: '10px' }}>
                            <StyledBadge overlap='rectangular' badgeContent={pendingCount} color='secondary'>
                                <span>
                                    <Nav.Link href="/educational-affair/absent-request" className={AbsentChildrens.includes(window.location.pathname) ? 'active' : ''}>Absent Request</Nav.Link>
                                </span>
                            </StyledBadge>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </>)
}


export default EducationalAffairNavigation