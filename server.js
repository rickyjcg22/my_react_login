const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const cors = require('cors')
app.use(
    cors({
        origin: "http://localhost:3000"
    })
)

// Endpoint for login with jwt security implemented.
const LoginProfiles = [

    {
        id: 1,
        username: "admin",
        password: "passwd123",
        isAdmin: true,
    },
    {
        id: 2,
        username: "staff",
        password: "123456",
        isAdmin: false,
    },
    {
        id: 3,
        username: "vice",
        password: "abrakadabra",
        isAdmin: false,
    },
{
        id: 4,
        username: "super",
        password: "69843",
        isAdmin: true,
    },
{
        id: 5,
        username: "user",
        password: "123",
        isAdmin: false,
    }
];

app.post('/login-no-verify',(req,res)=>{
    const {username,password} = req.body;
    // console.log(username + ' ' + typeof(username) + ' ' + password + ' ' + typeof(password));
    const user = LoginProfiles.find(

        (u)=>{

            if(u.username === username && u.password === password) {
                return u;
            }

        }
    );

    console.log(user)

    if(user) {

        const accessToken = generateAccessToken(user);

        res.json(/*{
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken: accessToken
        }*/
        {"Code":"200","Msg":"Success!"}
        )
    } else{
        res.status(400).json({"Code":"400","Msg":"Failed!"})
    }
})

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            asAdmin: user.isAdmin
        },
        "ThisIsMySecretKeysdlkfvnaeklsbnfalbfnskdlbnfs",
        { expiresIn: "100s" }
    )
}

// -----------------------------------------------------------------

// Endpoint for login with verify of jwt as middleware
app.post('/loginPermission',(req,res)=>{
    const {username,password} = req.body;

    const user = LoginProfiles.find(

        (u)=>{

            if(u.username === username && u.password === password) {
                return u;
            }
        }
    );

    if(user) {

        const accessToken = generateAccessToken(user);

        res.json({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken: accessToken
        })
    } else{

        res.status(400).json("Username or password incorrect")
    }
})

const verify = (req,res, next)=>{
    const autHeader = req.headers.authorization;
    
    if(autHeader){
        const token = autHeader.split(" ")[1];

        jwt.verify(token,"ThisIsMySecretKeysdlkfvnaeklsbnfalbfnskdlbnfs", (err,user) => {
            if(err){
                return res.status(403).json("Token is not valid")
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(403).json("You are not authenticated")
    }
}

app.post('/login/:userId',verify,(req,res)=>{
    if(req.user.id === parseInt(req.params.userId)){
        res.status(200).json("You have successfully logged in!")
    } else {
        res.status(200).json("You are not authorized for logging in this account.")
    }
})
// -----------------------------------------------------------------
app.get('/all-users',(req,res) => {
    res.status(200).json(LoginProfiles);
})




// -----------------------------------------------------------------

app.listen(5000)
console.log("server is running in port 5000")
