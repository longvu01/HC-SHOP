import dbConnect from '@/middleware/mongodb';
import Category from '@/modelsMongoDB/categoryModel';
import Product from '@/modelsMongoDB/productModel';
import { handleErrorJSON } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        await getCategories(req, res);
      } catch (error) {
        res.status(400).json(handleErrorJSON(error));
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const category = await Category.find({});
    // const categoryList = category.map((cate) => ({
    //   title: cate.title,
    // }));
    // res.status(200).json({ status: 'success', categoryList });
  } catch (error) {
    res.status(400).json(handleErrorJSON(error));
  }
};
