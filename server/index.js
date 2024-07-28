const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.listen(3002, ()=>{
    console.log('server is running on port 3002')
})

// Create Database (mysql)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'final_projectdb'
})

//routes

app.post('/register', (req,rest)=>{
    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password

    const SQL = 'INSERT INTO Users (email, username, password) VALUES (?,?,?)'
    const Values = [sentEmail, sentUserName, sentPassword]

    db.query(SQL, Values, (err, results)=>{
        if(err){
            rest.send(err)
        }
        else{
            console.log('User inserted successfully')
            rest.send({message: 'User added!'})
        }
    })
})

app.post('/login', (req,res)=>{

    const sentloginUserName = req.body.LoginUserName
    const sentloginPassword = req.body.LoginPassword

    const SQL = 'SELECT * FROM users WHERE username = ? && password'
    const Values = [sentloginUserName, sentloginPassword]

    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        // if(results.length > 0 ){
        //     res.send(results)
        // }
        else{
            res.send({message: 'credentials Don´t match!'})
        }
    })
})