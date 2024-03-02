import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from 'react-router-dom';
import qs from "qs"

const AdminNavigation = (props) => {
    const params = useParams()
    const username = params.username || '';
    const courseDetailUrl = params.data || '';

    let searchParams = qs.parse(courseDetailUrl)
    searchParams = qs.stringify(searchParams)

    
    const AccountManagementChildrens = ['/admin/account',`/admin/account/user-info/${username}`]
    const CourseManagementChildrens = ['/admin/course',`/admin/course/detail/${searchParams}`]


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/account" className={AccountManagementChildrens.includes(window.location.pathname)?'active':''}>Account</Nav.Link>
                        <Nav.Link href="/admin/course" className={CourseManagementChildrens.includes(window.location.pathname)?'active':''}>Course Requests</Nav.Link>
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavigation;