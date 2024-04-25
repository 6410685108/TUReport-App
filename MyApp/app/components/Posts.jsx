import React , {useState , useEffect} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";
import UserPhoto from "./UserPhoto";
import { data } from "../system/fetchData";

const Posts = ({option}) => {
    const [refreshing, setRefreshing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [sortedPosts, setSortedPosts] = useState([]);
    const [userPhotoKey, setUserPhotoKey] = useState(0);

    const fetchData = async () => {
        const posts = await data.getSortPosts(option);
        setSortedPosts(posts);
        setLoading(false);
    }

    const handleRefresh = () => {
        setRefreshing(true); 
        fetchData();
    };

    useEffect(() => {
        fetchData();  
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return () => {
            unsubscribe();
        };
    }, [option]);

    
    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (sortedPosts.length === 0) {
        return <Text>No Post Available</Text>;
    }

    const handleRepost = async (postId) => {
        const isReposted = await db.isReposted(postId);
        await db.repostPost(postId,isReposted);
        if (isReposted){
            db.removeReposter(postId);
        }else{
            db.addReposter(postId);
        }
        await fetchData();
        
        
    }

    const handleBookmark = async (postId) => {
        await db.userBookmark(postId);
        await fetchData();
    }

  return (
    <ScrollView
    refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
    }>
        {sortedPosts.map((info) => (
            <View style={{margin: 10, padding: 15, backgroundColor: '#ECECEC', borderRadius: 20}} key={info.id}>
            <TouchableOpacity onPress={() => navigation.navigate('Inpost', {postInfo: info})}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <UserPhoto key={userPhotoKey} userId={info.author.uid} />
                    <View style={{flexDirection: 'column', paddingLeft: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 14}}>{info.author.displayName}</Text>
                        <Text style={{fontSize: 12}}>{info.time}</Text>
                    </View>
                </View>
                <Text>{info.status}</Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                {info.title}
            </Text>
            <Text style={{marginTop: 10}}>
                {info.detail}
            </Text>
            <Image style={{width: '100%', height: 250, borderRadius: 20, marginTop: 10}} source={{uri: info.photoUrl}}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => handleRepost(info.id)}>
                    <Image style={{width: 30, height: 30}} source={require('../picture/repost_icon.png')} />
                    <Text style={{paddingLeft: 5}}>{info.repost}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {handleBookmark(info.id)}}>
                    <Image style={{width: 30, height: 30}} source={require('../picture/save1.png')} />
                </TouchableOpacity>
            </View>
            <TextInput placeholder="Comment" style={{borderWidth: 1, borderColor: 'black', borderRadius: 10, padding: 5, marginVertical: 10}}/>
          </View>
        ))}
    </ScrollView>
  );
};

export default Posts;
