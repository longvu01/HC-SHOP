import dbConnect from '@/middleware/mongodb';
import User from '@/modelsMongoDB/userModel';
import { handleErrorJSON } from '@/utils';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        await register(req, res);
      } catch (error) {
        res.status(400).json(handleErrorJSON(error));
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed!' });
      break;
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Field from register form
    const { fullName, email, password } = req.body.params;

    const hashedPassword = bcrypt.hashSync(password, process.env.SALT as string);

    // Check if email exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email này đã tồn tại!' });

    // Register new user + save to DB
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    res.status(500).json(handleErrorJSON(error));
  }
};
