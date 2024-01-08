import crudService from '../service/crudService'

const handleShow = async (req, res) => {
    try {
        console.log(req.query);
        // let data = await crudService.getAllUsers();
        // console.log("data", data);
        // return res.status(200).json({
        //     EM: 'success',
        //     EC: 0,
        //     DT: data.DT
        // })
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit
            console.log(page, 'and', limit);
            let data = await crudService.getUserWithPagi(+page, +limit)
            return res.status(200).json({
                EM: 'success',
                EC: 0,
                DT: data.DT
            })
        }
        else {
            let data = await crudService.getAllUsers();
            console.log("data", data);
            return res.status(200).json({
                    EM: 'success',
                    EC: 0,
                    DT: data.DT
                })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error',
            EC: '-1',
            DT: ''
        })
    }
}

const handleCreate = (req, res) => {

}

const handleUpdate = (req, res) => {

}

const handleDelete = async (req, res) => {
    try {
        console.log('req', req.body);
        let data = await crudService.deleteUser(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    handleCreate, handleUpdate, handleDelete, handleShow
}