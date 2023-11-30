import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SigninForm from './SigninForm';
import { useLocation, useNavigate } from 'react-router-dom';
import SignupForm from './SignupForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:2,
  outline:"none"
};

export default function AuthModal({open, handleClose}) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);    
//   const handleClose = () => setOpen(false);
    const location = useLocation();
    const navigate=useNavigate();
    const handleNavigate = ()=>{    
        const path=location.pathname==="/signup"?"/signin":"/signup"
        navigate(path)
    }   
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h1 className='text-center font-bold text-xl pb-20'>Create your account</h1>
          {/* <div>
            <SigninForm/>
          </div> */}
            {location.pathname==="/signup"?<SignupForm/>:<SigninForm/>}
            <h1 className='text-center py-5 font-semibold text-lg text-gray-500'>
                {location.pathname==="/signup"?"Already have Account":"If you don't have account"}
            </h1>
            <Button fullWidth variant='outlined' onClick={handleNavigate}
            sx={{borderRadius:"29px", py:"15px"}}>
                {location.pathname==="/signup"?"signin":"signup"}
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
