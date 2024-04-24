import React , {useState , useEffect} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";

const Posts = ({option}) => {
    var posts = {} ;
    const [refreshing, setRefreshing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [sortedPosts, setSortedPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const allposts = await db.getAllPosts();
            posts = allposts
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setRefreshing(false);
        }
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

    if (sortedPosts.length === 0) {
        return <Text>No Post Available</Text>;
    }

    const handleRepost = async (postId) => {
        await db.repostPost(postId);
        await getAllPosts();
    }

    const handleBookmark = async (postId) => {
        await db.userBookmark(postId);
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
        {sortedPosts.map((info) => (
            <View style={{margin: 10, padding: 15, backgroundColor: '#ECECEC', borderRadius: 20}} key={info.id}>
            <TouchableOpacity onPress={() => navigation.navigate('Inpost', {postInfo: info})}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 30, height: 30}}source={{uri: info.author.photo}}/>
                    <View style={{flexDirection: 'column', paddingLeft: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 14}}>{info.author.email}</Text>
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
