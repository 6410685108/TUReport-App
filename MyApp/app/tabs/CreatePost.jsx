import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { firebase_db } from '../../firebaseConfig'; // Import firebase_db from your firebaseConfig
import { collection , addDoc } from 'firebase/firestore/lite';

const CreatePost = () => {
  const [message, setMessage] = useState('');

  const handleMessageSubmit = async () => {
    if (!message) {
      return; // Handle empty message case (optional)
    }
  
    try {
      const messagesCollection = collection(firebase_db, 'messages');
      await addDoc(messagesCollection, { message, sender: 'yourUserId' }); 
      setMessage(''); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        multiline
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, padding: 10 }}
      />
      <Button title="Submit" onPress={handleMessageSubmit} />
    </View>
  );
};

export default CreatePost;
