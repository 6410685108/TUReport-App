import React , {useState , useEffect}from "react";
import { StyleSheet, Text, View , TextInput , Button} from 'react-native';
import { database } from '../../dbManager/Database';

const Posts = ({username}) => {
    const [comment , setComment] = useState('');

    useEffect(() => {
        refreshPosts();
      }, []);

    const [posts , setPosts] = useState([]);
    const refreshPosts = () => {
        database.getAllPosts((data) => {
          setPosts(data);
        });
    };

    const handleComment = (postid) => {
        database.createComment(postid, username ,comment);
        setComment('');
        refreshPosts();
    }


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
            <TextInput
                style={styles.input}
                placeholder="Comment"
                value={comment}
                onChangeText={setComment}
            />
            <Button title="Comment" onPress={() => handleComment(post.id)} />
            <Text>------------------------------------{'\n'}</Text>
            </View>
        ))}
        </View>


    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    }});



export default Posts;