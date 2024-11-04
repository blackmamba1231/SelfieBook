
import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, // For temporarily storing pre-verified user data
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    otp: {
        type: String, // Hashed OTP
        required: true,
    },
    otpExpiresAt: {
        type: Date, // OTP expiry time
        required: true,
    },
    Verified:{
        type: Boolean,
        default: false
    },
})

 const Account1 = mongoose.models.Account1 || mongoose.model('Account1', accountSchema);
 export default Account1;