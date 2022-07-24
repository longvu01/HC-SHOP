import { wrapper } from '@/app/store'
import { Seo } from '@/components/Common'
import { ProductListSlider } from '@/components/product'
import { MainLayout } from '@/layouts'
import dbConnect from '@/middleware/mongodb'
import { Category, NextPageWithLayout, Product } from '@/models'
import CategoryModel from '@/modelsMongoDB/categoryModel'
import ProductModel from '@/modelsMongoDB/productModel'
import { Box, Container } from '@mui/material'
import { GetStaticProps } from 'next'

export interface HomePageProps {
	arrayProductList?: { products: Product[]; categoryTitle: string }[]
}

const HomePage: NextPageWithLayout = ({ arrayProductList = [] }: HomePageProps) => {
	return (
		<Box component="section" pb={{ xs: 7, md: 9 }}>
			<Seo />

			<Container maxWidth="xl">
				{arrayProductList.map((productList) => (
					<ProductListSlider
						key={productList.categoryTitle}
						productList={productList.products}
						categoryTitle={productList.categoryTitle}
					/>
				))}
			</Container>
		</Box>
	)
}

HomePage.Layout = MainLayout

export const getStaticProps: GetStaticProps<HomePageProps> = wrapper.getStaticProps(
	() => async () => {
		await dbConnect()

		const categories = await CategoryModel.find({})
		const categoryListTitle: string[] = []

		const productListQuery = categories.map((category: Category) => {
			const categoryId = category._id.toString()
			categoryListTitle.push(category.title)

			return ProductModel.find({ category: categoryId }).limit(10)
		})

		const productListPerCate = await Promise.all(productListQuery)

		const arrayProductList = categoryListTitle.map((title, index) => ({
			categoryTitle: title,
			products: productListPerCate[index].map((product: any) => {
				return {
					...product._doc,
					// use null to omit unneeded updatedAt
					updatedAt: null,
					_id: product._id.toString(),
				}
			}),
		}))

		return {
			props: {
				arrayProductList,
			},
		}
	}
)

export default HomePage
