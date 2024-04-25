import React, { useState , useEffect } from 'react';
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity, Alert , Keyboard } from 'react-native';
import Posts from "../components/Posts";
import { useNavigation } from "@react-navigation/native";
import { data } from '../system/fetchData';
import { db } from '../system/db';

const Profile = () => {
  const [sw , setSw] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setReloadKey(prevKey => prevKey + 1);
  }, [sw]);

  const handleSw = (bool) => {
    setSw(bool);
    setReloadKey(prevKey => prevKey + 1);
  }


  const user = db.getCurrentUser();
  const navigation = useNavigation();
  let language = "EN";
             
  const userImage = theme === 'light' ? require('../picture/user.png') : require('../picture/user_profile_w.png');
  const settingImage = theme === 'light' ? require('../picture/setting.png') : require('../picture/setting_w.png');
  const exitImage = theme === 'light' ? require('../picture/exit.png') : require('../picture/exit_w.png');

  if (language == "EN") {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Image style={[styles.logo]} source={userImage} />
            <Text style={[styles.text,{marginLeft: 5, fontSize: 25,}]}>PROFILE</Text>
          </View>
          <View style={styles.inNav}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
            >
              <Image
                style={{ width: 40, height: 40, marginRight: 5 }}
                source={settingImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => data.logout()}
            >
              <Image
                style={{ width: 40, height: 40, marginRight: 5 }}
                source={exitImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.containerContent} >
          <View style={styles.boxx}>
            <Image style={styles.logo2} source={{ uri: user.photoURL }}/>
            <Text style={[styles.text]}>{user.displayName}</Text>
            <Text style={[styles.text]}>{user.displayName}</Text>
            <Text style={[styles.text]}>{user.email}</Text>
          </View>
          <View style={styles.boxx2}>
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() => handleSw(true)}
              >
                <Text style={[styles.text]}>Your Posts</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.text]}>|</Text>
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() => handleSw(false)}
              >
                <Text style={[styles.text]}>Saved</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {sw ? (
          <Posts key={`${reloadKey}-MyPost`} option={"MyPost"} />
        ) : (
          <Posts key={`${reloadKey}-MyPost`} option={"Bookmark"} />
        )
        }
      </View>
    );
  }
  else{
    return (
      <View style={styles.test}>
        <Text>Profile</Text>
        <Button title="Sign Out" onPress={() => data.logout()} />
      </View>
    );
  }
};

let theme = "light";
let styles ;
if (theme == 'light'){
  styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      height: "100%",
    },
    nav: {
      flexDirection: "row",
      justifyContent: "space-between",
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
      fontSize: 16,
    },
    center: {
      left: "auto",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
    },
    boxx: {
      justifyContent: "center",
      alignItems: "center",
      height: 'auto',
      padding: 10,
      marginTop: 20,
      margin: 0,
      color: 'white',
      maxWidth: "80%",
      left: "10%" ,
      backgroundColor: "#ECECEC",
      borderRadius: 20,
    },
    boxx2: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#ECECEC",
      height: 'auto',
      padding: 10,
      marginTop: 20,
      margin: 0,
      color: 'white',
      maxWidth: "80%",
      left: "15%" ,
      borderRadius: 20,
    },
    logo: {
      width: 40,
      height: 40,
      marginTop: 0,
      borderColor: 'white',
      borderRadius: 30,
    },
    logo2: {
      width: 100,
      height: 100,
      borderRadius: 30,
    },
  });
}else if(theme == "dark"){
  styles = StyleSheet.create({
    container: {
      backgroundColor: "#1c1c1c",
      height: "100%",
    },
    nav: {
      flexDirection: "row",
      justifyContent: "space-between",
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
      fontSize: 16,
    },
    center: {
      left: "auto",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
    },
    boxx: {
      justifyContent: "center",
      alignItems: "center",
      height: 'auto',
      padding: 10,
      marginTop: 20,
      margin: 0,
      color: 'white',
      maxWidth: "80%",
      left: "10%" ,
      backgroundColor: "#606060",
      borderRadius: 20,
    },
    boxx2: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#606060",
      height: 'auto',
      padding: 10,
      marginTop: 20,
      margin: 0,
      color: 'white',
      maxWidth: "80%",
      left: "15%" ,
      borderRadius: 20,
    },
    logo: {
      width: 40,
      height: 40,
      marginTop: 0,
      borderColor: 'white',
      borderRadius: 30,
    },
    logo2: {
      width: 100,
      height: 100,
      borderRadius: 30,
    },
  });
}

export default Profile;
