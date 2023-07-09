import { Box, TextField, styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export const Wrapper = styled(Box)(() => ({
   height: '100vh',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));
export const StyledTextField = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: '#ffd05b',
         borderWidth: '3px',
         borderRadius: '5px', 
      },
      '&:hover fieldset': {
         borderColor: '#ffd05b',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#ffd05b',
      },
   },
   '& .MuiOutlinedInput-input': {
      '&::placeholder': {
         color: '#ffffff',
      },
   },
   '& .MuiInputLabel-root': {
      color: '#4D4D4D', // Set the default color for the floated label
      '&.Mui-focused': {
        color: '#ffd05b', // Set the color for the focused floated label
      },
    },
}));

export const StyedLoadingButtonPrimary = styled(LoadingButton)(() => ({
   backgroundColor: '#ffd05b',
   color: '#4D4D4D',
   boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.1)',
   cursor: 'pointer !important',
   padding: '8px 18px',
   border: 'none',
   fontWeight: 600,
   '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)',
      border: 'none',
   },
   boxSizing: 'border-box',
   textTransform: 'capitalize',
}));

export const StyledTextArea = styled(TextField)(() => ({
   '& label.Mui-focused': {
      color: '#ffd05b',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: '#ffd05b',
         borderWidth: '3px',
         borderRadius: '5px', 
      },
      '&:hover fieldset': {
         borderColor: '#ffd05b',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#ffd05b',
      },
      '&.Mui-error fieldset': {
         borderColor: '#ffd05b',
      },
   },
   '& .MuiInputLabel-root': {
    color: '#4D4D4D', // Set the default color for the floated label
    '&.Mui-focused': {
      color: '#ffd05b', // Set the color for the focused floated label
    },
  },
  
}));

export const CloseIconBox = styled(Box)(() => ({
   position: 'absolute',
   top: 5,
   right: '8px',
   background: '#efefef',
   borderRadius: '50%',
   height: '25px',
   width: '25px',
   padding: '5px',
   cursor: 'pointer',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:hover': {
      background: '#ddd',
   },
}));
