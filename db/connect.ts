/* import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  console.log('Connecting to MongoDB...');
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully'); 
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error); // Log any connection error
      throw error;
    });
  }

  cached.conn = await cached.promise;
  console.log('MongoDB connection established');
  return cached.conn;
}

export default dbConnect;
 */