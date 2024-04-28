import React , {useState , useEffect, useContext} from "react";
import { SettingContext } from '../system/setting';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";
import UserPhoto from "./UserPhoto";
import Name from "./Name";
import { data } from "../system/data";

const Posts = ({option}) => {
    const { setting } = useContext(SettingContext);
    const { theme } = setting;
    const [refreshing, setRefreshing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [sortedPosts, setSortedPosts] = useState([]);
    const [pressBookmark, setPressBookmark] = useState(false);

    const fetchData = async () => {
        posts = await data.getSortPosts(option);
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

    if (theme == 'light') {
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
                            <Text style={{fontSize: 12}}><Name userId={info.author} /></Text>
                                <Text style={{fontSize: 12}}>{info.time}</Text>
                            </View>
                        </View>

                        {info.status !== 'Finished' && info.status !== 'Reject' && (
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 14,color: 'black',textAlign: 'center'}}>{info.status}</Text>
                            {info.status === 'Pending' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Pending.png')} />
                            )}
                            {info.status === 'Approved' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Approved.png')} />
                            )}
                            {info.status === 'InProgress' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Inprogress.png')} />
                            )}
                            {info.status === 'Waiting' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Waiting.png')} />
                            )}
                        </View>
                        )}
                        {info.status === 'Reject' || info.status === 'Finished' && (
                        <View style={{flexDirection: 'row'}}>
                            
                            {info.status === 'Reject' &&(
                            <Image style={{width: 25, height: 25,top:-2}} source={require('../picture/Reject.png')} />
                            )}
                            {info.status === 'Finished' &&(
                            <Image style={{width: 30, height: 30,top:-5}} source={require('../picture/Finished.png')} />
                            )}
                            <Text style={{fontSize: 14,color: 'black',textAlign: 'center'}}>{info.status}</Text>
                        </View>
                        )}

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
                        { pressBookmark ? (<Image style={{width: 30, height: 30}} source={require('../picture/save2.png')} /> 
                            ): (<Image style={{width: 30, height: 30}} source={require('../picture/save1.png')} />)}
                        </TouchableOpacity>
                    </View>
                    {/* <TextInput placeholder="Comment" style={{borderWidth: 1, borderColor: 'black', borderRadius: 10, padding: 5, marginVertical: 10}}/> */}
                  </View>
                ))}
            </ScrollView>
          );
    }else if(theme == 'dark'){
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
                    <View style={{margin: 10, padding: 15, backgroundColor: '#606060', borderRadius: 20}} key={info.id}>
                    <TouchableOpacity onPress={() => navigation.navigate('Inpost', {postInfo: info})}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <UserPhoto key={info.id} userId={info.author} />
                            <View style={{flexDirection: 'column', paddingLeft: 5}}>
                                <Text style={{fontSize: 12,color: 'white'}}><Name userId={info.author} /></Text>
                                <Text style={{fontSize: 12,color: 'white'}}>{info.time}</Text>
                            </View>
                        </View>

                        {info.status !== 'Finished' && info.status !== 'Reject' && (
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 14,color: 'white',textAlign: 'center'}}>{info.status}</Text>
                            {info.status === 'Pending' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Pending.png')} />
                            )}
                            {info.status === 'Approved' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Approved.png')} />
                            )}
                            {info.status === 'InProgress' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Inprogress.png')} />
                            )}
                            {info.status === 'Waiting' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Waiting.png')} />
                            )}
                        </View>
                        )}
                        {info.status === 'Reject' || info.status === 'Finished' && (
                        <View style={{flexDirection: 'row'}}>
                            
                            {info.status === 'Reject' &&(
                            <Image style={{width: 25, height: 25,top:-2}} source={require('../picture/Reject.png')} />
                            )}
                            {info.status === 'Finished' &&(
                            <Image style={{width: 30, height: 30,top:-5}} source={require('../picture/Finished.png')} />
                            )}
                            <Text style={{fontSize: 14,color: 'white',textAlign: 'center'}}>{info.status}</Text>
                        </View>
                        )}

                    </View>
                    <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 10,color:'snow'}}>
                        {info.title}
                    </Text>
                    <Text style={{marginTop: 10,color:'white'}}>
                        {info.detail}
                    </Text>
                    <Image style={{width: '100%', height: 250, borderRadius: 20, marginTop: 10}} source={{uri: info.photoUrl}}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => handleRepost(info.id)}>
                            <Image style={{width: 30, height: 30}} source={require('../picture/repost_icon_w.png')} />
                            <Text style={{paddingLeft: 5,color:'white'}}>{info.repost}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {handleBookmark(info.id)}}>
                            { pressBookmark ? (<Image style={{width: 30, height: 30}} source={require('../picture/save2_w.png')} /> 
                            ): (<Image style={{width: 30, height: 30}} source={require('../picture/save1_w.png')} />)}
                        </TouchableOpacity>
                    </View>
                    {/* <TextInput placeholder="Comment" placeholderTextColor={'white'} style={{borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 5, marginVertical: 10}}/> */}
                  </View>
                ))}
            </ScrollView>
          );
        }
};

export default Posts;
