import React , {useState , useEffect}from "react";
import { StyleSheet, Text, View} from 'react-native';
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
                <Text key={post.id}> {post.title}: {post.content}: {post.username}</Text>
            ))}
        </View>
    );
}

export default Posts;