const dbConfig = require('../../db/db.config');

const createNoteController=async(req,res)=>{
    try {
        
        const data = await dbConfig('notes').insert({user_id:req.body.user_id,title:req.body.title,body:req.body.body});
        
        res.status(200).send({
            status_code:200,
            message:'Note Added',
            data
        })
    } catch (error) {
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}

const getNoteByIDController=async(req,res)=>{
    try {
       
        const data = (await dbConfig('notes').where({id:req.params.id}).first());
        if(data.length<1)
        {
            res.status(200).send({
                status_code:201,
                message:'No Notes Available',
                data
            })  
        }
        else
        {
            res.status(200).send({
                status_code:200,
                message:'Note List',
                data
            })
        }
        
    } catch (error) {
       
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}

const getNoteController=async(req,res)=>{
    try {
       
        const data = (await dbConfig('notes').where({user_id:req.params.id}));
        if(data.length<1)
        {
            res.status(200).send({
                status_code:201,
                message:'No Notes Available',
                data
            })  
        }
        else
        {
            res.status(200).send({
                status_code:200,
                message:'Note List',
                data
            })
        }
        
    } catch (error) {
       
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}


const deleteNoteController = async(req,res)=>{
    try {

        const data = await dbConfig('notes').delete().where({id:req.params.id})

        res.status(200).send({
            status_code:200,
            message:'Note Deleted',
        })
    } catch (error) {
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}

const updateNoteController = async(req,res)=>{
    try {

      
        const data = await dbConfig('notes').update({title:req.body.title,body:req.body.body}).where({id:req.body.id})
        res.status(200).send({
            status_code:200,
            message:'Note Updated',
            
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}


module.exports = {createNoteController,getNoteController,deleteNoteController,updateNoteController,getNoteByIDController}