import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      
      default: '',
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    following: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
const User1 = mongoose.models.User1 || mongoose.model('User1', userSchema);
export default User1;