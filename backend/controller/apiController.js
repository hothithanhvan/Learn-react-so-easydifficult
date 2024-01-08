
import reactService from '../service/reactService'

const handleApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    console.log('create', req.body);
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing value",
                EC: "1",
                DT: ""
            })
        }

        let data = await reactService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ""
        })
    } catch (error) {
        return res.status(500).json({
            EM: "Error",
            EC: "-1",
            DT: ""
        })
    }
}


const handleLogin = async (req, res) => {

    try {

        console.log(req.body)
        let data = await reactService.handleLogin(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error",
            EC: "-1",
            DT: ""
        })
    }

}
module.exports = {
    handleApi, handleRegister, handleLogin
}