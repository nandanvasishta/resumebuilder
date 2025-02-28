import mongoose from 'mongoose';

const database = async () => {
  try {
    // No deprecated options needed here
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.log('Database connection failed', error);
    process.exit(1);
  }
};

export default database;
