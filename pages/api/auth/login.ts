import { NextApiRequest, NextApiResponse } from 'next';
import { createRefreshToken } from './../../../utils/generateToken';
import dbConnect from '@/middleware/mongodb';
import User from '@/modelsMongoDB/userModel';
import { createAccessToken } from '@/utils/generateToken';
import bcrypt from 'bcrypt';
import { handleErrorJSON } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        await login(req, res);
      } catch (error) {
        res.status(400).json(handleErrorJSON(error));
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body.params;

    // Check user exists && password match
    const user = await User.findOne({ email });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!user || !isMatch)
      return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu không đúng!' });

    // Generate accessToken, refreshToken
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    const { fullName, role, avatar, root } = user;

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      accessToken,
      refreshToken,
      user: {
        fullName,
        email,
        role,
        avatar,
        root,
      },
    });
  } catch (error) {
    res.status(500).json(handleErrorJSON(error));
  }
};
