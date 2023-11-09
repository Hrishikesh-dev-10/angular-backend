
//Database connection file
//DB credentials are stored in ENV file




module.exports = {
    development:{
        client:'postgresql',
        connection:{
            database: process.env.DB_NAME ||'practice',
            user: process.env.DB_USER ||'postgres', 
            password: process.env.DB_PASSWORD||'postgres',
        },
        pool:{
            min:1,
            max:5
        },
        migrations: {
            tableName: 'Notes_Migrations',
        },
    }
}

