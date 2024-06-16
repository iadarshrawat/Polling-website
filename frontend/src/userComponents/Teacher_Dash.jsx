import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS_files/teacher.css'

const Teacher_Dash = () => {
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch teacher-specific polls
        axios.get('http://localhost:5000/teacherPoll')
            .then(response => {
                setPolls(response.data);
            })
            .catch(error => {
                setError('Error fetching teacher polls');
                console.error('Fetch polls error:', error);
            });
    }, []);

    const handleVote = (pollId, vote) => {
        axios.post('http://localhost:5000/vote-poll', { pollId, vote })
            .then(response => {
                setPolls(polls.map(poll =>
                    poll.id === pollId
                        ? { ...poll, [vote === 'true' ? 'trueCount' : 'falseCount']: poll[vote === 'true' ? 'trueCount' : 'falseCount'] + 1 }
                        : poll
                ));
            })
            .catch(error => {
                setError('You have already voted or something went wrong');
                console.error('Vote poll error:', error);
            });
    };

    return (
        <div className="polls-container">
            <h2>Teacher Polls</h2>
            {error && <p className="error-message">{error}</p>}
            {polls.length > 0 ? (
                <ul className="polls-list">
                    {polls.map(poll => (
                        <li key={poll.id} className="poll-item">
                            <p><strong>Question:</strong> {poll.question}</p>
                            <p><strong>True Count:</strong> {poll.trueCount}</p>
                            <p><strong>False Count:</strong> {poll.falseCount}</p>
                            <button onClick={() => handleVote(poll.id, 'true')}>True</button>
                            <button onClick={() => handleVote(poll.id, 'false')}>False</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No polls available</p>
            )}
        </div>
    );
};

export default Teacher_Dash;
