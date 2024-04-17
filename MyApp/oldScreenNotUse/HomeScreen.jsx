import React , { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Posts from './components/Posts';
import { database } from '../dbManager/Database';
import { AuthContext } from "./system/Authenticate";

const HomeScreen = ({ navigation }) => {
  const { username , logout } = useContext(AuthContext);
  const [postname , setPostname] = useState('');
  const [content , setContent] = useState('');
  const [refreshId , setRefreshId] = useState(0);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const handleCreatePost = () => {
    database.createPost(postname, content, username);
    setRefreshId(refreshId + 1);
  }
  
  return (
    <View style={styles.container}>
      <Posts key={refreshId} username={username}/>
      <Text>Welcome, {username}!</Text>
      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={postname}
        onChangeText={setPostname}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />  
      <Button title="Create Post" onPress={handleCreatePost} />
      <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    width: '40%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
