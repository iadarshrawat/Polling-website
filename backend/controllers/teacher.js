const { connection } = require("../database/db_connection");

const teacher_poll = (req, res)=>{
    
    const teacherPollQuery = `SELECT * FROM poll WHERE role=?`;

    connection.query(teacherPollQuery, ["teacher"] ,(error, result)=>{
        if(error){
            throw error;
        }
        res.send(result)
    })
}

module.exports = {teacher_poll}