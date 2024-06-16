import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS_files/institute.css'

const Institute_Dash = () => {
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState('');
    const [question, setQuestion] = useState('');
    const [role, setRole] = useState('student');
    const [message, setMessage] = useState('');


    useEffect(() => {
        axios.get('http://localhost:5000/checkPoll')
            .then(response => {
                setPolls(response.data);
            })
            .catch(error => {
                setError('Error fetching polls');
                console.error('Error fetching polls:', error);
            });
    }, []);

    const handleCreatePoll = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/createPoll', { question, role })
            .then(response => {
                setMessage(response.data.message);
                setQuestion('');
                setRole('student');
            })
            .catch(error => {
                setMessage('Error creating poll');
                console.error('Create poll error:', error);
            });
    };

    return (
        <>
            <div className="dashboard-container">
                <h2>Institute Dashboard</h2>
                <form onSubmit={handleCreatePoll}>
                    <div className="form-group">
                        <label>Poll Question:</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="institute">Institute</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Create Poll</button>
                </form>

                {message && <p className="form-message">{message}</p>}
            </div>

            <div className="institute-container">
                <h2>Institute Polls</h2>
                {error && <p className="error-message">{error}</p>}
                {polls.length > 0 ? (
                    <ul className="polls-list">
                        {polls.map(poll => (
                            <li key={poll.id} className="poll-item">
                                <p><strong>Question:</strong> {poll.question}</p>
                                <p><strong>True Count:</strong> {poll.trueCount}</p>
                                <p><strong>False Count:</strong> {poll.falseCount}</p>
                                <p><strong>For Role:</strong>{poll.role}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No polls available</p>
                )}
            </div>
        </>

    );
}

export default Institute_Dash;