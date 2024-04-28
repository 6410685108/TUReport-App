import React, { useState , useContext ,useEffect} from 'react';
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity, Alert , Keyboard } from 'react-native';
import { db } from '../system/db';
import * as ImagePicker from 'expo-image-picker';
import { SettingContext } from '../system/setting';
import { useNavigation } from '@react-navigation/native';

const Edit = () => {
    const user = db.getCurrentUser();
    const [photo, setPhoto] = useState(null);
    const { setting } = useContext(SettingContext);
    const { theme, language } = setting;
    const [myphoto, setMyphoto] = useState(user.photoURL);

    const [displayname, setDisplayname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();
    const getPhoneNumber = async () => {
      setPhoneNumber(await db.getMyPhoneNumber());
    }

    
   
    
    useEffect (()=>{
      
      getPhoneNumber();
      setDisplayname(user.displayName)
      setPhoneNumber(phoneNumber)
    } ,[])

  const handleMessageSubmit = async () => {
    if (displayname!=('' || null) || phoneNumber!=('' || null)){
      try{
        await Promise.all([ 
          db.setDisplayName(displayname),
          db.setPhoneNumber(phoneNumber),
          db.uploadUserPhoto(photo),
        ]
      );
        Alert.alert('Profile updated successfully');
        navigation.navigate('Setting');
        return;
      } catch (error) {
        Alert.alert('Profile updated failed');
      }
    }
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
        setMyphoto(selectedImage.uri);
      }
    } catch (error) {
      setPhoto(photo);
    }
  };

  const handleNameSubmit = () => {
    Keyboard.dismiss();
    setDisplayname(displayname);
  };

  const handleEmailSubmit = () => {
    Keyboard.dismiss();
    setEmail(email);
  };

  const handlePhoneSubmit = () => {
    Keyboard.dismiss();
    setPhoneNumber(phoneNumber);
  };

  const styles = theme === 'light' ? lightstyles : darkstyles;

  
  if (language == "EN") {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Text style={[styles.text,{margin: 5, fontSize: 25,paddingBottom:20}]}>EDIT PROFILE</Text>
          </View>
        </View>
        <View style={styles.containerContent} >
            <View style={styles.center}>
                <TouchableOpacity onPress={handleAddPhoto}>
                <Image style={[styles.logo2]}source={{ uri: myphoto }}/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.text2]}>{'Name'}</Text>
            <View style={styles.content}>
                <TextInput
                placeholderTextColor={styles.placeholderStyle.color}
                value={displayname}
                onChangeText={setDisplayname}
                onSubmitEditing={handleNameSubmit}
                style={styles.boxx}
                />
            </View>
            <Text style={[styles.text2]}>{'Phone'}</Text>
            <View style={styles.content}>
                <TextInput
                placeholderTextColor={styles.placeholderStyle.color}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onSubmitEditing={handlePhoneSubmit}
                style={styles.boxx}
                />
            </View>

        </View>
        <TouchableOpacity style={styles.botsub} onPress={handleMessageSubmit}>
          <Text style={styles.text3}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Text style={[styles.text,{margin: 5, fontSize: 25,paddingBottom:20}]}>แก้ไขข้อมูล</Text>
          </View>
        </View>
        <View style={styles.containerContent} >
            <View style={styles.center}>
                <TouchableOpacity onPress={handleAddPhoto}>
                <Image style={[styles.logo2]}source={{ uri: user.photoURL }}/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.text2]}>{'ชื่อผู้ใช้'}</Text>
            <View style={styles.content}>
                <TextInput
                placeholderTextColor={styles.placeholderStyle.color}
                value={displayname}
                onChangeText={setDisplayname}
                onSubmitEditing={handleNameSubmit}
                style={styles.boxx}
                />
            </View>
            <Text style={[styles.text2]}>{'เบอร์โทร'}</Text>
            <View style={styles.content}>
                <TextInput
                placeholderTextColor={styles.placeholderStyle.color}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onSubmitEditing={handlePhoneSubmit}
                style={styles.boxx}
                />
            </View>

        </View>
        <TouchableOpacity style={styles.botsub} onPress={handleMessageSubmit}>
          <Text style={styles.text3}>ตกลง</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

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
        left: "12%" ,
        maxWidth: "80%",
        paddingTop: 10,
      },
      text3:{
          color: 'black',
          textAlign: 'center',
        },
    content: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        left: "10%" ,
        paddingTop: 10,
        paddingBottom: 10,
        maxWidth: "80%", 
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 100,
        height: 100,
        borderRadius: 100,
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
      left: "12%" ,
      maxWidth: "80%",
      paddingTop: 10,
    },
    text3:{
        color: 'white',
        textAlign: 'center',
      },
    center: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      left: "10%" ,
      paddingTop: 10,
      paddingBottom: 10,
      maxWidth: "80%",
    },
    content: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
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
      width: 100,
      height: 100,
      borderRadius: 100,
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



export default Edit;