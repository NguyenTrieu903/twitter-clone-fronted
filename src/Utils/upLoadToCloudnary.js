import {api} from "../config/api"
import { UPLOAD_SUCCESS } from "../Store/Twit/ActionType";

export const uploadToCloudnary=async(pics)=>{
    console.log(pics)
    const unsignedUploadPreset = "instagram";
    if(pics){
        const data = new FormData();
        data.append("file", pics)
        data.append("upload_preset","eien5c5f")
        data.append("cloud_name","dkryfr2au")

        const res = await fetch ("https://api.cloudinary.com/v1_1/dkryfr2au/image/upload", {
            headers: { "X-Requested-With": "XMLHttpRequest" },
            method:"post",
            body:data
        })

        const fileData = await res.json();
        return fileData.url.toString(); 
    }else{
        console.log("error from upload function")
    }
}

export const uploadFile = (event) => async (dispatch) => {
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
        const { data } = await api.post(`/api/twits/uploadfile`, formData, config);
    //   console.log("get user twits : ", data);
    //   dispatch({ type: UPLOAD_SUCCESS, payload: data });
        return data.toString();
    } catch (error) {
      console.log("catch error - ", error);
    }
  };

export const getTextWidth=(text, font)=>{
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}