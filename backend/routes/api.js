import express from 'express';
import apiController from '../controller/apiController'
import userController from '../controller/userController'
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */



const initApiRoutes = (app) => {
    
    router.get('/test-api', apiController.handleApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)

    router.get("/user/show", userController.handleShow)
    router.post("/user/create", userController.handleCreate)
    router.put("/user/update", userController.handleUpdate)
    router.delete("/user/delete", userController.handleDelete)

    return app.use("/api/v1", router)
}

export default initApiRoutes; 