import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { editTweet } from "../../Store/Twit/Action";
import {uploadFile, uploadToCloudnary} from '../../Utils/upLoadToCloudnary'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function EditModal({ handleClose, open, item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const { twit } = useSelector((store) => store);
//   twit.twits.map((item1)=>{
//     console.log(item1.image)
//   })
  const handleSubmit = (values) => {
    dispatch(editTweet(values));
    console.log("handle submit", values);
    handleClose();
  };
  
  const handleImageChange = async (event) => {
    dispatch(uploadFile(event)).then((imgUrl)=>{
        formik.setFieldValue("image", imgUrl);
        setSelectedImage(imgUrl);
        setUploading(false);
        console.log(imgUrl)
      })
      setUploading(false);
  };

  const formik = useFormik({
    initialValues: {
      id: item?.id,
      content: item?.content,
      image: item?.image
    },
    onSubmit: handleSubmit,
  });

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
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon />
                </IconButton>
                <p className="">Edit Tweet</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div className="flex space-x-5">
              <Avatar
                onClick={() => navigate(`/profile/${item?.user.id}`)}
                className="cursor-pointer"
                alt="username"
                src={item?.user.image}
              />
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div className="flex cursor-pointer items-center space-x-2">
                    <span className="font-semibold">{item?.user.fullName}</span>
                    <span className="text-gray-600">
                      @{item?.user.fullName.split(" ").join("_").toLowerCase()}{" "}
                      .2m
                    </span>
                    <img
                      className="ml-2 w-5 h-5"
                      src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                      alt=""
                    ></img>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="space-y-3">
                    <TextField
                      fullWidth
                      id="content"
                      name="content"
                      label="content"
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.content && Boolean(formik.errors.content)
                      }
                      helperText={
                        formik.touched.content && formik.errors.content
                      }
                    />
                  </div>
                  <React.Fragment>
                    <div className="w-full mt-5">
                      <div className="relative">
                        <div className="relative">
                        {/* {selectedImage && <img className="w-full h-[12rem] object-cover object-center" src={selectedImage} alt="" ></img>} */}
                          <img
                            className="w-full h-[12rem] object-cover object-center"
                            src={selectedImage || item?.image}
                            alt=""
                          />
                          <input
                            type="file"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                            name="image"
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
