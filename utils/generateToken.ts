import jwt from 'jsonwebtoken';

export const createAccessToken = (payload: { id: string }) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY as string, {
    expiresIn: '10h',
  });
};

export const createRefreshToken = (payload: { id: string }) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY as string, {
    expiresIn: '7d',
  });
};
