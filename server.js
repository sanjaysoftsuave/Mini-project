var express = require('express');
var app = express();
const cors = require('cors');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

const SECRET_KEY = 'user_secret_key';


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

app.use(express.json());

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword
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
    const user = await User.findOne({ username});

    if (!user) {
      return res.status(401).json({
        statusCode:401,
        message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, 'your_secret_key');

    res.status(200).json({statusCode:200, message: 'Login successful',token: token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Delete API
app.delete('/:userName/tasks/:taskIndex', async(req,res) => {
  const {userName,taskIndex} = req.params;
  const user = await User.findOne({'username': userName});
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  user.taskList.splice(taskIndex,1);
  await user.save();

  res.status(200).json({ message: 'Task deleted successfully' });

})

//UpdateTask API
app.put('/:username/:index', async(req,res) => {
  try {
    const {username,index} = req.params
    const {updatedTask} = req.body
    console.log(updatedTask, "Api working")
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.taskList.splice(index,1,{task: updatedTask.task, status: updatedTask.status});
    await user.save();
    return res.status(200).json({ message: 'Task updated successfully' });

  }
  catch(err) {
    return res.status(500).json({statusCode: 500, message: "Server Error"})
  }
})

//Get Tasklist API
// app.get('/tasklist/:username', async (req,res) => {
//   try {
//     const {username} = req.params;
//     const user = await User.findOne({username});
//     if (!user) {
//       return res.status(404).json({statusCode: 404, message: "User not found"})
//     }
//     res.json(user.taskList)
//     }
//   catch(err) {
//     return res.status(500).json({statusCode: 500, message: "Server Error"})
//   }
// })

//Add Task API
app.post('/tasklist/:username', async (req,res) => {
  try {
    const {username} = req.params;
    const { task, status, isPublic} = req.body;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({statusCode: 404, message: "User not found"})
    }
    const addedTask = user.taskList.push({task,status,isPublic});
    await user.save();

    return res.status(201).json({ message: 'Task added successfully', task: addedTask });
  }
  catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
})

//Get Public Task
// app.get('/public-tasks', async(req,res) => {
//   try {

//     // const userPrivateTask = await

//     const users = await User.find(
//       {'taskList.isPublic':true},
//       {taskList: 1, username: 1}
//     )

//     const publicTasks = users.flatMap(user => {
//       return user.taskList
//       .filter(task => task.isPublic)
//       .map(task => ({
//         ...task.toObject(),
//         createdBy: user.username
//       }))
//     });
//     res.status(200).json(publicTasks,);
//   }
//   catch(error) {
//     res.status(500).json({message: 'Server Error', error});
//   }
// })

//Merged Api
app.get('/tasklist/:username', async (req, res) => {
  try {
    const { username } = req.params;


    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ statusCode: 404, message: "User not found" });
    }


    const users = await User.find(
      { 'taskList.isPublic': true },
      { taskList: 1, username: 1 }
    );


    const publicTasks = users.flatMap(user => {
      return user.taskList
        .filter(task => task.isPublic)
        .map(task => ({
          ...task.toObject(),
          createdBy: user.username
        }));
    });

    const userTasks = user.taskList;


    res.status(200).json({
      publicTasks,
      userTasks
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ statusCode: 500, message: "Server Error" });
  }
});

app.listen(8000,(error) => {
  if (error) {
    console.log('Error')
  } else {
    console.log("Started")
  }
});
