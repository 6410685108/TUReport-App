import React , { useState , useEffect} from "react";
import { data } from "../system/fetchData";
import { Text } from "react-native";

const Name = ({ userId }) => {
    const [displayname , setDisplayname] = useState(null);

    const fetchDisplayName = async () => {
        const name = await data.getUserDisplayName(userId);
        setDisplayname(name);
    };

    useEffect(() => {
        fetchDisplayName();
    }, [userId]);
 
    return <Text>{displayname}</Text>;
};

export default Name;