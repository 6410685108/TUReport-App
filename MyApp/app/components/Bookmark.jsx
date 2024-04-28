import React , { useState , useEffect} from "react";
import { db } from "../system/db";
import { Image } from "react-native";

const Bookmark = ({ postId , refreshKey , theme}) => {
    const [isBookmark, setIsBookmark] = useState(false);

    const fetchIsBookmark = async () => {
        const res = await db.isUserBookmarked(postId);
        setIsBookmark(res);
    };

    useEffect(() => {
        fetchIsBookmark();
    }, [postId , refreshKey]);
    if (theme === 'light') {
        if (!isBookmark) {
            return <Image style={{width: 30, height: 30}} source={require('../picture/save1.png')} />;
            
        } else{
            return <Image style={{width: 30, height: 30}} source={require('../picture/save2.png')} />;
        }
    } else if (theme === 'dark') {
        if (!isBookmark) {
            return <Image style={{width: 30, height: 30}} source={require('../picture/save1_w.png')} />;
        } else {
            return <Image style={{width: 30, height: 30}} source={require('../picture/save2_w.png')} />;
        }
    }


    
};

export default Bookmark;