import React , { useState , useEffect} from "react";
import { data } from "../system/data";
import { Text } from "react-native";

const Name = ({ userId , isAnonymous}) => {
    const [displayname , setDisplayname] = useState(null);
   
    const fetchDisplayName = async () => {
        const name = await data.getUserDisplayName(userId);
        setDisplayname(name);
    };

    useEffect(() => {
        if (!isAnonymous){
            fetchDisplayName();
        }
    }, [userId]);

    if (isAnonymous) {
        return <Text>Anonymous</Text>;
    }
    return <Text>{displayname}</Text>;
};

export default Name;