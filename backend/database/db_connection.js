const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "process.env.HOST",
    user: "process.env.USER",
    password: "process.env.PASSWORD",
  });

const connectDB = async ()=>{
    // create database
    connection.query("CREATE DATABASE IF NOT EXISTS Users", (error, result) => {
        if (error) throw error;
        console.log("Database created or already exists");
    });
    // switch to database
    connection.changeUser({ database: 'Users' }, (err) => {
        if (err) throw err;
        console.log("Switched to mydatabase");
    });    
    // create table in database
    connection.connect((error)=>{
        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(10) NOT NULL,
                phone INT(15) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`;

        connection.query(createUserTableQuery, (error, result) => {
            if (error) throw error;
            console.log("Users table created or already exists");
        });


        const createPollTableQuery = `
            CREATE TABLE IF NOT EXISTS Poll (
                id INT AUTO_INCREMENT PRIMARY KEY,
                question VARCHAR(255) NOT NULL,
                trueCount INT(100),
                falseCount INT(100),
                isCheck BIT(1),
                role VARCHAR(10) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`;

        connection.query(createPollTableQuery, (error, result) => {
            if (error) throw error;
            console.log("Poll table created or already exists");
        });
    })
}

module.exports = {connectDB, connection};