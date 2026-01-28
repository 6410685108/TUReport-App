import React, { useState , useEffect , useContext} from 'react'
import PropTypes from 'prop-types';
import { SettingContext } from '../system/setting';

import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import Posts from "../components/Posts";
import { data } from '../system/data';
import { db } from '../system/db';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

// Sub-component for tab toggle button
const TabButton = ({ onPress, text, isBold, styles }) => (
  <View style={styles.center}>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, isBold && { fontWeight: 'bold' }]}>{text}</Text>
    </TouchableOpacity>
  </View>
);

TabButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isBold: PropTypes.bool.isRequired,
  styles: PropTypes.shape({
    center: PropTypes.object,
    text: PropTypes.object,
  }).isRequired,
};

// Sub-component for header navigation
const HeaderNav = ({ language, theme, styles, navigation }) => {
  const userImage = theme === 'light' ? require('../picture/user.png') : require('../picture/user_w.png');
  const settingImage = theme === 'light' ? require('../picture/setting.png') : require('../picture/setting_w.png');
  const exitImage = theme === 'light' ? require('../picture/exit.png') : require('../picture/exit_w.png');

  return (
    <View style={styles.nav}>
      <View style={styles.inNav}>
        <Image style={[styles.logo]} source={userImage} />
        <Text style={[styles.text, { marginLeft: 5, fontSize: 25 }]}>
          {language === 'EN' ? "PROFILE" : "โปรไฟล์"}
        </Text>
      </View>
      <View style={styles.inNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image style={{ width: 40, height: 40, marginRight: 5 }} source={settingImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => data.logout()}>
          <Image style={{ width: 40, height: 40, marginRight: 5 }} source={exitImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

HeaderNav.propTypes = {
  language: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    nav: PropTypes.object,
    inNav: PropTypes.object,
    logo: PropTypes.object,
    text: PropTypes.object,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

// Sub-component for user info box
const UserInfoBox = ({ user, phoneNumber, language, styles }) => (
  <View style={styles.boxx}>
    <Image style={styles.logo2} source={{ uri: user.photoURL }} />
    <Text style={[styles.text]}>{user.displayName}</Text>
    <Text style={[styles.text]}>{phoneNumber ?? (language === 'EN' ? "No Phone Number" : "ไม่มีเบอร์")}</Text>
    <Text style={[styles.text]}>{user.email}</Text>
  </View>
);

UserInfoBox.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  phoneNumber: PropTypes.string,
  language: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    boxx: PropTypes.object,
    logo2: PropTypes.object,
    text: PropTypes.object,
  }).isRequired,
};

const Profile = () => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === 'light' ? lightstyles : darkstyles;

  const [sw, setSw] = useState(true);
  const navigation = useNavigation();
  const [reloadKey, setReloadKey] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  const getPhoneNumber = async () => {
    setPhoneNumber(await db.getMyPhoneNumber());
    setReloadKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    getPhoneNumber();
    setReloadKey(prevKey => prevKey + 1);
  }, [sw, navigation, phoneNumber]);

  useFocusEffect(
    React.useCallback(() => {
      getPhoneNumber();
    }, [])
  );

  const handleSw = (bool) => {
    setSw(bool);
    setReloadKey(prevKey => prevKey + 1);
  };

  const user = db.getCurrentUser();
  const yourPostsText = language === 'EN' ? "Your Posts" : "โพสต์ของคุณ";
  const savedText = language === 'EN' ? "Saved" : "บันทึก";

  return (
    <View style={styles.container}>
      <HeaderNav language={language} theme={theme} styles={styles} navigation={navigation} />
      
      <View style={styles.containerContent}>
        <UserInfoBox user={user} phoneNumber={phoneNumber} language={language} styles={styles} />
        <View style={styles.boxx2}>
          <TabButton onPress={() => handleSw(true)} text={yourPostsText} isBold={sw} styles={styles} />
          <Text style={[styles.text]}>|</Text>
          <TabButton onPress={() => handleSw(false)} text={savedText} isBold={!sw} styles={styles} />
        </View>
      </View>

      <ScrollView style={{ width: '84%', height: '100%', fontSize: '100%', left: '8%' }}>
        {sw ? (
          <Posts key={`${reloadKey}-MyPost`} option={"MyPost"} />
        ) : (
          <Posts key={`${reloadKey}-Bookmark`} option={"Bookmark"} />
        )}
      </ScrollView>
    </View>
  );
};


const lightstyles = StyleSheet.create({
    containerContent: {
      marginBottom: 10,
    },
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
      marginBottom:10,
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
    },
    logo2: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
  });

const darkstyles = StyleSheet.create({
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
      marginBottom:20,
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
      borderColor: 'black',
    },
    logo2: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
  });

export default Profile;
