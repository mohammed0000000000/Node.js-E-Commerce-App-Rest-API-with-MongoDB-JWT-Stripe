const mongoose = require('mongoose');

const DatabaseConnection = async () =>{
    try{
        await mongoose.connect(process.env['DATABASE_URI'])
    }
    catch (error){
        console.log(error);
    }
}
module.exports = DatabaseConnection;