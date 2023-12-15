import { Redirect } from 'react-router-dom'
import {Navigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AccessToken } from "../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from 'axios';
import HomeSelection from '../HomeSelection/HomeSelection';

const OAuth2RedirectHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getUrlParameter =(name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const handleNavigation = () => {
          window.location.reload(); // Reload the page after navigation
        };
    
        // Simulate your navigation action (replace with your actual logic)
        const code = getUrlParameter('token');
        localStorage.setItem("jwt", code);
        // 
        
    
        // Listen for URL changes and reload the page
        window.addEventListener('popstate', handleNavigation);
        navigate("/");
    
        return () => {
          window.removeEventListener('popstate', handleNavigation);
        };
      }, []);
    return(
      <div></div>
    )
};

export default OAuth2RedirectHandler;