import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: 'dmpsjggm3',
    api_key: '165435151265632',
    api_secret: 'hrQty405fAGft9NJL0uDgNZ3wqM'
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