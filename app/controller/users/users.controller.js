
const dbConfig = require('../../db/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../middleware/auth');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practice',
    password: 'postgres',
    port: 5432,
})

const createUserController =async(req,res)=>{
    try {

        const {username,email,phone,password} = req.body;
        const [id] = await dbConfig('user').insert({
            email,
            username,
            phone,
            password:bcrypt.hashSync(password,10)
        })
        .returning('id','email')
        res.send({
            status_code:200,
            message:'User Registered',
            
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}

const getUserController = async(req,res)=>{
    try {
        const param = {
            id:req.param.id
        }
        const data = await dbConfig('user').select('id','email','username').from('user').where(param).first();
        res.send({
            status_code:200,
            message:'User Found',
            data
        })
    } catch (error) {
        
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}

const getAllUserController = async(req,res)=>{
    try {
        
        
        const data = await pool.query(`select * from public.user where not id=$1`,[req.params.id])
        res.send({
            status_code:200,
            message:'User Found',
            data:data.rows
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}


const loginUserController = async(req,res)=>{
    try {

        const user = await dbConfig("user").where({email:req.body.email}).first();
        if(!user)
        {
            res.send({
                status_code:200,
                message:'Unknown Credentials',
                user
            })
        }
        else
        {
            const matchPassword = await bcrypt.compare(req.body.password,user.password);
            if(!matchPassword)
            {
                res.status(403).send({
                    status_code:403,
                    message:'Invalid Credentials',
                    
                }) 
            }
            else{
                const token =await generateToken(user)
                res.send({
                    status_code:200,
                    message:'User Logged Inn',
                    token,
                    data:{
                        id:user.id,
                        firstname:user.firstname,
                        email:user.email,
                        phone:user.phone
                    }
                })
            }
        }

       
    } catch (error) {
        
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}



module.exports={getAllUserController,createUserController,getUserController,loginUserController};