const prisma = require('./prisma');

const connectDB = async () =>{
    try{
        await prisma.$connect();
        console.log("PostgreSQL Connected");
        
    }
    catch(err){
        console.error("Database Connection Failed");
        console.error(err);
        process.exit(1);
    }
};


module.exports = connectDB ;