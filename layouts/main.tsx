import { LayoutProps } from '@/models';
import { Box, Stack } from '@mui/material';
import { Footer, Header } from './components';

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight='100vh'>
      <Header />

      <Box component='main' flexGrow={1}>
        {children}
      </Box>

      <Footer />
    </Stack>
  );
}
