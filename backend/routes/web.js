import express from 'express';
import homeController from '../controller/homeController'
import apiController from '../controller/apiController'
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */



const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld)
    router.get('/user', homeController.handleUserPage)
    router.post('/users/create-user', homeController.handleCreateNewUser)
    router.post('/delete/:id', homeController.handleDelete)
    router.post('/get-update-user/:id', homeController.handleGetUpdateUser)
    router.post('/users/update-user', homeController.handleUpdate)

    router.get('/api/test-api', apiController.handleApi)
    return app.use("/", router)
}

export default initWebRoutes; 