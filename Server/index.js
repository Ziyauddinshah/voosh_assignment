const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// npm run devstart make node server live

const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieparser = require("cookie-parser");

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true,
    optionSuccessStatus:200
}));
app.use(cookieparser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "voosh_db",
    port: "3308"
});

// checking db connection
db.connect((error) => {
    if(error)
        throw error;
    console.log("mysql connected");
})

const secret = "secret-key";

// generating jwt token
const generateToken = (data) =>{
    const payload = {
        userId: data.id,
        phoneNo: data.phoneNo,
    };
    return jwt.sign(payload,secret,{expiresIn: "2h"});
}

// verifying jwt token
const verifyToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    const auth = authHeader.split(" ");
    const token  = auth[1];
    if(!token){
        return res.status(401).send("Access denied. No token provided");
    }
    try {
        console.log("JWT Token For verification: ",token)
        const decoded = jwt.verify(token,secret);
        console.log("decoded: ",decoded);
        req.user = decoded;
        next();
    } catch(ex) {
        return res.status(400).send("Invalid token");
    }
}

// getting all users
app.get("/get-users", (req,res) => {
    const sqlSelect = "SELECT * FROM Users";
    db.query(sqlSelect,(error,result) =>{
        res.send(result);
    })
})

//registration process
app.post("/add-user" ,(request,response) => {
    const name = request.body.name;
    const phoneno = request.body.phoneno;
    const password = request.body.password;
    bcrypt.hash(password,saltRounds,(err,hashpassword) => {
        if(err)
            response.send(err);
        const sqlInsert = "INSERT INTO Users (Name,Phone_No,Password) VALUES(?,?,?)";
        db.query(sqlInsert, [name,phoneno,hashpassword], (error) =>{
            if(error) {
                response.send(error);
            }
            else {
                const user = {
                    id: name,
                    phoneNo: phoneno,
                }
                const token = generateToken(user);
                console.log("Generated JWT Token: ",token);
                response.send({token:token,message: 'Success !'});
            }   
        })
    });
})

//login process
app.post("/login-user" ,(request,response) => {
    const phoneno = request.body.phoneno;
    const password = request.body.password;
    const sqlInsert = "SELECT * FROM Users WHERE Phone_No = ?";
    db.query(sqlInsert,[phoneno], (error,result) =>{
        if(error)
            response.send({error: error});
        if(result.length > 0) {
            bcrypt.compare(password,result[0].Password,(err,res) => {
                if(err) {
                    console.log(err);
                    response.send({message: "Wrong login credentials!"});
                }
                else if(res) {
                    const user = {
                        id: result[0].Name,
                        phoneNo: result[0].Phone_No,
                    }
                    const token = generateToken(user);
                    console.log("Generated JWT Token: ",token);
                    response.send({result,token:token});
                }
            });
        }  
        else{
            response.send({message: "User does not exist!"});
        }    
    });
    
});

// adding order of a user
app.post("/add-order",(request,response) =>{
    const userId = request.body.userid;
    const subTotal = request.body.subtotal;
    const phoneNo = request.body.phoneno;
    const sqlInsert = "INSERT INTO Order_Details (User_Id,Sub_Total,Phone_No) VALUES(?,?,?)";
    db.query(sqlInsert, [userId,subTotal,phoneNo], (error,result) =>{
        if(error) {
            console.log(error);
            response.send(error);
        }
        else {
            //console.log(result);
            response.send({message: 'Success !'});
        }   
    })
})

// getting order details by userId
app.get("/get-order/:id",verifyToken, (req,res) => {
    const authHeader = req.headers["authorization"];
    const auth = authHeader.split(" ");
    const userid = req.params.id;
    //console.log(userid,auth[1]);
    const sqlSelect = `SELECT * FROM Order_Details where User_Id = ${userid}`;
    db.query(sqlSelect,(error,result) =>{
        //console.log(result);
        res.send(result);
    })
})

let PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} ...`);
});

