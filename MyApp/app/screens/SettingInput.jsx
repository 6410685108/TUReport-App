import React, { useState , useContext ,useEffect} from "react";
import { SettingContext } from '../system/setting';
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity, Alert , Keyboard,Switch } from 'react-native';
import { firebase_auth } from "../../firebaseConfig";
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { db } from '../system/db';
import constants from "react-native-ui-lib/src/commons/Constants";




const SettingInput = () => {
    const { setting } = useContext(SettingContext);
    const { theme, language } = setting;
    const styles = theme === 'light' ? lightstyles : darkstyles;
    const [englishChecked, setEnglishChecked] = useState (()=>  {
        if(language === 'EN') {return true;}
        if(language === 'TH') {return false;}
    });
    const [thaiChecked, setThaiChecked] = useState (()=>  {
        if(language === 'EN') {return false;}
        if(language === 'TH') {return true;}
    });
    const [lightChecked, setLightChecked] = useState (()=>  {
        if(theme === 'dark') {return false;}
        if(theme === 'light') {return true;}
    });
    
    const [darkChecked, setDarkChecked] = useState (()=>  {
        if(theme === 'dark') {return true;}
        if(theme === 'light') {return false;}
    });

  const handleEditPress = () => {
    console.log("Edit Profile");
  };
  const handleEnglishPress = () => {
    setEnglishChecked(true);
    setThaiChecked(false);
    setting.setLanguage('EN')
  };

  const handleThaiPress = () => {
    setEnglishChecked(false);
    setThaiChecked(true);
    setting.setLanguage('TH')
  };
  const handleLightPress = () => {
    setLightChecked(true);
    setDarkChecked(false);
    setting.setTheme('light')
  };
  const handleDarkPress = () => {
    setLightChecked(false);
    setDarkChecked(true);
    setting.setTheme('dark')
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();

  const settingImage = theme === 'light' ? require('../picture/setting.png') : require('../picture/setting_w.png');
  const user_profileImage = theme === 'light' ? require('../picture/user_profile_g.png') : require('../picture/user_profile_g.png');
  const eng_langImage = require('../picture/eng_lang.png');
  const thai_langImage = require('../picture/thai_lang.png');
  const theme1Image = require('../picture/theme1.png');
  const theme2Image = require('../picture/theme2.png');
  const theme3Image = require('../picture/theme3.png');
  const theme4Image = require('../picture/theme4.png');

  const user = db.getCurrentUser();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const getPhoneNumber = async () => {
    setPhoneNumber(await db.getMyPhoneNumber());
  }
  const getUsername = async () => {
    setUsername(user.displayName);
  }
  useEffect (()=>{
    getPhoneNumber();
    getUsername();
    // if (!isEnabled) {
    //   db.unSetPin();
    // }

  } ,[isEnabled])
  useFocusEffect(
    React.useCallback(() => {
        getPhoneNumber();
        getUsername();
      }, [])
  );
  const onSwitchValueChange = () => {
    if (!isEnabled) {
      navigation.navigate('Pin');
    }
    toggleSwitch();
  };

    return (
        <View style={styles.container}>
        <View style={styles.nav}>
            <View style={styles.inNav}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Profile2');
                }}
                >
                <Text style={[styles.text,{fontSize: 25}]}>{'<'}</Text>
            </TouchableOpacity>
            <Image style={[styles.logo]} source={settingImage} />
            <Text style={[styles.text,{marginLeft: 5, fontSize: 25,}]}>{language === 'EN' ? "Settings" : "ตั้งค่า"}</Text>
            </View>
        </View>
        
        <View style={[styles.containerContent,styles.center]} >
                <View style={styles.boxx}>
                <View style={[styles.inNav,{left:40}]}>
                <Image style={styles.logo2}source={{ uri: user.photoURL }}/>
                <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
                    <View style={styles.boxx3}>
                        <Text style={[styles.text,{fontSize:12}]}>{language === 'EN' ? "Edit Profile" : "แก้ไขโปรไฟล์"}</Text>
                    </View>
                </TouchableOpacity>
                </View>
                <Text style={[styles.text]}>{username}</Text>
                <Text style={[styles.text]}>{phoneNumber !== null ? phoneNumber : (language === 'EN' ? "No Phone Number" : "ไม่มีเบอร์")}</Text>
                <Text style={[styles.text]}>{user.email}</Text>
            </View>
            <Text style={[styles.text2]}>{language === 'EN' ? '> Language' : '> ภาษา'}</Text>
            <View style={styles.boxx2}>
                <TouchableOpacity onPress={handleEnglishPress}>
                    <View style={styles.nav2}>
                        <View style={styles.inNav}>
                            <Image style={styles.logo3} source={eng_langImage} />
                            <Text style={styles.text}>English</Text>
                        </View>
                        {englishChecked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleThaiPress}>
                    <View style={styles.nav2}>
                        <View style={styles.inNav}>
                            <Image style={styles.logo3} source={thai_langImage} />
                            <Text style={styles.text}>Thai</Text>
                        </View>
                        {thaiChecked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.boxx2}>
                <View style={styles.nav2} >
                    <Text style={[styles.text2]}>{language === 'EN' ? '> Pin Code' : '> รหัสพิน'}</Text>
                    <Switch
                        trackColor={{false: styles.thumbColorFalse, true: styles.thumbColorTrue}}
                        thumbColor={isEnabled ? styles.cycleColor : styles.cycleColor}
                        ios_backgroundColor={styles.iosBackgroundColor}
                        onValueChange={onSwitchValueChange}
                        value={isEnabled}
                    />
                </View>
            </View>
            <Text style={[styles.text2]}>{language === 'EN' ? '> Apptheme' : '> ธีม'}</Text>
            <View style={styles.nav2}>
                <TouchableOpacity onPress={handleLightPress}>
                    <View style={styles.boxx4}>
                        <Image style={styles.logo4} source={theme1Image} />
                        {lightChecked && <Text style={[styles.checkmark,{top:5}]}>✓</Text>}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDarkPress}>
                    <View style={styles.boxx4}>
                        <Image style={styles.logo4} source={theme2Image} />
                        {darkChecked && <Text style={[styles.checkmark,{top:5}]}>✓</Text>}
                    </View>         
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        console.log("Theme 3 is nothing!");
                    }}
                >
                    <View style={styles.boxx4}>
                        <Image style={styles.logo4} source={theme3Image} />
                    </View>         
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        console.log("Theme 4 is nothing!");
                    }}
                >
                    <View style={styles.boxx4}>
                        <Image style={styles.logo4} source={theme4Image} />
                    </View>         
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );
};


const lightstyles = StyleSheet.create({
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
    nav2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    text2:{
        color: 'black',
        fontSize: 20,
    },
    center: {
        left: "10%" ,
        maxWidth: "80%",
    },
    boxx: {
        justifyContent: "center",
        alignItems: "center",
        height: 'auto',
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        margin: 0,
        color: 'white',
        backgroundColor: "#ECECEC",
        borderRadius: 20,
    },
    boxx2: {
        justifyContent: "flex-start",
        height: 'auto',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
        backgroundColor: "#ECECEC",
        borderRadius: 20,
    },
    boxx3: {
        height: 'auto',
        alignItems: "center",
        width: 80,
        backgroundColor: "#aacbff",
        borderRadius: 20,
        padding:0,
        margin: 0,
        top: -25,
    },
    boxx4: {
        height: 80,
        alignItems: "center",
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
        borderRadius: 100,
    },
    logo3: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    logo4: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
    checkmark: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        lineHeight: 25,
    },
    thumbColorFalse: '#3e3e3e',
    thumbColorTrue: '#81b0ff',
    cycleColor: 'white',
    iosBackgroundColor: '#3e3e3e',
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
    nav2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    text2:{
        color: 'white',
        fontSize: 20,
    },
    center: {
        left: "10%" ,
        maxWidth: "80%",
    },
    boxx: {
        justifyContent: "center",
        alignItems: "center",
        height: 'auto',
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        margin: 0,
        color: 'white',
        backgroundColor: "#606060",
        borderRadius: 20,
    },
    boxx2: {
        justifyContent: "flex-start",
        height: 'auto',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
        backgroundColor: "#606060",
        borderRadius: 20,
    },
    boxx3: {
        height: 'auto',
        alignItems: "center",
        width: 80,
        backgroundColor: "#81b0ff",
        borderRadius: 20,
        padding:0,
        margin: 0,
        top: -25,
    },
    boxx4: {
        height: 80,
        alignItems: "center",
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
        borderRadius: 100,
    },
    logo3: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    logo4: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
    checkmark: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        lineHeight: 25,
    },
    thumbColorFalse: '#e8e8e8',
    thumbColorTrue: '#81b0ff',
    cycleColor: 'white',
    iosBackgroundColor: '#e8e8e8',
    });


export default SettingInput;
