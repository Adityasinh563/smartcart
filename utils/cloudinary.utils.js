import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
})

export const uploadOnCloudinary = async function (localPath) {
    const uploadedFile = await cloudinary.uploader.upload(
        localPath,
        {
            resource_type:'auto'
        }
    )
    return uploadedFile
}