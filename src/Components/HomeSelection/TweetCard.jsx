import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, MenuItem, Menu } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModal from "./ReplyModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { createReTweet, likeTweet, deleteTweet } from "../../Store/Twit/Action";

const TweetCard = ({ item }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openReplyeModal, setOpenReplyModal] = useState(false);
  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch = useDispatch();
  // const {twit} = useSelector(store=>store);

  // const handleBack = () => navigate(-1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteTweet = () => {
    dispatch(deleteTweet(item.id))
    console.log("delete tweet");
    handleClose();
  };
  // const handleOpenReplyModel = () => {
  //   console.log("open model");
  // };
  const handleCreateRetweet = () => {
    dispatch(createReTweet(item?.id))
    console.log("Handle create tweet");
  };
  const handleLiketweet = () => {
    dispatch(likeTweet(item?.id));
    console.log("Handle like tweet");
  };

  return (
    <React.Fragment>
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user.id}`)}
          className="cursor-pointer"
          alt="username"
          src="https://img.carbiz.vn/files/2020/Thang%203/03/911/porsche-911-s-2021.jpg"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user.fullName}</span>
              <span className="text-gray-600">
                @{item?.user.fullName.split(" ").join("_").toLowerCase()} . 2m
              </span>
              {/* <img
                className="ml-2 w-5 h-5 "
                src={item.image}
                alt=""
              ></img> */}
            </div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div
              onClick={() => navigate(`/twit/${item?.id}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">{item?.content}</p>
              <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                src={item?.image}
                alt=""
              ></img>
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>
              <div
                className={`${
                  item?.retwit ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRetweet}
                  className="cursor-pointer"
                />
                <p>{item?.totalRetweets}</p>
              </div>
              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteIcon
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={handleLiketweet}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  onClick={handleOpenReplyModel}
                  className="cursor-pointer"
                />
                <p>54</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  onClick={handleOpenReplyModel}
                  className="cursor-pointer"
                />
                <p>54</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal 
          item = {item}
          open={openReplyeModal}
          handleClose={handleCloseReplyModal}
        />
      </section>
    </React.Fragment>
  );
};

export default TweetCard;
