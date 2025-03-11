import { SxProps } from "@mui/material";

export const textFieldStyles: SxProps = {
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
    '& .MuiInputBase-root': { color: 'white' },
    '& .MuiFilledInput-root::before': { borderBottomColor: 'transparent' },
    '& .MuiFilledInput-root::after': { borderBottomColor: 'white' },
    '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
}

export const selectInputStyles: SxProps = {
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsla(0, 0%, 100%, 0.5)' },
    '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid white' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid white' },
    '& .MuiSvgIcon-root': { color: 'white' },
    '&:hover .MuiSvgIcon-root': { color: 'white' },
    '& .MuiOutlinedInput-input': { color: 'white' }
}

export const buttonStyles: SxProps = {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    color: '#333',
    border: 'none',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    }
}