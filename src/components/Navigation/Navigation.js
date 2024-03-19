import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.scss'
import { UserContext } from '../../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import { logout } from '../../service/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Navigation = () => {



    // const [account, setAccount] = useState('')
    const { user, logoutContext } = useContext(UserContext)
    const navigate = useNavigate();
    const [username, setUsername] = useState(null)
    const [accountType, setAccountType] = useState(null)
    const [userId, setUserId] = useState(null)


    useEffect(() => {
        let username = user && user.username ? user.username : null;
        let type = user && user.userPermissions && user.userPermissions.id ? user.userPermissions.id : (user && user.user && user.user.userPermissions && user.user.userPermissions.id ? user.user.userPermissions.id : null)
        let id = user && user.userId ? user.userId : (user && user.user && user.user.userId ? user.user.userId : null);
        setUserId(id)
        setUsername(username)
        setAccountType(type)
    }, [user])


    const handleLogout = async () => {
        let data = await logout();
        if (data && +data.EC === 1) {
            logoutContext();
            toast.success("Log out successfully");
            navigate("/login");
        } else {
            toast.error("Can not log out");
        }
    };

    const handleAccountClick = () => {
        navigate(`/account`)
    }

    const handleAdminClick = () => {
        navigate('/admin/account')
    }

    const handleEducationalAffairClick = () => {
        navigate('/educational-affair/course')
    }

    const handleStudentClick = () => {
        navigate('/student/class')
    }

    const handleLeturerClick = ()=>{
        navigate('/lecturer/class')
    }

    return (
        <Navbar expand="lg" className="bg-1a2d59 w-100 container-fluid">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                    <div>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/course" className=''>Courses</Nav.Link>
                                <Nav.Link href="/about">About Us</Nav.Link>
                                <Nav.Link href="/contact">Contacts</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </div>
                    <div>
                        {user && user.isAuthenticated ? (

                            <div className='d-flex flex-row gap-4'>
                                <div>Welcome, {username}</div>
                                {accountType === 1 &&
                                    (<div>
                                        <span style={{ cursor: 'pointer' }} onClick={() => handleAdminClick()}>Administration</span>
                                    </div>)
                                }
                                {accountType === 2 &&
                                    (<div>
                                        <span style={{ cursor: 'pointer' }} onClick={() => handleEducationalAffairClick()}>Educational Affair Management</span>
                                    </div>)
                                }
                                {accountType === 3 &&
                                    (<div>
                                        <span style={{ cursor: 'pointer' }} onClick={() => handleLeturerClick()}>Lecturer Management</span>
                                    </div>)
                                }
                                {
                                    accountType === 4 &&
                                    (
                                        <div>
                                            <span style={{ cursor: 'pointer' }} onClick={() => handleStudentClick()}>Student Management</span>
                                        </div>
                                    )
                                }

                                <NavDropdown title="Options" id="basic-nav-dropdown">
                                    <NavDropdown.Item className='dropdown-items'>
                                        <span onClick={() => handleAccountClick()} style={{ color: 'black' }}>Account</span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='dropdown-items' >
                                        <span onClick={() => handleLogout()} style={{ color: 'black' }}>Log out</span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        ) : (window.location.pathname !== '/login' && <Nav.Link href='/login' >Login</Nav.Link>
                        )}
                    </div>
                </div>
            </Container>
        </Navbar>
    );
}



export default Navigation;
