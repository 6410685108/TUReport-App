import React , { useState , useEffect} from "react";
import { data } from "../system/fetchData";
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
 
    return <Image style={{ width: 40, height: 40 , borderRadius: 15 }} source={{ uri: userPhoto }} />;
};

export default UserPhoto;