const { connection } = require("../database/db_connection");

const createPoll = async (req, res)=>{
    const {question, role} = req.body;

    if (!question || !role) {
        return res.status(400).json({ message: 'Question and Role fields are required'});
    }

    const insertPollQuery = `INSERT INTO poll(question, trueCount, falseCount, isCheck ,role) VALUES (?, ?, ?, ?, ?)`;

    connection.query(insertPollQuery, [question,0,0,0, role], (error, result) => {
        if (error){
            throw error;
        } 
        res.json({
            "success": true,
            message: "Poll Register Successfully" 
        })
    });
}

const deletePoll = async(req, res)=>{
    const {role} = req.body;
    const deletePollQuery = `delete from poll where role=?;`
    connection.query(deletePollQuery, [role], (error, result)=>{
        if(error){
            throw error;
        }
        res.json({
            "success": true,
            message: "sucessfully deleted Poll"
        })
    }); 
}

const checkPoll = async (req, res) => {
    const query = `SELECT * FROM poll`;
    connection.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error fetching polls', error });
        }
        res.json(result);
    });
};

module.exports = {createPoll, deletePoll, checkPoll}