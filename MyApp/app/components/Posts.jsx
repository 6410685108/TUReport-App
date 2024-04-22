import React , {useState , useEffect} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false); 
    const navigation = useNavigation();

    const getAllPosts = async () => {
        try {
            const allposts = await db.getAllPosts();
            setPosts(allposts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true); 
        getAllPosts();
    };

    useEffect(() => {
        getAllPosts();

        const unsubscribe = navigation.addListener('focus', () => {
            getAllPosts();
        });
        return () => {
            unsubscribe();
        };
    }, [navigation]); 


    if (posts.length === 0) {
        return <Text>No post now</Text>;
    }

  return (
    <ScrollView
    refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh} // Call handleRefresh when pull-to-refresh is triggered
        />
    }>
        {/* use function map to show all post */}
        {posts.map((info) => (
            <View style={{margin: 10, padding: 15, backgroundColor: '#ECECEC', borderRadius: 20}} key={info.id}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 30, height: 30}}source={require('../picture/user_profile.png')}/>
                    <View style={{flexDirection: 'column', paddingLeft: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 14}}>{info.author}</Text>
                        <Text style={{fontSize: 12}}>{info.time}</Text>
                    </View>
                </View>
                <Text>{info.status}</Text>
            </View>
            <Text style={{marginTop: 10}}>
                {info.detail}
            </Text>
            <Image style={{width: '100%', height: 250, borderRadius: 20, marginTop: 10}} source={{uri: info.photoUrl}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {console.log('Repost pressed!')}}>
                    <Image style={{width: 30, height: 30}} source={require('../picture/repost_icon.png')} />
                    <Text style={{paddingLeft: 5}}>10</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {console.log('Bookmark pressed!')}}>
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
