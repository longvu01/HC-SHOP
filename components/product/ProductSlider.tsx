import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import styles from './Product.module.scss'

export interface ProductSliderProps {
	images: { public_id: string; url: string }[]
}

function NextArrow(props: any) {
	const { className, style, onClick } = props
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', right: 10 }}
			onClick={onClick}
		/>
	)
}

function PrevArrow(props: any) {
	const { className, style, onClick } = props
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', left: 10, zIndex: 1 }}
			onClick={onClick}
		/>
	)
}

export default function ProductSlider({ images }: ProductSliderProps) {
	const settingSlider = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		appendDots: (dots: any) => (
			<div style={{ bottom: -95, backgroundColor: '#fff', textAlign: 'left' }}>
				<ul className={styles.dotList}> {dots} </ul>
			</div>
		),
		customPaging: function (index: number) {
			return (
				<a>
					<Image
						src={images?.[index].url || ''}
						layout="responsive"
						alt={images?.[index].url}
						width="100%"
						height="100%"
					/>
				</a>
			)
		},
	}

	return (
		<Slider {...settingSlider}>
			{images?.map((img, index) => (
				<Image
					key={index}
					src={img.url || ''}
					layout="responsive"
					alt={img.url}
					width="100%"
					height="100%"
				/>
			))}
		</Slider>
	)
}
