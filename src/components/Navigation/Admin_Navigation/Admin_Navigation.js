import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from 'react-router-dom';

const AdminNavigation = (props) => {
    const params = useParams()
    const username = params.username || '';

    const AccountManagementChildrens = ['/admin/account',`/admin/account/user-info/${username}`]
    


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/account" className={AccountManagementChildrens.includes(window.location.pathname)?'active':''}>Account</Nav.Link>
                        <Nav.Link href="/admin/course" className={window.location.pathname==='/admin/course'?'active':''}>Course Requests</Nav.Link>
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavigation;