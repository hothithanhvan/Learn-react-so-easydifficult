// get the client
import mysql from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
import db from '../models/index';



const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (userPassword) => {
  const hash = bcrypt.hashSync(userPassword, salt);
  return hash;
}

const createNewUser = async (email, password, username) => {
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

  let hashPass = hashPassword(password)
  // connection.query(
  //   'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]
  // );
  await db.User.create({
    email: email,
    username: username,
    password: hashPass
  })
}


const getListUser = async () => {
  // create the connection, specify bluebird as Promise

  // let listUser = []
  // connection.query(
  //   'SELECT * FROM users',
  //   function (err, results, fields) {
  //     listUser = results
  //     return listUser;
  //   }
  // );
  //const [rows, fields] = await connection.execute('SELECT * FROM users');

  const tasks = await db.User.findOne({ 
    include: db.Group,
    raw: true,
    nest: true
  });
  console.log(tasks);

  const role = await db.Role.findAll({ 
    include: {model: db.Group, where: {id: 1}},
    raw: true,
    nest: true
  });
  console.log(role);

  let listUsers = [];
  listUsers = await db.User.findAll()
  return listUsers;

} 


const deleteUser = async (id) => {
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
  // const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);

  await db.User.destroy({
    where: {
      id: id
    }
  });
}

const getUpdateUser = async (id) => {
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
  // const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
  // console.log(rows[0]);
  // return rows[0];
  let user = await db.User.findOne({ where: { id: id } });
  return user;
}

const updateUser = async (email, username, id) => {
  // console.log(email, username, id);
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
  // const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]);
  await db.User.update({ email: email, username: username }, {
    where: {
      id: id
    }
  });
}


module.exports = {
  createNewUser, getListUser, deleteUser, getUpdateUser, updateUser
}