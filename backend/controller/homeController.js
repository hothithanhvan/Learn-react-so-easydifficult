import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    //return res.send('Hello World with Thanh Van')
    const name = "Aora"
    return res.render('Homepage.ejs',{name} )
}


const handleUserPage = async (req, res) => {
    let list = await userService.getListUser()
    return res.render('user.ejs', {list})
}

const handleCreateNewUser = async (req, res) => {
    console.log('req', req.body);
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    userService.createNewUser(email, password, username)
    
    return res.redirect('/user');
}

const handleDelete = async (req, res) => {
    userService.deleteUser(req.params.id)
    return res.redirect('/user');
}

const handleGetUpdateUser = async (req, res) => {
    let user = await userService.getUpdateUser(req.params.id)
    return res.render('updateUser.ejs', {user})
}

const handleUpdate = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id
    userService.updateUser(email, username, id)
    return res.redirect('/user')
}


module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDelete, handleUpdate, handleGetUpdateUser
}