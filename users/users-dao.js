// let users = [];

// export const findAllUsers = () => users;
// export const findUserById = (uid) => {
//  const index = users.findIndex((u) => u._id === uid);
//  if (index !== -1) return users[index];
//  return null;
// };

// export const findUserByUsername = (username) => {
//  const index = users.findIndex((u) => u.username === username);
//  if (index !== -1) return users[index];
//  return null;
// };

// export const findUserByCredentials = (username, password) => {
//  const index = users.findIndex((u) => u.username === username && u.password === password);
//  if (index !== -1) return users[index];
//  return null;
// };

// export const createUser = (user) => {
//     users.push(user);
//     return user;
// };

// export const updateUser = (uid, updatedUser) => {
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//         res.sendStatus(404);
//         return;
//     }
//     const user = usersDao.findUserById(currentUser._id);
//     if (!user) {
//         res.sendStatus(404);
//         return;
//     }
//     const updatedUserData = usersDao.updateUser(uid, updatedUser);
//     res.json(updatedUserData);
// //  const index = users.findIndex((u) => u._id === uid);
// //  users[index] = { ...users[index], ...user };
// //  return {status: 'ok'}
// };

// export const deleteUser = (uid) => {
//  const index = users.findIndex((u) => u._id === uid);
//  users.splice(index, 1);
//  return {status: 'ok'}
// };

import usersModel from './users-model.js';

export const findAllUsers = () => usersModel.find();
export const findUserById = (id) => usersModel.findById(id);
export const findUserByUsername = ({username}) => usersModel.findOne({username});
export const findUserByCredentials = ({username, password}) => usersModel.findOne({username, password});
export const createUser = (user) => usersModel.create(user);
export const updatedUser = (id, user) => usersModel.updateOne({_id: id}, {$set: user});
export const deleteUser = (id) => usersModel.deleteOne({_id: id});