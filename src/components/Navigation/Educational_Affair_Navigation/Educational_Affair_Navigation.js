import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const EducationalAffairNavigation = () =>{

    const CourseManagementChildrens = ['/educational-affair/course','/educational-affair/course/create-new-course']

    return  (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">

                        <Nav.Link href="/educational-affair/course" className={CourseManagementChildrens.includes(window.location.pathname)?'active':''}>Course</Nav.Link>
                        <Nav.Link href="/educational-affair/class">Class</Nav.Link>
                        <Nav.Link href="/educational-affair/lecturer">Lecturer</Nav.Link>
                        <Nav.Link href="/educational-affair/student">Student</Nav.Link>
                        <Nav.Link href="/educational-affair/room">Room</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
    </>)
}


export default EducationalAffairNavigation