import { SxProps } from "@mui/material";

export const textFieldStyles: SxProps = {
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
    '& .MuiInputBase-root': { color: 'white' },
    '& .MuiFilledInput-root::before': { borderBottomColor: 'transparent' },
    '& .MuiFilledInput-root::after': { borderBottomColor: 'white' },
    '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
}