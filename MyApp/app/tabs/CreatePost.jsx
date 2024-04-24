import React, { useState } from 'react';
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity, Alert , Keyboard } from 'react-native';
import { db } from '../system/db';
import * as ImagePicker from 'expo-image-picker';
import { firebase_storage } from '../../firebaseConfig';
import { set } from 'firebase/database';

const CreatePost = () => {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  let language = "EN";

  const handleMessageSubmit = async () => {
    if (!topic || !details || !location) {
      return;
    }
    try {
      const email = db.getUserEmail()._j;
      db.createPost(topic, details, location , photo , anonymous , email);
      setTopic('');
      setDetails('');
      setLocation('');
      setPhoto(null);
      Alert.alert('Success','Post created successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleAcceptToggle = () => {
    setAnonymous(!anonymous);
  };

  const handleAddPhoto = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    
      if (!result.cancelled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setPhoto(selectedImage.uri); 
      }
    } catch (error) {
      setPhoto(photo);
    }
  };

  const handleLocationSubmit = () => {
    setLocation(location); 
    Keyboard.dismiss(); 
};
  const handleTopicSubmit = () => {
    setTopic(topic); 
    Keyboard.dismiss();
  }

  const test = () => {
    // db.showCurrentUserInfo("email");
    console.log("test")
  }
  
  if (language == "EN") {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Image style={[styles.logo, {margin: 5}]} source={require('../picture/createpost.png')} />
            <Text style={[styles.fcolor,{margin: 5, fontSize: 25,}]}>CREATE POST</Text>
          </View>
        </View>
        
        <View style={styles.containerContent} >
          <View style={styles.content}>
            <Image style={styles.logo2}source={require('../picture/user_profile.png')}/>
            <Text style={[styles.fcolor,{width: 280,height: 35,marginLeft: 10, paddingTop:5,fontSize: 18,}]}>User X</Text>
          </View>
         
          <View style={styles.content}>
            <Image style={styles.logo2}source={require('../picture/addTopic.png')}/>
            <TextInput
            placeholder="Add topic"
            placeholderTextColor={styles.placeholderStyle.color}
            value={topic}
            onChangeText={setTopic}
            onSubmitEditing={handleTopicSubmit}
            style={styles.boxx}
            />
          </View>
          <View style={styles.content}>
            <Image style={styles.logo2}source={require('../picture/AddMoreDetail.png')}/>
            <TextInput
            placeholder="Add more details"
            placeholderTextColor={styles.placeholderStyle.color}
            value={details}
            onChangeText={setDetails}
            multiline
            style={[styles.boxx,{height:100, textAlignVertical: 'top',}]}
            />
          </View>
          <View style={styles.content}>
            <Image style={styles.logo2}source={require('../picture/map.png')}/>
            <TextInput
            placeholder="Add location"
            placeholderTextColor={styles.placeholderStyle.color}
            value={location}
            onChangeText={setLocation}
            onSubmitEditing={handleLocationSubmit}
            style={styles.boxx}
            />
          </View>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleAddPhoto}>
              <Image style={styles.logo2}source={require('../picture/photo.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddPhoto} style={{ flex: 1 }}>
              <Text style={styles.boxx}>Add photos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
          <TouchableOpacity onPress={handleAcceptToggle} style={styles.circle}>
            {anonymous ? (
              <Text style={styles.checkmark}>✓</Text>
            ) : null}
          </TouchableOpacity>
            <Text style={styles.boxx}>Anonymous</Text>
          </View>
  
        </View>
        <TouchableOpacity onPress={handleMessageSubmit}>
          <Text style={styles.botsub}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={test}>
          <Text style={styles.botsub}>Test Func</Text>
        </TouchableOpacity>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Image style={[styles.logo, {margin: 5}]} source={require('../picture/createpost.png')} />
            <Text style={[styles.fcolor,{margin: 5, fontSize: 25,}]}>สร้างโพสต์</Text>
          </View>
        </View>
        
        <View style={styles.containerContent} >
          <View style={styles.content}>
              <Image style={styles.logo2}source={require('../picture/user_profile.png')}/>
              <Text style={[styles.fcolor,{width: 280,height: 35,marginLeft: 10, paddingTop:5,fontSize: 18,}]}>ผู้ใช้ X</Text>
            </View>
         
          <View style={styles.content}>
            <Image style={styles.logo2}source={require('../picture/addTopic.png')}/>
            <TextInput
            placeholder="เพิ่มหัวข้อ"
            placeholderTextColor={styles.placeholderStyle.color}
            value={topic}
            onChangeText={setTopic}
            onSubmitEditing={handleTopicSubmit}
            style={styles.boxx}
            />
          </View>
          <View style={styles.content}>
            <Image style={styles.logo2}source={require('../picture/AddMoreDetail.png')}/>
            <TextInput
            placeholder="เพิ่มรายละเอียดเพิ่มเติม"
            placeholderTextColor={styles.placeholderStyle.color}
            value={details}
            onChangeText={setDetails}
            multiline
            style={[styles.boxx,{height:100, textAlignVertical: 'top',}]}
            />
          </View>
          <View style={styles.content}>
            <Image style={styles.logo2}source={require('../picture/map.png')}/>
            <TextInput
            placeholder="เพิ่มสถานที่"
            placeholderTextColor={styles.placeholderStyle.color}
            value={location}
            onChangeText={setLocation}
            onSubmitEditing={handleLocationSubmit}
            style={styles.boxx}
            />
          </View>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleAddPhoto}>
              <Image style={styles.logo2}source={require('../picture/photo.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddPhoto} style={{ flex: 1 }}>
              <Text style={styles.boxx}>เพิ่มรูปถ่าย</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
          <TouchableOpacity onPress={handleAcceptToggle} style={styles.circle}>
            {anonymous ? (
              <Text style={styles.checkmark}>✓</Text>
            ) : null}
          </TouchableOpacity>
            <Text style={styles.boxx}>ไม่ระบุชื่อ</Text>
          </View>
  
        </View>
        <TouchableOpacity onPress={handleMessageSubmit}>
          <Text style={styles.botsub}>ส่ง</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={test}>
          <Text style={styles.botsub}>Test Func</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

let theme = "dark";
let styles ;
if (theme == 'light'){
  styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      height: "100%",
    },
    nav: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10%",
    },
    inNav: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginHorizontal: 5,
      marginTop: 5,
    },
    fcolor:{
      color: 'black',
    },
    content: {
      flexDirection: 'row',
      justifyContent: "flex-start",
      left: "10%" ,
      paddingTop: 10,
      paddingBottom: 10,
      maxWidth: "80%",
    },
    boxx: {
      flex: 1,
      height: 40,
      padding: 10,
      marginLeft: 10,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'gray',
      margin: 0,
      color: 'black',
    },
    placeholderStyle: {
      color: 'black', 
    },
    circle: {
      width: 25,
      height: 25,
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:5,
      marginRight:10,
      left:5,
    },
    checkmark: {
      fontSize: 20,
      color: 'black',
      textAlign: 'center',
      lineHeight: 25,
    },
    logo: {
      width: 60,
      height: 60,
      marginTop: 0,
    },
    logo2: {
      width: 35,
      height: 35,
    },
    botsub: {
      marginTop: 50,
      backgroundColor: '#fac33d',
      color: 'black',
      padding: 10,
      borderRadius: 30,
      width:80,
      textAlign: 'center',
      alignSelf: 'flex-end',
      right:"10%",
    },
  });
}else if(theme == "dark"){
  styles = StyleSheet.create({
    container: {
      backgroundColor: "#000000",
      height: "100%",
    },
    nav: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10%",
    },
    inNav: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginHorizontal: 5,
      marginTop: 5,
    },
    fcolor:{
      color: 'white',
    },
    content: {
      flexDirection: 'row',
      justifyContent: "flex-start",
      left: "10%" ,
      paddingTop: 10,
      paddingBottom: 10,
      maxWidth: "80%",
    },
    boxx: {
      flex: 1,
      height: 40,
      padding: 10,
      marginLeft: 10,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'gray',
      margin: 0,
      color: 'white',
    },
    placeholderStyle: {
      color: 'white', 
    },
    circle: {
      width: 25,
      height: 25,
      borderStyle: 'solid',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:5,
      marginRight:10,
      left:5,
    },
    checkmark: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      lineHeight: 25,
    },
    logo: {
      width: 60,
      height: 60,
      marginTop: 0,
      borderColor: 'white',
      backgroundColor: "#FFF",
      borderRadius: 30,
    },
    logo2: {
      width: 35,
      height: 35,
      backgroundColor: "#FFF",
      borderRadius: 30,
    },
    botsub: {
      marginTop: 50,
      backgroundColor: '#fac33d',
      color: 'white',
      padding: 10,
      borderRadius: 30,
      width:80,
      textAlign: 'center',
      alignSelf: 'flex-end',
      right:"10%",
    },
  });
}


export default CreatePost;