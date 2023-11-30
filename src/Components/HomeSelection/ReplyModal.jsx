import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTweetReply } from "../../Store/Twit/Action";
import {uploadToCloudnary} from '../../Utils/upLoadToCloudnary'

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

export default function ReplyModal({handleClose, open, item}) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, selectedImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  const handleSubmit = (values, actions) => {
    dispatch(createTweetReply(values))
    actions.resetForm()
    // handleClose()
    console.log("handle submit", values);
    selectedImage("")
  };
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId: item?.id,
    },
    onSubmit: handleSubmit,
  });
  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    // const imgUrl = event.target.files[0];
    const imgUrl = await uploadToCloudnary(event.target.files[0])
    formik.setFieldValue("image", imgUrl);
    selectedImage(imgUrl);
    setUploadingImage(false);
  };

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
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${item?.user.id}`)}
              className="cursor-pointer"
              alt="username"
              src="https://files.porsche.com/filestore/image/multimedia/none/RD-2023-Homepage-Banner-WW-TaycanPush-KW20/normal/c68103e7-ef29-11ed-8103-005056bbdc38/porsche-normal.jpg"
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <span className="font-semibold">NhatTrieu911</span>
                  <span className="text-gray-600">@Trieu911 . 2m</span>
                  <img
                    className="ml-2 w-5 h-5"
                    src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                    alt=""
                  ></img>
                </div>
              </div>

              <div className="mt-2">
                <div
                  onClick={() => navigate(`/twit/${item?.id}`)}
                  className="cursor-pointer"
                >
                  <p className="mb-2 p-0">{item?.content}</p>
                  {/* <img
                    className="w-[28rem] border border-gray-400 p-5 rounded-md"
                    src="https://files.porsche.com/filestore/image/multimedia/none/RD-2023-Homepage-Banner-WW-TaycanPush-KW20/normal/c68103e7-ef29-11ed-8103-005056bbdc38/porsche-normal.jpg"
                    alt=""
                  ></img> */}
                </div>
              </div>
            </div>
          </div>
          <section className={`py-3`}>
            <div className="flex space-x-5">
              <Avatar
                alt="username"
                src="https://files.porsche.com/filestore/image/multimedia/none/RD-2023-Homepage-Banner-WW-TaycanPush-KW20/normal/c68103e7-ef29-11ed-8103-005056bbdc38/porsche-normal.jpg"
              ></Avatar>
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <textarea
                      type="text"
                      name="content"
                      placeholder="What is happening"
                      className={`border-none outline-none bg-transparent`}
                      style={{ width: '500px', height: '100px' }}
                      // ref={input => {
                      //   if (input) {
                      //     input.style.width = `${getTextWidth(input.value, '16px')}px`;
                      //   }
                      // }}
                      {...formik.getFieldProps("content")}
                      {...(formik.errors.content && formik.touched.content && (
                        <span className="text-red-500">
                          {formik.errors.content}
                        </span>
                      ))}
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectImage}
                        ></input>
                      </label>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                      <TagFacesIcon className="text-[#1d9bf0]" />
                    </div>

                    <div>
                      <Button
                        sx={{
                          width: "80%",
                          borderRadius: "29px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Tweet
                      </Button>
                    </div>
                  </div>
                </form>
                <div className="mt-2 flex" style={{ width: '500px', height: '300px', position: 'relative' }}>
                  {selectImage && <img src={selectImage} alt="" ></img>}
                </div>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
