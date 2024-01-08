import db from '../models/index';
import { Op } from 'sequelize';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (userPassword) => {
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}

const checkEmail = async (email) => {
    let user = await db.User.findOne({ where: { email: email } });
    if (user) {
        return true
    }
    return false
}

const checkPhone = async (phone) => {
    let user = await db.User.findOne({ where: { phone: phone } });
    if (user) {
        return true
    }
    return false
}



const registerNewUser = async (user) => {
    try {
        let isEmailExist = await checkEmail(user.email);
        if (isEmailExist === true) {
            return {
                EM: 'email already exist',
                EC: 1
            }
        }

        let isPhoneExist = await checkPhone(user.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'phone already exist',
                EC: 1
            }
        }

        let hassPass = hashPassword(user.password)

        await db.User.create({
            email: user.email,
            username: user.username,
            password: hassPass,
            phone: user.phone
        })
        return {
            EM: 'Success',
            EC: 0
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'error',
            EC: -2
        }
    }
}

const checkPassword = (inputPass, hashPass) => {
    return bcrypt.compareSync(inputPass, hashPass)
}


const handleLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.keyLogin },
                    { phone: rawData.keyLogin}
                ],
            },
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword === true) {
                return {
                    EM: 'ok',
                    EC: '0',
                    DT: ''
                }
            }
        }
        
            return {
                EM: 'email or password incorrect',
                EC: '-1',
                DT: ''
            }
        

        
    }
    catch (error) {
        return {
            EM: 'error',
            EC: '-2',
            DT: ''
        }
    }
}
module.exports = {
    registerNewUser, handleLogin
}