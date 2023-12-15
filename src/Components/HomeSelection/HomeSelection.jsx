import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import { React, useEffect, useState } from "react";
import * as Yub from "yup";
import ImageIcon from "@mui/icons-material/Image";
import { FormatItalic } from "@mui/icons-material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from 'react-redux'
import{createTweet, getAllTweets} from '../../Store/Twit/Action'
import {uploadFile, uploadToCloudnary} from '../../Utils/upLoadToCloudnary'

const validationSchema = Yub.object().shape({
  content: Yub.string().required("Tweet text is required"),
});

const HomeSelection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, selectedImage] = useState("");
  const dispatch = useDispatch();
  const {twit} = useSelector(store=>store);
  const {auth} = useSelector(store=>store);
  console.log("twit", twit)
  console.log("auth.jwt",auth.jwt)
  
  const handleSubmit = (values, actions) => {
    dispatch(createTweet(values))
    actions.resetForm()
    console.log("values", values);
    selectedImage("")
  };
  
  const jwt = localStorage.getItem("jwt")
  useEffect(()=>{
    dispatch(getAllTweets())
  },[twit.like, twit.retwit, twit.twit])


  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isTweet:true
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudnary(event.target.files[0])
    formik.setFieldValue("image", imgUrl);
    selectedImage(imgUrl);
    setUploadingImage(false);
  };

  const handleImageChane = async (event) =>{
    dispatch(uploadFile(event)).then((imgUrl)=>{
      formik.setFieldValue("image", imgUrl);
      selectedImage(imgUrl);
      setUploadingImage(false);
    })
    setUploadingImage(false);
  };
  // console.log(handleImageChane)
  return (
    <div className="space-y-5">
        {/* section home */}
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      {/* section create twit */}
      <selection className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar
            alt="username"  
            src={auth.user?.image}
          ></Avatar>
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening"
                  className={`border-none outline-none text-xl bg-transparent`}
                  style={{ width: '500px', height: '40px' }}
                  {...formik.getFieldProps("content")}
                  {...(formik.errors.content && formik.touched.content && (
                    <span className="text-red-500">
                      {formik.errors.content}
                    </span>
                  ))}
                ></input>
              </div>
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleImageChane}
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
            <div>
              {selectImage && <img src={selectImage} alt=""></img>}
            </div>
          </div>
        </div>
      </selection>
      {/* section create twit */}
      <br/>
      <selection>
        {twit.twits.map((item)=><TweetCard item={item}/>)}
      </selection>
    </div>
  );
};
export default HomeSelection;
