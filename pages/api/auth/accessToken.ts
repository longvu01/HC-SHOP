import dbConnect from '@/middleware/mongodb';
import User from '@/modelsMongoDB/userModel';
import { handleErrorJSON } from '@/utils';
import { createAccessToken } from '@/utils/generateToken';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).json({ message: 'Please login now!' });

    const validToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string);
    if (!validToken || typeof validToken === 'string')
      return res.status(400).json({ message: 'Your token is incorrect or has expired!' });

    const user = await User.findById(validToken.id);
    if (!user) return res.status(400).json({ message: 'User does not exists!' });

    const { _id: userId, fullName, email, role, avatar, root } = user;

    const accessToken = createAccessToken({ id: userId });
    res.status(200).json({
      accessToken,
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
}
