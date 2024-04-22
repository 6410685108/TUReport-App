import React , {useState , useEffect} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";

const Posts = ({option}) => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [sortedPosts, setSortedPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const allposts = await db.getAllPosts();
            setPosts(allposts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const getSortPosts = async () => {
        let sortedPosts = [...posts].sort((a, b) => {
            const timeA = parseThaiDate(a.time);
            const timeB = parseThaiDate(b.time);
            return timeB - timeA;
        });
    
        if (option === 'A-Z') {
            sortedPosts.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1; 
                }
                return 0; 
            });
        } else if (option === 'Z-A') {
            sortedPosts.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                
                if (titleA < titleB) {
                    return 1; 
                }
                if (titleA > titleB) {
                    return -1;
                }
                return 0;
            });
        } else if (option === 'Repost'){
            sortedPosts.sort((a, b) => b.repost - a.repost);
            console.log("Repost");
        } else if (option === 'Finish'){
            sortedPosts = posts.filter(post => post.status === 'Finish');
        } else {
        }
    
        setSortedPosts(sortedPosts);
    };

    const handleRefresh = () => {
        setRefreshing(true); 
        getAllPosts();
    };

    useEffect(() => {
        getAllPosts();
        getSortPosts();
    
        const unsubscribe = navigation.addListener('focus', () => {
            getAllPosts();
        });
        return () => {
            unsubscribe();
        };
    }, [navigation, option]);
    

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (posts.length === 0) {
        return <Text>No Post Available</Text>;
    }

    const handleRepost = async (postId) => {
        await db.repostPost(postId);
        await getAllPosts();
    }

 
    
    function parseThaiDate(timeString) {
        const [datePart, timePart] = timeString.split(', ');
        const [day, month, year] = datePart.split('/').map(part => parseInt(part));
        const [hour, minute, second] = timePart.split(':').map(part => parseInt(part));
        const yearAD = year - 543;
        return new Date(yearAD, month - 1, day, hour, minute, second);
    }

    

  return (
    <ScrollView
    refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
    }>
        {/* use function map to show all post */}
        {sortedPosts.map((info) => (
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
            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                {info.title}
            </Text>
            <Text style={{marginTop: 10}}>
                {info.detail}
            </Text>
            <Image style={{width: '100%', height: 250, borderRadius: 20, marginTop: 10}} source={{uri: info.photoUrl}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => handleRepost(info.id)}>
                    <Image style={{width: 30, height: 30}} source={require('../picture/repost_icon.png')} />
                    <Text style={{paddingLeft: 5}}>{info.repost}</Text>
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
