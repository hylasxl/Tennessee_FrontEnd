import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const EducationalAffairNavigation = () => {

    const CourseManagementChildrens = ['/educational-affair/course', '/educational-affair/course/create-new-course']
    const ClassManagementChildrens = ['/educational-affair/class','/educational-affair/class/create-new-class']
    const LecturerManagementChildrens = ['/educational-affair/lecturer','/educational-affair/lecturer/add-new-lecturer','/educational-affair/lecturer/waiting-list']
    const StudentManagementChildrens = ['/educational-affair/student','/educational-affair/student/add-new-student','/educational-affair/student/waiting-list']
    const RoomManagementChildrens = ['/educational-affair/room']

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">

                        <Nav.Link href="/educational-affair/course" className={CourseManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Course</Nav.Link>
                        <Nav.Link href="/educational-affair/class" className={ClassManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Class</Nav.Link>
                        <Nav.Link href="/educational-affair/lecturer" className={LecturerManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Lecturer</Nav.Link>
                        <Nav.Link href="/educational-affair/student" className={StudentManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Student</Nav.Link>
                        <Nav.Link href="/educational-affair/room"  className={RoomManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Room</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </>)
}


export default EducationalAffairNavigation