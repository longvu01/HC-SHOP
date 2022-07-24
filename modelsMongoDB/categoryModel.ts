import { Category } from '@/models'
import { model, models, Schema } from 'mongoose'

export const CategorySchema = new Schema<Category>(
	{
		title: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

let CategoryModel = models.categories || model<Category>('categories', CategorySchema)

export default CategoryModel
