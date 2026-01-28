import React, { useState, useEffect } from "react";
import { data } from "../system/data";
import { Image } from "react-native";

interface UserPhotoProps {
  userId: string;
  isAnonymous?: boolean;
}

const UserPhoto: React.FC<UserPhotoProps> = ({ userId, isAnonymous }) => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  const fetchUserPhoto = async (): Promise<void> => {
    const photoUrl = await data.getUserPhotoURL(userId);
    setUserPhoto(photoUrl);
  };

  useEffect(() => {
    if (!isAnonymous) {
      fetchUserPhoto();
    }
  }, [userId]);

  if (isAnonymous) {
    return <Image style={{ width: 35, height: 35, borderRadius: 35 }} source={require("../picture/user_profile_g.png")} />;
  }
  return <Image style={{ width: 35, height: 35, borderRadius: 35 }} source={{ uri: userPhoto || undefined }} />;
};

export default UserPhoto;
