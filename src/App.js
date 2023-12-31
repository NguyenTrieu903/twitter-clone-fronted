import { useEffect } from 'react';
import {Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Authentication from './Components/Authentication/Authentication';
import Homepage from './Components/Homepage/Hompage';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUserProfile } from './Store/Auth/Action';
import ResetPassword from './Components/Authentication/ResetPassword/ResetPasswordForm';
import SendEmailModal from './Components/Authentication/ResetPassword/ForgotPasswordFormEmail';
import * as React from "react";
import OAuth2RedirectHandler from "./Components/Authentication/OAuth2RedirectHandler";
// import SigninForm from "./Components/Authentication/SigninForm";

function App() {
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(jwt){
      dispatch(getUserProfile())
      navigate("/")
    }
  },[jwt])
  return (
    <div className="">
      <Routes> 
          <Route path="/auth/reset-password" element={<ResetPassword />}></Route>
          <Route path="/forget-password" element={<SendEmailModal />}></Route>
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />}></Route>
          {/* <Route path="/signup" element={<SignupForm/>}></Route>
          <Route path="/signin" element={<SigninForm/>}></Route> */}
          <Route path="/*" element={auth.user?<Homepage/>:<Authentication/>}></Route>
          {/* <Route path="/*" element={auth?<Homepage/>:<Authentication/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
