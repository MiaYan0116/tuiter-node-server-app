import { deleteUser } from './users-dao.js';
import people from './users.js'
let users = people

const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.put('/api/users/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
}

const findUsers = (req, res) => {
    const type = req.query.type
    if(type) {
        const usersOfType = users.filter(u => u.type === type)
        res.json(usersOfType)
        return
    }
    res.json(users)
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId)
    res.json(user)  
}

const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}

const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    users = users.map((usr) => 
        usr._id === userId ? 
            {...usr, ...updates}: 
            usr
    );
    res.sendStatus(200);
}
  
export default UserController