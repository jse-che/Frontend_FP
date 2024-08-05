const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('message', (data) => {
        console.log('Mensaje del cliente:', data);
        socket.emit('message', 'Hola desde el servidor');
    });

    socket.on('pidValuesChange', (data) => {
        console.log('Valores PID recibidos:', data);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });

    setInterval(() => {
        const data = {
            flowLevel: Math.floor(Math.random() * 11),
            temperatureLevel: Math.floor(Math.random() * 11),
            value: Math.floor(Math.random() * 11) 
        };
        socket.emit('data', data);
        socket.emit('message', data);
    }, 5000); 
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


// const express = require('express')
// const app = express()
// const mysql = require('mysql')
// const cors = require('cors')

// app.use(express.json())
// app.use(cors())

// app.listen(3002, ()=>{
//     console.log('server is running on port 3002')
// })

// // Create Database (mysql)
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'final_projectdb'
// })

// //routes

// app.post('/register', (req,res)=>{
//     const sentEmail = req.body.Email
//     const sentUserName = req.body.UserName
//     const sentPassword = req.body.Password

//     const SQL = 'INSERT INTO Users (email, username, password) VALUES (?,?,?)'
//     const Values = [sentEmail, sentUserName, sentPassword]

//     db.query(SQL, Values, (err, results)=>{
//         if(err){
//             res.send(err)
//         }
//         else{
//             console.log('User inserted successfully')
//             res.send({message: 'User added!'})
//         }
//     })
// })

// app.post('/login', (req,res)=>{

//     const sentloginUserName = req.body.LoginUserName
//     const sentloginPassword = req.body.LoginPassword

//     const SQL = 'SELECT * FROM Users WHERE username = ? AND password = ?';
//     const Values = [sentloginUserName, sentloginPassword]

//     db.query(SQL, Values, (err, results)=>{
//         if(err){
//             res.send({error: err})
//         } else {
//             if (results.length > 0) {
//                 res.send(results);
//             } else {
//                 res.send({ message: 'credentials Don’t match!' });
//             }
//         }
//     })
// })