import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TweetCard from "../HomeSelection/TweetCard";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const handleBack = () => navigate(-1);
  // const handleOpenProfileModel = () => {
  //   console.log("open profile model");
  // };
  const handleFollowUser = () => {};
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 4) {
      console.log("likes twit");
    } else if (newValue === 1) {
      console.log("users twits");
    }
  };
  return (
    <div>
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">NhatTrieu911</h1>
      </section>

      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://porsche-vietnam.vn/wp-content/uploads/2022/11/model-series-911-dakar-head-banner.jpg"
          alt=""
        ></img>
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="NhatTrieu911"
            src="https://img.carbiz.vn/files/2020/Thang%203/03/911/porsche-911-s-2021.jpg"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {true ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">NhatTrieu911</h1>
            {true && (
              <img
                className="ml-2 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt=""
              ></img>
            )}
          </div>
          <h1 className="text-gray-500">@Trieu911</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>
            Porsche Driver Experience in the new Panamera with driver-centred
            interior concept
          </p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">VietNam, TPHCM</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined Jun 2023</p>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>70</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>170</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {[1, 1, 1, 1].map((item) => (
                <TweetCard />
              ))}
            </TabPanel>
            <TabPanel value="2">users replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModal}/>
      </section>
    </div>
  );
};

export default Profile;
