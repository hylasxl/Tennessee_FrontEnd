import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const LecturerNavigation = (props) => {

    const classChildrens = ['/lecturer/class']
    const timeTableChildrens = ['/lecturer/timetable']
    const checkAttendanceChildrens = ['/lecturer/check-attendance']
    const academicTranscriptChildrens = ['/lecturer/academic-transcript']
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/lecturer/class" className={classChildrens.includes(window.location.pathname) ? 'active' : ''}>Class</Nav.Link>
                        <Nav.Link href="/lecturer/timetable" className={timeTableChildrens.includes(window.location.pathname) ? 'active' : ''}>TimeTable</Nav.Link>
                        <Nav.Link href="/lecturer/check-attendance" className={checkAttendanceChildrens.includes(window.location.pathname) ? 'active' : ''}>Check Attendance</Nav.Link>
                        <Nav.Link href="/lecturer/academic-transcript" className={academicTranscriptChildrens.includes(window.location.pathname) ? 'active' : ''}>Academic Transcript</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>)
}

export default LecturerNavigation