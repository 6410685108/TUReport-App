import React, { useState } from 'react';
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { firebase_db } from '../../firebaseConfig'; // Import firebase_db from your firebaseConfig
import { collection , addDoc } from 'firebase/firestore/lite';

const CreatePost = () => {
  const [message, setMessage] = useState('');
  const [anonymous, setanonymous] = useState(false);

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
  const handleAcceptToggle = () => {
    setanonymous(!anonymous);
  };
  const handleAddPhoto = () => {
    // Jamesssssssssss
  };

  return (
    <View>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image style={[styles.logo, {margin: 5}]} source={{uri: 'https://w7.pngwing.com/pngs/283/132/png-transparent-house-business-real-estate-logo-service-house-text-service-room-thumbnail.png',}} />
          <Text style={[{margin: 5, fontSize: 40, fontWeight: 'bold'}]}>CREATE POST</Text>
        </View>
      </View>
      <View >
        <View style={styles.content}>
          <Image style={{width: 30, height: 30}}source={{uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}}/>
          <Text style={[{margin: 5, fontSize: 20, fontWeight: 'bold'}]}>User X</Text>
        </View>
        <View style={styles.content}>
          <Image style={{width: 30, height: 30}}source={{uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}}/>
          <TextInput
          placeholder="Add topic"
          placeholderTextColor="black" 
          value={message}
          onChangeText={setMessage}
          multiline
          style={styles.boxx}
          />
        </View>
        <View style={styles.content}>
          <Image style={{width: 30, height: 30}}source={{uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}}/>
          <TextInput
          placeholder="Add more details"
          placeholderTextColor="black" 
          value={message}
          onChangeText={setMessage}
          multiline
          style={styles.boxx}
          />
        </View>
        <View style={styles.content}>
          <Image style={{width: 30, height: 30}}source={{uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}}/>
          <TextInput
          placeholder="Add location"
          placeholderTextColor="black" 
          value={message}
          onChangeText={setMessage}
          multiline
          style={styles.boxx}
          />
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={handleAddPhoto}>
            <Image style={{width: 30, height: 30}}source={{uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}}/>
          </TouchableOpacity>
          <Text style={styles.boxx}>Add photos</Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={handleAcceptToggle} style={[styles.button, { backgroundColor: anonymous ? 'black' : 'white' }]}>
              <Text style={{ color: anonymous ? 'white' : 'black' }}>O</Text>
          </TouchableOpacity>
          <Text style={styles.boxx}>Anonymous</Text>
        </View>

      </View>

      <TouchableOpacity onPress={handleMessageSubmit}>
        <Text style={styles.botsub}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inNav: {
      flexDirection: 'row',
      justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left: 75,
    padding: 10,
  },
  boxx: {
    width: 280,
    height: 40,
    padding: 10,
    marginLeft: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'gray',
    margin: 0,
  },
  logo: {
      width: 40,
      height: 40,
  },
  botsub: {
    marginTop: 50,
    backgroundColor: '#fac33d',
    color: 'black',
    padding: 10,
    borderRadius: 20,
    width:80,
    textAlign: 'center',
    alignSelf: 'flex-end',
    right:20,
    
  },
});

export default CreatePost;
