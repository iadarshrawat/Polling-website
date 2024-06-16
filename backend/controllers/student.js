const { connection } = require("../database/db_connection");


const student_poll = (req, res)=>{
    
    const studentPollQuery = `SELECT * FROM poll WHERE role='student'`;

    connection.query(studentPollQuery, (error, result)=>{
        if(error){
            throw error;
        }
        res.send(result)
    })
}

const votePoll = (req, res) => {
    const { pollId, vote } = req.body;

    if (!pollId || !vote) {
        return res.status(400).json({ message: 'Poll ID and vote are required' });
    }

    // First, check if the student has already voted
    const checkVoteQuery = `SELECT * FROM poll WHERE id = ? AND isCheck = ?`;

    connection.query(checkVoteQuery, [pollId, 1], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error checking vote status', error });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'You have already voted on this poll' });
        }

        // If not already voted, update the poll's vote count and set isCheck to 1
        const voteColumn = vote === 'true' ? 'trueCount' : 'falseCount';
        const votePollQuery = `UPDATE poll SET ${voteColumn} = ${voteColumn} + 1, isCheck = ? WHERE id = ?`;

        connection.query(votePollQuery, [1, pollId], (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Error voting on poll', error });
            }
            res.json({ success: true, message: 'Vote registered successfully' });
        });
    });
};


module.exports = { student_poll, votePoll };
