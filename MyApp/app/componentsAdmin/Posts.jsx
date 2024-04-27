import React , {useState , useEffect} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";
import UserPhoto from "../components/UserPhoto";
import Name from "../components/Name";
import { data } from "../system/data";

const Posts = ({option , status}) => {
    const [refreshing, setRefreshing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [sortedPosts, setSortedPosts] = useState([]);

    const fetchData = async () => {
        let posts = [];
        if(status){
            posts = await db.getStatusPosts(option,status);
        } else{
            posts = await data.getSortPosts(option);
        }
        setSortedPosts(posts);
        setLoading(false);
    }

    const handleRefresh = async () => {
        setRefreshing(true); 
        await fetchData();
        setRefreshing(false); 
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
        await db.repostPost(postId,);
        await fetchData();
    }

    const handleBookmark = async (postId) => {
        await Promise.all([
            db.userBookmark(postId),
            fetchData()
        ]);
    }

  return (
    <ScrollView
    style={{width: '100%', height: '100%', fontSize: '100%'}}
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
                    <UserPhoto key={info.id} userId={info.author} />
                    <View style={{flexDirection: 'column', paddingLeft: 5}}>
                        <Name userId={info.author} />
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
          </View>
        ))}
    </ScrollView>
  );
};

export default Posts;
