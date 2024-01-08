import axios from "axios";

const register = (email, phone, password, username) => {
    return axios.post("http://localhost:4000/api/v1/register", {
        email, phone, password, username
    })
}

const loginUser = (keyLogin, password) => {
    return axios.post("http://localhost:4000/api/v1/login", {
        keyLogin, password
    })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:4000/api/v1/user/show?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete("http://localhost:4000/api/v1/user/delete", {data: {id: user.id}})
}

export { register, loginUser, fetchAllUser, deleteUser }