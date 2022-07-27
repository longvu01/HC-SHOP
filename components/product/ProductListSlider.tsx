import { Product } from '@/models'
import { Paper, Typography } from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { ProductItem } from './ProductItem'

export interface ProductListSliderProps {
	productList: Product[]
	categoryTitle: string
}

export function ProductListSlider({ productList, categoryTitle }: ProductListSliderProps) {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1650,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<Paper sx={{ p: 2 }}>
			<Typography variant="h5" component="h2" sx={{ textTransform: 'uppercase' }}>
				{categoryTitle}
			</Typography>
			<Slider {...settings}>
				{productList.map((product) => (
					<ProductItem key={product._id} product={product} />
				))}
			</Slider>
		</Paper>
	)
}
