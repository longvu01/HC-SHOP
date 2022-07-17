import { Category } from '@/models';
import { model, models, Schema } from 'mongoose';
import { productSchema } from './productModel';

const CategorySchema = new Schema<Category>(
  {
    title: {
      type: String,
      required: true,
    },
    products: {
      type: [productSchema],
      required: true,
    },
  },
  { timestamps: true }
);

let CategoryModel = models.categories || model<Category>('categories', CategorySchema);

export default CategoryModel;
