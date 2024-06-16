import React, { useState } from 'react';
import axios from 'axios';// Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const UpdateUser = ({ user }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/updateUser', formData)
            .then(response => {
                setMessage(response.data.message);
                navigate('/home');
            })
            .catch(error => {
                setMessage('Error updating user');
                console.error('Update user error:', error);
            });
    };

    return (
        <div className="update-user-container">
            <h2>Update Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn">Update</button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
}

export default UpdateUser;