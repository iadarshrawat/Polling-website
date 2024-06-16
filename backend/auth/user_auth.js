const jwt = require('jsonwebtoken');
const { connection } = require("../database/db_connection");
require('dotenv').config();

const signup = (req, res)=>{
    const {name, email, password, phone, role} = req.body;
    console.log(name, email, password, phone, role);

    if (!name || !email || !password || !phone || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const insertUserQuery = `
            INSERT INTO users(name, email, password, phone, role)
            VALUES (?, ?, ?, ?, ?)`;

    connection.query(insertUserQuery, [name, email, password, phone, role], (error, result) => {
        if (error){
            if (error.code === 'ER_DUP_ENTRY') {
                console.log("User already exists");
            } 
            else{
                throw error;
            }
        } 
        res.json({
            "success": true,
            message: "User Register Successfully" 
        })
    });
}


const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Both fields are required' });
    }

    const userQuery = 'SELECT * FROM users WHERE email = ?';

    connection.query(userQuery, [email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = results[0];

        if (user.password === password) {

            const token = jwt.sign({ id: user.id, role: user.role, name: user.name, email: user.email, phone: user.phone }, process.env.SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', user, token:token });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    });
};


module.exports = {signup, login}