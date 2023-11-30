import {useEffect} from "react";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSelection/TweetCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findTwitsByIds } from "../../Store/Twit/Action";

const TwitDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch()
  const{id} = useParams()
  const {twit} = useSelector(store=>store)
  useEffect(()=>{
      if(id){
        dispatch(findTwitsByIds(id))
      }
  }, [])
  return (
    <React.Fragment>
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
            Tweet
        </h1>
      </section>

      <section>
        <TweetCard item={twit.twit}/>
        <Divider sx={{margin:"2rem 0rem"}}/>
      </section>

      <selection>
        {twit.twit?.replyTwits.map((item)=>
          <TweetCard item={item}/>
        )}
      </selection>

    </React.Fragment>
  );
};

export default TwitDetails;
