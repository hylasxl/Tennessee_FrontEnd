import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const StudentNavigation = (props) => {

    const classChildrens = ['/student/class']
    const absentChildrens = ['/student/absent-request']
    const timetableChildrens = ['/student/timetable']
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/student/class" className={classChildrens.includes(window.location.pathname) ? 'active' : ''}>Class</Nav.Link>
                        <Nav.Link href="/student/timetable" className={timetableChildrens.includes(window.location.pathname) ? 'active' : ''}>Time Table</Nav.Link>
                        <Nav.Link href="/student/absent-request" className={absentChildrens.includes(window.location.pathname) ? 'active' : ''}>Absent Request</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>)
}


export default StudentNavigation