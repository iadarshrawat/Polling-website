import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Institute_Dash from "./Institute_Dash";
import Teacher_Dash from "./Teacher_Dash";
import Student_Dash from "./Student_Dash";
import UpdateUser from "./UpdateUser";
import '../CSS_files/home.css'

function Home() {


    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }



    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        const decodeToken = parseJwt(token);
        setUserRole(decodeToken.role);
        setUser(decodeToken);
    }, [user])

    const renderComponentByRole = () => {
        switch (userRole) {
            case 'institute':
                return <Institute_Dash />;
            case 'teacher':
                return <Teacher_Dash />;
            case 'student':
                return <Student_Dash />;
            default:
                return <div>No component found for this role</div>;
        }
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return {};
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            <div className="home-container">
                <div className="taskbar">
                    <h1>Welcome to polling website</h1>
                    <div className="action-buttons">
                        <button onClick={toggleEdit} className="btn-edit">
                            {isEditing ? 'Cancel Edit' : 'Edit Info'}
                        </button>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </div>
                </div>
                <div className="content">
                    {isEditing ? (
                        <UpdateUser user={user} />
                    ) : (
                        renderComponentByRole()
                    )}
                </div>
            </div>
        </>

    )
}

export default Home;