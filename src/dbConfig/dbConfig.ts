import mongoose from 'mongoose';
 
export async function connect(){
try{
    await mongoose.connect(process.env.MONGO_URI!, {
        serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds if no server is found
        socketTimeoutMS: 45000           // Socket timeout
      });
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    })

    connection.on('error', (err) => {
        console.log(`MongoDB connection error: ${err}`);
    })
} catch(error){
    console.log('Something gone wrong!');
    console.log(error);
}
}
connect();