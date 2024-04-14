import React , {useState , useEffect}from "react";
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import { database } from '../../dbManager/Database';

const Posts = () => {
    useEffect(() => {
        refreshPosts();
      }, []);

    const [posts , setPosts] = useState([]);
    const refreshPosts = () => {
        database.getAllPosts((data) => {
          setPosts(data);
        });
    };


    return (

        <View>
        {posts.map(post => (
            <View key={post.id}>
            <Text>
                {post.title}: {post.content}{'\n'}
                Username: {post.username}{'\n'}
                Repost: {post.repost}{'\n'}
                Status: {post.status}{'\n'}
                Location: {post.location}{'\n'}
                Anonymous: {post.anonymous}
            </Text>
            <Text>------------------------------------{'\n'}</Text>
            </View>
        ))}
        </View>


    );
}

export default Posts;