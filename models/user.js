import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    phone: {
        type: string,
        required: true
    },
    image: {
        type: string,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

export default userSchema = mongoose.model('User', userSchema);