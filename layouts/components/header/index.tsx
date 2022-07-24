import { Box, Container, Stack } from '@mui/material'
import Actions from './actions'
import Logo from './logo'
import Search from './search'

export function Header() {
	return (
		<Box component="header" py={1} bgcolor="#243a76">
			<Container maxWidth="xl" sx={{ px: '0 !important' }}>
				<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
					<Logo />

					<Search />

					<Actions />
				</Stack>
			</Container>
		</Box>
	)
}
