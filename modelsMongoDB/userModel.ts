import { User } from '@/models/user';
import { model, models, Schema } from 'mongoose';

const userSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/deojddyxc/image/upload/v1657451904/HC-SHOP/no-image_qceh37.png',
    },
  },
  { timestamps: true }
);

let UserModel = models.user || model<User>('user', userSchema);

export default UserModel;
