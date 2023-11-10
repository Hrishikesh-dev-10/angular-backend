const dbConfig = require('../../db/db.config');
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practice',
    password: 'postgres',
    port: 5432,
})

const createNoteController=async(req,res)=>{
    try {
        
        const data = await dbConfig('notes').insert({user_id:req.body.user_id,title:req.body.title,body:req.body.body});
        
        res.status(200).send({
            status_code:200,
            message:'Note Added',
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

       
        
        const temp = await dbConfig('shared_notes').delete().where({notes_id:req.params.id});
       
        const data = await dbConfig('notes').delete().where({id:req.params.id});
        
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
        if(data===1)
        {
            res.status(200).send({
                status_code:200,
                message:'Note Updated',
                
            })
        }
        else
        {
            res.status(202).send({
                status_code:202,
                message:'Note Not Found.',
                
            })
        }
        
    } catch (error) {
      
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}


const sharedNoteController = async(req,res)=>{
    try {
        
       
        const check = await pool.query(`select * from Public.shared_notes where shared_by=$1 and shared_to=$2 and notes_id=$3`,[req.body.sharedBy,req.body.sharedTo,req.body.noteID])
       
        if(check.rows.length<1)
        {
            const data = await dbConfig('shared_notes').insert({shared_by:req.body.sharedBy,shared_to:req.body.sharedTo,notes_id:req.body.noteID});
            res.status(200).send({
                status_code:200,
                message:'Note Shared',
                
            })
        }
        
       else
       {
        res.status(201).send({
            status_code:201,
            message:'Note Already Shared',
            
        })
       }


        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}

const getSharedNotes= async(req,res)=>{
    try {
        
        const data = await pool.query(`Select notes.title,notes.body,sharedNotes.notes_id,users.username,users.id From Public.notes as notes , Public.shared_notes as sharedNotes,Public.user as users Where notes.id= sharedNotes.notes_id AND sharedNotes.shared_to=$1 AND users.id=sharedNotes.shared_by`,[req.params.id]);
        res.status(200).send({
            status_code:200,
            message:'Note Shared',
            data:data.rows
        })
    } catch (error) {
       
        res.status(401).send({
            status_code:401,
            message:'Bad request'
        })
    }
}


module.exports = {getSharedNotes,sharedNoteController,createNoteController,getNoteController,deleteNoteController,updateNoteController,getNoteByIDController}