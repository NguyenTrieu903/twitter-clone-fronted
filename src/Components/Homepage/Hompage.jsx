import { Grid } from "@mui/material";
import React from "react";
import HomeSelection from "../HomeSelection/HomeSelection";
import JwtPage from "../HomeSelection/GetJwtPapge";
import Navigation from "../Navigation/Navigation";
import RightPart from "../RightPart/RightPart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import TwitDetails from "../TwitDetails/TwitDetails";
import Authentication from "../Authentication/Authentication";
import SignupForm from "../Authentication/SignupForm";
import SigninForm from "../Authentication/SigninForm";
import ResetPassword from "../Authentication/ResetPassword/ResetPasswordForm"
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../Store/Auth/Action";
// import { getUserProfile } from '.../Store/Auth/Action';

const Homepage = () => {
  // const jwt = localStorage.getItem("jwt")
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // useEffect(()=>{
  //   if(jwt){
  //     dispatch(getUserProfile())
  //     navigate("/")
  //   }
  // },[jwt])
  return (
    <Grid container xs={12} className="px-5 lg:px-36 justify-between">
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        className="px-5 lg:px-9 hidden lg:block w-full relative"
      >
        <Routes>
            <Route path="/" element={<HomeSelection/>}></Route>
            {/* <Route path="/home" element={<HomeSelection/>}></Route> */}
            <Route path="/profile/:id" element={<Profile/>}></Route>
            <Route path="/twit/:id" element={<TwitDetails/>}></Route>
            <Route path="/signup" element={<SignupForm/>}></Route>
            <Route path="/signin" element={<SigninForm/>}></Route>
            
        </Routes>
      </Grid>
      <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
        <RightPart />
      </Grid>
    </Grid>
  );
};

export default Homepage;
