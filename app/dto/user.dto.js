const dbConfig = require('../db/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser=async(username,email,phone,password)=>{
    try {
        const [id] = await dbConfig('user').insert({
            email,
            username,
            phone,
            password:bcrypt.hashSync(password,10)
        })
        .returning('id','email')
        return (id,email)
    } catch (error) {
        console.log(error)
    }
}

const getUser=async(id)=>{
    const param = {
        id
    }
    const data = await dbConfig('user').select('id','email','username').from('user').where(param).first();
    return data
}


const userLogin = async(email,password)=>{
    try {
        const data = await dbConfig('user').where({email:email}).first();
        if(!data)
        {
            return null
        }
    } catch (error) {
        return null
    }
}

module.exports = {createUser,getUser,userLogin}