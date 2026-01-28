import React, { useState, useEffect } from "react";
import { db } from "../system/db";
import { Image } from "react-native";

interface BookmarkProps {
  postId: string;
  refreshKey: number;
  theme: 'light' | 'dark';
}

const Bookmark: React.FC<BookmarkProps> = ({ postId, refreshKey, theme }) => {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const fetchIsBookmark = async (): Promise<void> => {
    const res = await db.isUserBookmarked(postId);
    setIsBookmark(res);
  };

  useEffect(() => {
    fetchIsBookmark();
  }, [postId, refreshKey]);

  if (theme === 'light') {
    if (isBookmark) {
      return <Image style={{ width: 30, height: 30 }} source={require('../picture/save2.png')} />;
    } else {
      return <Image style={{ width: 30, height: 30 }} source={require('../picture/save1.png')} />;
    }
  } else if (theme === 'dark') {
    if (isBookmark) {
      return <Image style={{ width: 30, height: 30 }} source={require('../picture/save2_w.png')} />;
    } else {
      return <Image style={{ width: 30, height: 30 }} source={require('../picture/save1_w.png')} />;
    }
  }

  return null;
};

export default Bookmark;
