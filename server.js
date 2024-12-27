var express = require('express');
var app = express();
const cors = require('cors');
const User = require('./models/user');
const router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Mini-project',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Db Stared")
})
.catch((err) => {
  console.error(`Error connecting to the database: ${err}`);
})

app.use(express.json())
app.use(cors());

//Register API
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({statusCode:400, message: 'User registered successfully' });
    }

    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    res.status(201).json({statusCode:201, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({statusCode:500, message: 'Server error' });
  }
});

//Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username,password});
    console.log(user)

    if (user) {
      res.status(200).json({statusCode:200, message: 'Login successful' });
    } else {
      res.status(401).json({
        statusCode:401,
        message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Home API
app.get('/home', async(req,res) => {

})

//Get Tasklist API
app.get('/tasklist/:username', async (req,res) => {
  try {
    const {username} = req.params;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({statusCode: 404, message: "User not found"})
    }
    res.json(user.taskList)
    }
  catch(err) {
    return res.status(500).json({statusCode: 500, message: "Server Error"})
  }
})

//Add Task API
app.post('/tasklist/:username', async (req,res) => {
  try {
    const {username} = req.params;
    const { task, status} = req.body;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({statusCode: 404, message: "User not found"})
    }
    const addedTask = user.taskList.push({task,status});
    await user.save();

    return res.status(201).json({ message: 'Task added successfully', task: addedTask });
  }
  catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
})

app.listen(8000,(error) => {
  if (error) {
    console.log('Error')
  } else {
    console.log("Started")
  }
});
