const express = require("express");
const { signup, login } = require("./auth/user_auth");
const {connectDB} = require("./database/db_connection");
const bodyParser = require('body-parser');
const { isAuth } = require("./middlewares/authmiddleware");
const cors = require('cors');
const { createPoll, deletePoll, checkPoll } = require("./controllers/instutute");
const { student_poll, votePoll } = require("./controllers/student");
const { teacher_poll } = require("./controllers/teacher");
const { updateUser } = require("./controllers/edit");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.post('/signup', signup);
app.post('/login', login);
app.post('/isAuth', isAuth);

app.post('/createPoll', createPoll);
app.delete('/deletePoll', deletePoll);

app.get('/studentPoll', student_poll)
app.get('/teacherPoll', teacher_poll)

app.post('/vote-poll', votePoll);
app.post('/updateUser' ,updateUser);

app.get('/checkPoll', checkPoll)

app.listen(5000, ()=>{
    console.log("server is running at port number 5000");
})
