import { Product } from '@/models';
import { Paper, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ProductItem from './ProductItem';

export interface ProductListSliderProps {
  productList: Product[];
  categoryTitle: string;
}

export function ProductListSlider({ productList, categoryTitle }: ProductListSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h5' component='h2' sx={{ textTransform: 'uppercase' }}>
        {categoryTitle}
      </Typography>
      <Slider {...settings}>
        {productList.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </Slider>
    </Paper>
  );
}
