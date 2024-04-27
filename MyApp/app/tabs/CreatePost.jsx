import React, { useState , useContext } from 'react';
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity, Alert , Keyboard } from 'react-native';
import { db } from '../system/db';
import * as ImagePicker from 'expo-image-picker';
import { SettingContext } from '../system/setting';

const CreatePost = () => {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;

  const handleMessageSubmit = async () => {
    if (!topic || !details || !location) {
      return;
    }
    try {
      db.createPost(topic, details, location , photo , anonymous );
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

  const test = async () => {
    console.log("ST=====================================")
    // const res = await db.getPost("1htWIABJxUy7p0NiYlPC")
    // console.log(res)
    // db.showCurrentUserInfo("email");
    // const posts = await db.getBookmarkedPosts();
    // console.log(theme)
    // console.log(language)
    //await db.uploadUserPhoto("https://i.pinimg.com/736x/cc/ed/9d/cced9d4575e75981a21176773a9758a8.jpg");
    //await db.uploadUserPhoto("https://i.pinimg.com/736x/c6/f2/a1/c6f2a1a4dcc80e3a95d93a6613b5a325.jpg");

    // console.log(await db.getUserPhoto())
    console.log("ED=====================================")
  }
  const user = db.getCurrentUser();
  const createpostImage = theme === 'light' ? require('../picture/createpost.png') : require('../picture/AddMoreDetail_w.png');
  const user_profileImage = theme === 'light' ? require('../picture/user_profile_g.png') : require('../picture/user_profile_g.png');
  const addTopicImage = theme === 'light' ? require('../picture/addTopic.png') : require('../picture/addTopic_w.png');
  const AddMoreDetailImage = theme === 'light' ? require('../picture/AddMoreDetail.png') : require('../picture/AddMoreDetail_w.png');
  const mapImage = theme === 'light' ? require('../picture/map.png') : require('../picture/map_w.png');
  const photoImage = theme === 'light' ? require('../picture/photo.png') : require('../picture/photo_w.png');
  const styles = theme === 'light' ? lightstyles : darkstyles;
  if (language == "EN") {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Image style={[styles.logo, {margin: 5}]} source={createpostImage} />
            <Text style={[styles.text,{margin: 5, fontSize: 25,}]}>CREATE POST</Text>
          </View>
        </View>
        
        <View style={styles.containerContent} >
        <TouchableOpacity onPress={handleAcceptToggle} style={{left:'8%'}}>
          {anonymous ? (
            <View style={styles.content}>
              <Image style={styles.logo2}source={user_profileImage}/>
              <Text style={[styles.text,{width: 280,height: 35,marginLeft: 10, paddingTop:5,fontSize: 18,}]}>Anonymous</Text>
            </View>
          ) :            
            <View style={styles.content}>
              <Image style={styles.logo2}source={{uri: user.photoURL}}/>
              <Text style={[styles.text,{width: 280,height: 35,marginLeft: 10, paddingTop:5,fontSize: 18,}]}>{user.displayName}</Text>
            </View>
          }
          </TouchableOpacity>
         
          <View style={styles.content}>
            <Image style={styles.logo2}source={addTopicImage}/>
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
            <Image style={styles.logo2}source={AddMoreDetailImage}/>
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
            <Image style={styles.logo2}source={mapImage}/>
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
              <Image style={styles.logo2}source={photoImage}/>
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
        <TouchableOpacity style={styles.botsub} onPress={handleMessageSubmit}>
          <Text style={styles.text2}>Submit</Text>
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
            <Image style={[styles.logo, {margin: 5}]} source={createpostImage} />
            <Text style={[styles.text,{margin: 5, fontSize: 25,}]}>CREATE POST</Text>
          </View>
        </View>
        
        <View style={styles.containerContent} >
          <TouchableOpacity onPress={handleAcceptToggle} style={{left:'8%'}}>
          {anonymous ? (
            <View style={styles.content}>
              <Image style={styles.logo2}source={user_profileImage}/>
              <Text style={[styles.text,{width: 280,height: 35,marginLeft: 10, paddingTop:5,fontSize: 18,}]}>ไม่ระบุตัวตน</Text>
            </View>
          ) :            
            <View style={styles.content}>
              <Image style={styles.logo2}source={{uri: user.photoURL}}/>
              <Text style={[styles.text,{width: 280,height: 35,marginLeft: 10, paddingTop:5,fontSize: 18,}]}>{user.displayName}</Text>
            </View>
          }
          </TouchableOpacity>

          <View style={styles.content}>
            <Image style={styles.logo2}source={addTopicImage}/>
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
            <Image style={styles.logo2}source={AddMoreDetailImage}/>
            <TextInput
            placeholder="เพิ่มรายละเอียด"
            placeholderTextColor={styles.placeholderStyle.color}
            value={details}
            onChangeText={setDetails}
            multiline
            style={[styles.boxx,{height:100, textAlignVertical: 'top',}]}
            />
          </View>
          <View style={styles.content}>
            <Image style={styles.logo2}source={mapImage}/>
            <TextInput
            placeholder="ระบุสถานที่"
            placeholderTextColor={styles.placeholderStyle.color}
            value={location}
            onChangeText={setLocation}
            onSubmitEditing={handleLocationSubmit}
            style={styles.boxx}
            />
          </View>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleAddPhoto}>
              <Image style={styles.logo2}source={photoImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddPhoto} style={{ flex: 1 }}>
              <Text style={styles.boxx}>เพิ่มรูปภาพ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleAcceptToggle} style={styles.circle}>
              {anonymous ? (
                <Text style={styles.checkmark}>✓</Text>
              ) : null}
            </TouchableOpacity>
            <Text style={styles.boxx}>ไม่ระบุตัวตน</Text>
          </View>
  
        </View>
        <TouchableOpacity style={styles.botsub} onPress={handleMessageSubmit}>
          <Text style={styles.text2}>โพสต์</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={test}>
          <Text style={styles.botsub}>Test Func</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

let styles ;
const lightstyles = StyleSheet.create({
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
    text:{
      color: 'black',
    },
    text2:{
      color: 'black',
      textAlign: 'center',
      
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
      borderRadius: 15,
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
      borderRadius: 30,
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

const darkstyles = StyleSheet.create({
    container: {
      backgroundColor: "#1c1c1c",
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
    text:{
      color: 'white',
    },
    text2:{
      color: 'white',
      textAlign: 'center',
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
      borderRadius: 15,
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
      borderRadius: 30,
    },
    logo2: {
      width: 35,
      height: 35,
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



export default CreatePost;