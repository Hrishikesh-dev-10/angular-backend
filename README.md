# angular-backend

#Prerequisit
  #First Download PostgresQL on your system.
  #Create Server and Database with name "practice".

#NODE.JS Setup
  #Upgrade the .env file with below given details.
  #Also update ./app/db/knexfile.js enviroment variables for failsafe demo.
    DB_USER = postgres
    DB_PASSWORD = postgres
    DB_NAME = practice
    JWT= SECRET

  #Run the below commands in sequence
    npm install -> Install all the packages
    npm run migrate -> Migration of the Database and Create Tables
    npm run dev -> To run the Node server
  
