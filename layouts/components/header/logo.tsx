import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' passHref>
      <Box sx={{ cursor: 'pointer' }}>
        <Image
          src='https://res.cloudinary.com/deojddyxc/image/upload/v1657445223/HC-SHOP/logo_rsnw91.png'
          layout='fixed'
          width={136}
          height={59}
          alt='HACOM'
          priority
        />
      </Box>
    </Link>
  );
}
