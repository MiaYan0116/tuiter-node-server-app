import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
 const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
        res.sendStatus(409);
        return;
    }
    const createdUser = req.body;
    createdUser.firstName = "Gary";
    createdUser.lastName = "Yan";
    createdUser._id = (new Date()).getTime() + '';
    const newUser = usersDao.createUser(createdUser);
    req.session["currentUser"] = newUser;
    res.json(newUser);
 };

 const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
 
 };
 const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log(currentUser);//0810 11:39
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser); 
 };

 const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200); 
 };

 const update = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log("before update: ", currentUser);//0810 11:41
    console.log(currentUser);
    if(!currentUser){
        res.sendStatus(404);
        return;
    }
    const uid = currentUser._id;
    const updatedUser = req.body;
    const user = usersDao.findUserById(uid);
    if(!user){
        res.sendStatus(404);
        return;
    }
    usersDao.updateUser(uid, updatedUser);
    console.log("After update:", usersDao.findUserById(uid));
    res.json(usersDao.findUserById(uid));
 };
 
 app.post("/api/users/register", register);
 app.post("/api/users/login", login);
 app.post("/api/users/profile", profile);
 app.post("/api/users/logout", logout);
 app.put ("/api/users", update);
};
export default AuthController;

