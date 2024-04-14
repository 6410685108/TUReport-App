import React , { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Posts from './components/Posts';
import { database } from '../dbManager/Database';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [postname , setPostname] = useState('');
  const [content , setContent] = useState('');
  const [refreshId , setRefreshId] = useState(0);
  const { username } = route.params;

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleCreatePost = () => {
    database.createPost(postname, content, username);
    setRefreshId(refreshId + 1);
  }
  
  return (
    <View style={styles.container}>
      <Posts key={refreshId}/>
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
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Create Post" onPress={handleCreatePost} />
      <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
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
});

export default HomeScreen;
