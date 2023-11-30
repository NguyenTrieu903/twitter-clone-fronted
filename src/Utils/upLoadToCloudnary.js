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

export const getTextWidth=(text, font)=>{
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}