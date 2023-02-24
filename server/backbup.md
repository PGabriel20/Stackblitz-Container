
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
  
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

app.post('/login', (req, res) => {
  // Destructuring username & password from body
  const { username, password } = req.body;

  // Checking if credentials match
  if (username === userCredentials.username && 
    password === userCredentials.password) {
    
    //creating a access token
    const accessToken = jwt.sign({
        username: userCredentials.username,
        email: userCredentials.email
    }, "ACCESS TOKEN SECRET", {
        expiresIn: '10m'
    });
    // Creating refresh token not that expiry of refresh 
    //token is greater than the access token
    
    const refreshToken = jwt.sign({
        username: userCredentials.username,
    }, "REFRESH TOKEN SECRET", { expiresIn: '1d' });

    // Assigning refresh token in http-only cookie 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, 
        sameSite: 'None',
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000
    });

    const user = {
      uid: '123467890',
      email: 'admin@gmail.com',
      username: 'admin',
      role: 'admin',
      avatar: 'https://avatars.githubusercontent.com/u/62361896?v=4'
    }

    return res.json({ accessToken, user });
  }
  else {
      // Return unauthorized error if credentials don't match
      return res.status(401).json({ 
          message: 'Invalid credentials' });
  }
})

app.post('/refresh', (req, res) => {
  if (req.cookies?.jwt) {

    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;

    // Verifying refresh token
    jwt.verify(refreshToken, "REFRESH TOKEN SECRET", 
      (err, decoded) => {
        if (err) {

          // Wrong Refesh Token
          return res.status(406).json({ message: 'Unauthorized' });
        }
        else {
          // Correct token we send a new access token
          const accessToken = jwt.sign({
              username: userCredentials.username,
              email: userCredentials.email
          }, "ACCESS TOKEN SECRET" , {
              expiresIn: '10m'
          });

          const user = {
            uid: '123467890',
            email: 'admin@gmail.com',
            username: 'admin',
            role: 'admin',
            avatar: 'https://avatars.githubusercontent.com/u/62361896?v=4'
          }

          return res.json({ accessToken, user });
        }
      })
  } else {
      return res.status(406).json({ message: 'Unauthorized' });
  }
})

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});