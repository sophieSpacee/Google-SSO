import mongoose from 'mongoose';
const user = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
  picture: {
  type: String,
  allowNull: true,
},
});
export default mongoose.model('User', user);