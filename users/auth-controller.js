import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
//  const register = (req, res) => {
//     const username = req.body.username;
//     const user = usersDao.findUserByUsername(username);
//     if (user) {
//         res.sendStatus(409);
//         return;
//     }
//     const newUser = usersDao.createUser(req.body);
//     req.session["currentUser"] = newUser;
//     res.json(newUser);
//  };
	const register = async (req, res) => {
		const user = await usersDao.findUserByUsername(req.body.username);
		if(user){
			res.sendStatus(403);
			console.log("you have already regisered, please login");
			return;
		}
		const newUser = await usersDao.createUser(req.body);
		req.session["currentUser"] = newUser;
		console.log("register", newUser);
		res.json(newUser);
	}

//  	const login = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const user = usersDao.findUserByCredentials(username, password);
//     if (user) {
//       req.session["currentUser"] = user;
//       res.json(user);
//     } else {
//       res.sendStatus(404);
//     }
 
//  };
	const login = async (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		if(username && password){
			const user = await usersDao.findUserByCredentials(username, password);
			console.log("login-", user);
			if(user){
				console.log("User found:", user);
				req.session["currentUser"] = user;
				console.log("current-session: " ,req.session["currentUser"])
				res.json(user);
			}else{
				console.log("login - User not found.");
				res.sendStatus(403);
			}
		}else{
      res.sendStatus(403);
		}
	}

 	const profile = (req, res) => {
		console.log(req.session["currentUser"]);
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
			console.log("profile - cannot find this user");
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
    usersDao.updatedUser(uid, updatedUser);
    res.json(usersDao.findUserById(uid));
 	};
 
 app.post("/api/users/register", register);
 app.post("/api/users/login", login);
 app.post("/api/users/profile", profile);
 app.post("/api/users/logout", logout);
 app.put ("/api/users", update);
};
export default AuthController;

