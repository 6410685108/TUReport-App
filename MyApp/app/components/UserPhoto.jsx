import React , { useState , useEffect} from "react";
import { db } from "../system/db";
import { Image } from "react-native";

const UserPhoto = ({ userId }) => {
    const [userPhoto, setUserPhoto] = useState(null);
    const getUserPhoto = async (userId) => {
        try {
            const photoUrl = await db.getUserPhoto(userId);
            if (!photoUrl) {
                return "https://firebasestorage.googleapis.com/v0/b/tu-reports.appspot.com/o/images%2Fuser_profile.png?alt=media&token=2b93fb80-17f8-45a6-bdca-7af2a6c9cb0c";
            }
            return photoUrl;
        } catch (error) {
            console.error('Error fetching user photo:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUserPhoto = async () => {
            const photoUrl = await getUserPhoto(userId);
            setUserPhoto(photoUrl);
        };

        fetchUserPhoto();
    }, [userId]);

    if (!userPhoto) {
        return null; // Optionally, you can render a placeholder or loading indicator
    }

   

    return <Image style={{ width: 30, height: 30 }} source={{ uri: userPhoto }} />;
};

export default UserPhoto;