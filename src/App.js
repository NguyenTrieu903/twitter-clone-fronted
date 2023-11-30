import { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Authentication from './Components/Authentication/Authentication';
import Homepage from './Components/Homepage/Hompage';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUserProfile } from './Store/Auth/Action';

function App() {
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(jwt){
      dispatch(getUserProfile(jwt))
      navigate("/")
    }
  },[auth.jwt])
  return (
    <div className="">
      <Routes> 
          <Route path="/*" element={auth.user?<Homepage/>:<Authentication/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
