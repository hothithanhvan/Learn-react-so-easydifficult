import { trusted } from 'mongoose'
import db from '../models/index'
import e from 'express';

const getAllUsers = async () => {
    try {
        let user = await db.User.findAll({
            include: {model: db.Group, attributes: ["name", "description"]},
            attributes: ["id", "username", "email", "phone"],
            nest: true,
            raw: true
        })
        console.log("user", user);
        return {
            EM: 'get success',
            EC: 0,
            DT: user
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error',
            EC: 0,
            DT: []
        }
    }
}

const getUserWithPagi = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        const {count, rows} = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            include: {model: db.Group, attributes: ["name", "description"]},
            attributes: ["id", "username", "email", "phone"],
        })
        let totalPage = Math.ceil(count/limit)
        let data = {
            totalRows: count,
            totalPages: totalPage,
            users: rows
        }
        console.log(data);
        return {
            EM: 'success',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error',
            EC: -1,
            DT: []
        }
    }
}


const createUser = async () => {
    try {
        await db.User.create()
    } catch (error) {
        console.log(error);
    }
}

const updateuser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {id: data.id}
        })
        if (user) {
            user.update({

            })
        }
        else {

        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {id: id}
        })
        if (user) {
            await user.destroy()
            return {
                EM: 'delete thanhcong',
                EC: 0,
                DT: []
            }
        }
        else {

        }

    } catch (error) {
        console.log(error);
        return {
            EM: 'error',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    getAllUsers, createUser, updateuser, deleteUser,
    getUserWithPagi
}