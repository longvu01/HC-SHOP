import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Loading, Seo } from '@/components/Common'
import AddQuantityForm from '@/components/Common/AddQuantityForm'
import PageBreadCrumbs from '@/components/Common/PageBreadCrumbs'
import ProductSlider from '@/components/product/ProductSlider'
import { authActions, selectIsLoggedIn } from '@/features/auth/authSlice'
import { cartActions } from '@/features/cart/cartSlice'
import { MainLayout } from '@/layouts'
import dbConnect from '@/middleware/mongodb'
import { Product } from '@/models'
import ProductModel from '@/modelsMongoDB/productModel'
import { formatCurrency } from '@/utils'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Box, Button, Container, Divider, Paper, Rating, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

export interface ProductDetailProps {
	product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const isLoggedIn = useAppSelector(selectIsLoggedIn)

	if (router.isFallback) return <Loading />
	if (!product) return null

	const breadCrumbsData = [
		{
			title: 'Trang chủ',
			href: '/',
		},
		{
			title: product?.categoryName || '',
			href: `/${product?.categoryId}` || '',
		},
		{
			title: product.title,
			href: `/product/${product._id}`,
		},
	]

	// Handlers
	const handleAddToCartSubmit = (quantity: number) => {
		const cartItem = {
			...product,
			quantity,
		}

		if (!isLoggedIn) {
			return dispatch(authActions.setRequireLogin())
		}

		dispatch(cartActions.addToCart(cartItem))
		dispatch(cartActions.setShowMiniCart())
	}

	return (
		<Box pb={{ xs: 7, md: 9 }}>
			<Seo title={product.title} description={product.description} />

			<Container maxWidth="xl">
				<PageBreadCrumbs data={breadCrumbsData} />

				<Paper sx={{ p: 2 }}>
					<Stack direction="row" spacing={1} minHeight={500}>
						<Box width={400}>
							<ProductSlider images={product.images || []} />
						</Box>

						{/* Right */}
						<Box>
							<Stack direction="row" alignContent="center">
								<Typography variant="caption">Mã SP: {product.code}</Typography>
								<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

								{/* TODO: replace when update db */}
								<Stack direction="row" alignContent="center">
									<Typography variant="caption">Đánh giá: </Typography>
									<Rating
										size="small"
										name="rating value"
										value={product.ratingValue || 0}
										readOnly
									/>
									<Typography variant="caption">{product.ratingCount || 0}</Typography>
								</Stack>
								<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

								<Typography variant="caption">Bình luận: {product.commentCount || 0}</Typography>
								<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

								<Typography variant="caption">Lượt xem: {product.viewCount || 0}</Typography>
							</Stack>

							{/* Info */}
							<Typography variant="subtitle1" component="h3">
								Thông số sản phẩm
							</Typography>
							<Box component="ul" sx={{ listStyleType: 'circle', pl: 2 }}>
								{product.info.map((item, index) => (
									<Typography variant="caption" component="li" key={index}>
										{item}
									</Typography>
								))}
							</Box>

							{/* Price box */}
							{/* TODO: replace when update db */}
							<Stack
								direction="row"
								alignItems="flex-end"
								spacing={1}
								sx={{ border: '1px dashed #ccc' }}
							>
								<Typography variant="h4" sx={{ color: '#bf081f', fontWeight: 'bold' }}>
									{/* {formatCurrency(product?.salePrice)} */}
									{formatCurrency(1490000)}
								</Typography>
								<Typography variant="body2" sx={{ color: '#444', textDecoration: 'line-through' }}>
									{/* {formatCurrency(product.price)} */}
									{formatCurrency(1790000)}
								</Typography>
								<Typography variant="body2" sx={{ color: '#bf081f' }}>
									{/* {formatCurrency(product.price - product?.salePrice)} */}
									Tiết kiệm {formatCurrency(300000)}
								</Typography>
							</Stack>

							{/* Add to cart */}
							<Stack direction="row">
								<AddQuantityForm onSubmit={handleAddToCartSubmit}>
									<Button type="submit" sx={{ mt: '10px !important' }}>
										<AddShoppingCartIcon />
										Thêm vào giỏ hàng
									</Button>
								</AddQuantityForm>
							</Stack>
						</Box>
					</Stack>
				</Paper>
			</Container>
		</Box>
	)
}

ProductDetail.Layout = MainLayout

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
		props: {
			product: {
				...product._doc,
				// use null to omit unneeded updatedAt
				updatedAt: null,
				_id: product._id.toString(),
			},
		},
	}
}
