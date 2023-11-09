const jwt = require('jsonwebtoken');


exports.generateToken=async(user)=>{
    try {
        return {
            access_token:jwt.sign(user,process.env.JWT),
        }
    } catch (error) {
        console.log(error)
    }
}

exports.verifyToken=async(req,res,next)=>{
    const authHeader = req.headers['x-access-token'];
    if(authHeader==null||authHeader==undefined)
        return res.send({
            status_code:404,
            message:'Auth Failed'
        })
    else
    {
        jwt.verify(authHeader,process.env.JWT,(err,user)=>{
            if(err)
            {
                return res.send({
                    status_code:404,
                    message:'Auth Failed'
                })
            }
            else{
                next()
            }
        })
    }
}