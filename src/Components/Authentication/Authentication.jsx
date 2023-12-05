import React from "react";
import { Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import AuthModal from "./AuthModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [openAuthModel, setOpenAuthModal]=useState(false);
  // const [open, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpenAuthModal=()=>{
    navigate('/signup');
    setOpenAuthModal(true);
  }
  const handleOpenAuthModalSignin=()=>{
    navigate('/signin');
    setOpenAuthModal(true);
  }
  // const openForm = () => setIsOpen(true);
  const handleCloseAuthModal =()=>setOpenAuthModal(false);
  
  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
            alt=""
          />
          <div className="absolute top-[26%] left-[19%]">
            <svg
              height="300"
              width="300"
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-1nao33i r-16y2uox r-8kz0gk"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </Grid>
        <Grid className="px-10" lg={5} sm={12}>
          <p className="mt-10 font-bold text-7xl">Happening Now</p>
          <div className="font-bold text-3xl py-16">Join Twitter Today</div>
          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin width={330} />
              <p className="py-5 text-center">OR</p>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                }}
                onClick={handleOpenAuthModal}
                // onClick={openForm}

              >
                Create Account
              </Button>
              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
              <div className="mt-10">
                <h1 className="font-bold text-sm mb-5">Already Have Account?</h1>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                }}
                onClick={handleOpenAuthModalSignin}
              >
                Login
              </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModal}/>
    </div>
  );
};

export default Authentication;
