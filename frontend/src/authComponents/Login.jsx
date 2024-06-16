import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS_files/login.css'

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', formData)
            .then(response => {
                const { token, user } = response.data;
                // Store token in localStorage
                localStorage.setItem('token', token);
                // Optionally store user data in localStorage or state for use in the app
                console.log('Login successful');
                console.log('User:', user);
                navigate('/home')
                // Redirect to dashboard or next page
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <div className="register-link">
                If you don't have an account, please <Link to="/SignUp">Register</Link>
            </div>
        </div>
    );
};

export default Login;
