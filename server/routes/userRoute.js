import express from "express"

import {create, deleteUser, getAllUsers, getUserByID, update} from "../controller/userController.js"

const route = express.Router();

route.post('/user',create);
route.get('/users',getAllUsers);
route.get('/user/:id', getUserByID)
route.put('/update/user/:id',update)
route.delete('/delete/user/:id',deleteUser)

export default route; 
