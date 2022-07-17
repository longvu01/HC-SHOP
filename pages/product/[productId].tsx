import { Product } from '@/models'
import ProductModel from '@/modelsMongoDB/productModel'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import dbConnect from '@/middleware/mongodb'
import { useRouter } from 'next/router'

export interface ProductDetailProps {
	product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
	console.log(product)

	const router = useRouter()

	if (router.isFallback) {
		return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>
	}

	if (!product) return null

	return <div>{product.title}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
	await dbConnect()

	const productList = await ProductModel.find({}).limit(20).sort({ sold: -1 })

	const listProductParams = productList.map((product) => ({
		params: { productId: product._id.toString() },
	}))

	return {
		paths: listProductParams,
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (
	context: GetStaticPropsContext
) => {
	await dbConnect()

	const productId = context.params?.productId

	const product = await ProductModel.findOne({ _id: productId })

	if (!product) return { notFound: true }

	return {
		props: { product: { ...product._doc, _id: product._id.toString() } },
	}
}
