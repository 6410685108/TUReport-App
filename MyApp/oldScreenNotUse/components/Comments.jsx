import React , {useState , useEffect}from "react";
import { StyleSheet, Text, View } from 'react-native';
import { database } from "../../dbManager/Database";

const Comments = ({ postid }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        refreshComments();
    }, []);

    const refreshComments = () => {
        database.getComments(postid, (data) => {
            setComments(data);
        });
    }


    return (
        <View>
            <Text>Comments</Text>
            {comments.map(comment => (
                <View key={comment.id}>
                    <Text>
                        {comment.username}: {comment.content}
                    </Text>
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



export default Comments;