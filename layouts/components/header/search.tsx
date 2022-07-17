import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';

export default function Search() {
  return (
    <Box flexGrow={1}>
      <TextField
        id='search-field'
        label='Nhập tên sản phẩm, từ khóa cần tìm'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant='filled'
        fullWidth
        sx={{ bgcolor: '#fff' }}
      />
    </Box>
  );
}
