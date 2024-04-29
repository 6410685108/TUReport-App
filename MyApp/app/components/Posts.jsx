import React , {useState , useEffect, useContext} from "react";
import { SettingContext } from '../system/setting';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";
import UserPhoto from "./UserPhoto";
import Name from "./Name";
import { data } from "../system/data";
import Bookmark from "./Bookmark";

const Posts = ({option}) => {
    const { setting } = useContext(SettingContext);
    const { theme,language } = setting;
    const [refreshing, setRefreshing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [sortedPosts, setSortedPosts] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

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
        return <Text style={{color: (theme === 'light' ? 'black':'white')}}>{language === 'EN' ? "Loading..." : "กำลังโหลด..."}</Text>;
    }

    if (sortedPosts.length === 0) {
        return <Text style={{color: (theme === 'light' ? 'black':'white')}}>{language === 'EN' ? "No Post Available" : "ไม่มีการโพสต์"}</Text>;
    }

    const handleRepost = async (postId) => {
        await db.repostPost(postId,);
        await fetchData();
    }

    const handleBookmark = async (postId) => {
        
        await Promise.all([
            db.userBookmark(postId),
            fetchData(),  
        ]);
        setRefreshKey(refreshKey + 1)
    }
    let monthStyle = [];
    if (language == "EN") {
      monthStyle = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    }else{
      monthStyle = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
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
                            <UserPhoto key={info.id} userId={info.author} isAnonymous={info.anonymous} />
                            <View style={{flexDirection: 'column', paddingLeft: 5}}>
                            <Text style={{fontSize: 12}}><Name userId={info.author} isAnonymous={info.anonymous} /></Text>
                                <Text style={{fontSize: 12}}>
                                    {language === "EN" ? 
                                        info.time.split('/')[0] + " " +monthStyle[info.time.split('/')[1]-1] + " " + info.time.split('/')[2] : 
                                        info.time.split('/')[0] + " " +monthStyle[info.time.split('/')[1]-1] + " " + [parseInt(info.time.split(' ')[0].split('/')[2])+543] + " " +info.time.split(' ')[1]
                                    }
                                </Text>
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
                            {info.status === 'In progress' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Inprogress.png')} />
                            )}
                            {info.status === 'Waiting' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Waiting.png')} />
                            )}
                        </View>
                        )}
                        {info.status === 'Reject' && (
                        <View style={{flexDirection: 'row'}}>
                            {info.status === 'Reject' &&(
                            <Image style={{width: 25, height: 25,top:-2}} source={require('../picture/Reject.png')} />
                            )}
                            <Text style={{fontSize: 14,color: 'black',textAlign: 'center'}}>{info.status}</Text>
                        </View>
                        )}
                        {info.status === 'Finished' && (
                        <View style={{flexDirection: 'row'}}>
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
                            <Bookmark postId={info.id} key={info.id} refreshKey={refreshKey} theme={theme} />
                        </TouchableOpacity>
                    </View>
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
                            <UserPhoto key={info.id} userId={info.author} isAnonymous={info.anonymous} />
                            <View style={{flexDirection: 'column', paddingLeft: 5}}>
                                <Text style={{fontSize: 12,color: 'white'}}><Name userId={info.author} isAnonymous={info.anonymous} /></Text>
                                <Text style={{fontSize: 12,color: 'white'}}>
                                    {language === "EN" ? 
                                        info.time.split('/')[0] + " " +monthStyle[info.time.split('/')[1]-1] + " " + info.time.split('/')[2] : 
                                        info.time.split('/')[0] + " " +monthStyle[info.time.split('/')[1]-1] + " " + [parseInt(info.time.split(' ')[0].split('/')[2])+543] + " " +info.time.split(' ')[1]
                                    }
                                </Text>
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
                            {info.status === 'In progress' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Inprogress.png')} />
                            )}
                            {info.status === 'Waiting' &&(
                                <Image style={{width: 70, height: 20}} source={require('../picture/Waiting.png')} />
                            )}
                        </View>
                        )}
                        {info.status !== 'Reject' || info.status !== 'Finished' && (
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
                            <Bookmark postId={info.id} key={info.id} refreshKey={refreshKey} theme={theme} />
                        </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </ScrollView>
          );
        }
};

export default Posts;
