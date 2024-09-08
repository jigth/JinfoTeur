import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

export function connectMongoDB() {
    mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected succesfully'))
    .catch(() => console.log('Couldn\'t connect to MongoDB'));
}
