import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS_files/signup.css'

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'student' // Default role selection
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup', formData)
            .then(response => {
                console.log(response.data.message); // Success message
                navigate('/login')
            })
            .catch(error => {
                console.error('Signup error:', error);
                // Handle error and show appropriate message to user
            });
    };

    return (
        <div className='upper'>
        <div className="signup-page">
            <h2>Signup Page</h2>
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
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="institute">Institute</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>
                <button type="submit" className="btn">Signup</button>
            </form>

            <div className="login-link">
                <span>If already have an account, go to <Link to="/login">Login</Link></span>
            </div>
        </div>
        </div>
    );
};

export default Signup;
