import React , { useState , useEffect} from "react";
import { data } from "../system/data";
import { Image } from "react-native";

const UserPhoto = ({ userId }) => {
    const [userPhoto, setUserPhoto] = useState(null);
    const fetchUserPhoto = async () => {
        const photoUrl = await data.getUserPhotoURL(userId);
        setUserPhoto(photoUrl);
    };

    useEffect(() => {
        fetchUserPhoto();
    }, [userId]);
 
    return <Image style={{ width: 35, height: 35 , borderRadius: 35 }} source={{ uri: userPhoto }} />;
};

export default UserPhoto;