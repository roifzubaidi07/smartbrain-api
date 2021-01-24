const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const db = knex({
client: 'pg',
connection: {
    connectString: process.env.DATABASE_URL,
    ssl: true   
}
});

const register = require('./controllers/register'); 
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('success')
})

app.post('/signin',signin.signInHandle(db, bcrypt))

app.get('/profile/:id',profile.profileHandle(db))

app.post('/register',register.registerHandle(db, bcrypt))

app.put('/image',image.imageHandle(db))

app.post('/imageurl', (req, res) => {image.handleAPIcall(req, res)})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`app is running on port ${PORT}`);
})
