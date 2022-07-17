import dbConnect from '@/middleware/mongodb';
import Product from '@/modelsMongoDB/productModel';
import { handleErrorJSON } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        await getProducts(req, res);
      } catch (error) {
        res.status(400).json(handleErrorJSON(error));
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ status: 'success', total: products.length, products });
  } catch (error) {
    res.status(400).json(handleErrorJSON(error));
  }
};
