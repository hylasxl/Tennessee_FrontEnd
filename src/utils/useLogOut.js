
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { logout } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogout = () => {
    const { logoutContext } = useContext(UserContext);
    const navigate = useNavigate();

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

    return { handleLogout };
};