import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const Admin_Navigation = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/account" className={window.location.pathname==='/admin/account'?'active':''}>Account Management</Nav.Link>
                        <Nav.Link href="/admin/course" className={window.location.pathname==='/admin/course'?'active':''}>Course Management</Nav.Link>
                        <Nav.Link href="/admin/class" className={window.location.pathname==='/admin/class'?'active':''}>Class Management</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Admin_Navigation;