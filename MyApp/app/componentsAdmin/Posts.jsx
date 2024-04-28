import React , {useState , useEffect} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , RefreshControl, StyleSheet} from "react-native";
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
    // const  sortedPosts = [
    //     {
    //         id: 1,
    //         author: 1,
    //         time: '2021-10-01 10:00',
    //         status: 'Pending',
    //         title: 'Post 1',
    //         detail: 'This is post 1',
    //         photoUrl: 'https://picsum.photos/200',
    //         repost: 10
    //     },
    // ];

    const fetchData = async () => {
        const posts = await data.getStatusPosts(option,status);
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


    const handleApprove = async (postId) => {
        db.changeStatusPost(postId,'Approved');
        await fetchData();
    }

    const handleReject = async (postId) => {
        db.changeStatusPost(postId,'Reject');
        await fetchData();
    }

    const handleWainting = async (postId) => {
        db.changeStatusPost(postId,'Waiting');
        await fetchData();
    }

    const handleFinish = async (postId) => {
        db.changeStatusPost(postId,'Finished');
        await fetchData();
    }

    const handleInprogress = async (postId) => {
        db.changeStatusPost(postId,'In progress');
        await fetchData();
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
                    <TouchableOpacity onPress={() => {
                        try {
                            navigation.navigate('InpostAdmin', { postInfo: info });
                        } catch (error) {
                            console.error("Navigation error:", error);
                        }
                    }}>
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
                            {info.status === 'In progress' &&(
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
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    {info.status === 'Pending' && (
                        <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.buttonApprove} onPress={() => handleApprove(info.id)}>
                                    <Text>Approve</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonReject} onPress={() => handleReject(info.id)}>
                                    <Text>Reject</Text>
                                </TouchableOpacity>
                        </View>
                    )
                    }
                    {info.status === 'Approved' && (
                        <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.buttonINProgress} onPress={() => handleInprogress(info.id)}>
                                    <Text>INProgress</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonReject} onPress={() => handleReject(info.id)}>
                                    <Text>Reject</Text>
                                </TouchableOpacity>
                        </View>
                    )
                    }
                    {info.status === 'In progress' && (
                        <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.buttonFinish} onPress={() => handleFinish(info.id)}>
                                    <Text>Finish</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonWaiting} onPress={() => handleWainting(info.id)}>
                                    <Text>Waiting</Text>
                                </TouchableOpacity>
                        </View>
                    )
                    }
                    {info.status === 'Waiting' && (
                        <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.buttonINProgress} onPress={() => handleInprogress(info.id)}>
                                    <Text>In progess</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonReject} onPress={() => handleReject(info.id)}>
                                    <Text>Reject</Text>
                                </TouchableOpacity>
                        </View>
                    )
                    }
                    </View>
                  </View>
                ))}
            </ScrollView>
          );
};

export default Posts;

const styles = StyleSheet.create({
    buttonApprove: {backgroundColor: 'white', marginHorizontal: 10, padding: 10, borderRadius: 10, width: 100, justifyContent: 'center', alignItems: 'center'},
    buttonReject: {backgroundColor: '#DC143C', marginHorizontal: 10, padding: 10, borderRadius: 10, width: 100, justifyContent: 'center', alignItems: 'center'},
    buttonINProgress: {backgroundColor: 'gold', marginHorizontal: 10, padding: 10, borderRadius: 10, width: 100, justifyContent: 'center', alignItems: 'center'},
    buttonWaiting: {backgroundColor: 'orange', marginHorizontal: 10, padding: 10, borderRadius: 10, width: 100, justifyContent: 'center', alignItems: 'center'},
    buttonFinish: {backgroundColor: 'lightgreen', marginHorizontal: 10, padding: 10, borderRadius: 10, width: 100, justifyContent: 'center', alignItems: 'center'},
})