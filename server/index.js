
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()
  
const jwtSecret = process.env.AUTH_SECRET

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
  
app.get('/', (req, res) => {
  return res.status(200).send('Hello')
})


const userCredentials = {
  username: 'admin',
  password: '123'
}

const user = {
  uid: 'OK',
  email: 'admin@gmail.com',
  username: 'admin',
  role: 'admin',
  avatar: 'https://avatars.githubusercontent.com/u/62361896?v=4'
}

const isBanned = user.uid === 'BANIDO'

app.post('/login', (req, res) => {
  // Destructuring username & password from body
  const { username, password } = req.body;

  // Checking if credentials match
  if (username === userCredentials.username && 
    password === userCredentials.password && !isBanned) {
    
    //creating a access token
    const accessToken = jwt.sign({
        uid: user.uid,
    }, jwtSecret, {
        expiresIn: '10m'
    });

    // Assigning refresh token in http-only cookie 
    res.cookie('session_token', accessToken, {
        httpOnly: false, 
        sameSite: 'None',
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({ user });
  }
  else {
      // Return unauthorized error if credentials don't match
      return res.status(401).json({ 
          message: 'Invalid credentials' });
  }
})

app.get('/me', (req, res) => {
  if (req.cookies?.session_token) {
    // Destructuring refreshToken from cookie
    const sessionToken = req.cookies.session_token;

    // Verifying refresh token
    jwt.verify(sessionToken, jwtSecret, 
      (err, decoded) => {
        if (err) {

          // Wrong Access Token
          return res.status(406).json({ message: 'Unauthorized' });
        }
        else {
          console.log(decoded)

          if(isBanned) {
            res.clearCookie('session_token')
            return res.status(403).send('User account is suspended')
          }

          // Correct token we send a new access token
          setTimeout(() => {
            return res.json({ user });
          }, 0)
        }
      })
  } else {
      return res.status(406).json({ message: 'Unauthorized' });
  }
})

app.get('/metrics', (req, res) => {

})

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});