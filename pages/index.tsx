import { wrapper } from '@/app/store'
import { ProductListSlider, Seo } from '@/components/Common'
import { MainLayout } from '@/layouts'
import dbConnect from '@/middleware/mongodb'
import { Product } from '@/models'
import CategoryModel from '@/modelsMongoDB/categoryModel'
import ProductModel from '@/modelsMongoDB/productModel'
import { Box, Container } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext } from 'next'

export interface HomePageProps {
	arrayProductList?: { products: Product[]; categoryTitle: string }[]
}

// const HomePage: NextPageWithLayout = ({ arrayProductList }: HomePageProps) => {
const HomePage = ({ arrayProductList = [] }: HomePageProps) => {
	console.log(arrayProductList)
	return (
		<Box component="section" pb={{ xs: 7, md: 9 }}>
			<Seo
				data={{
					title: 'HC-SHOP',
					description: 'Cloned from hacom.vn',
					url: '',
					thumbnailUrl: '',
				}}
			/>

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

		const productListQuery = categories.map((category: any) => {
			const categoryId = category._id.toString()
			categoryListTitle.push(category.title)

			return ProductModel.find({ category: categoryId })
		})

		const productListPerCate = await Promise.all(productListQuery)

		const arrayProductList = categoryListTitle.map((title, index) => ({
			categoryTitle: title,
			products: productListPerCate[index].map((product: any) => {
				return {
					...product._doc,
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
