import React, { useState } from 'react';
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity, Alert , Keyboard,Switch } from 'react-native';
import { firebase_auth } from "../../firebaseConfig";

const SettingInput = () => {
  let language = "EN";
  const [englishChecked, setEnglishChecked] = useState(false);
  const [thaiChecked, setThaiChecked] = useState(false);

  const handleEnglishPress = () => {
    setEnglishChecked(true);
    setThaiChecked(false);
    console.log("Move to English page!");
  };

  const handleThaiPress = () => {
    setEnglishChecked(false);
    setThaiChecked(true);
    console.log("Move to Thai page!");
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const settingImage = theme === 'light' ? require('../picture/setting.png') : require('../picture/setting_w.png');
  const user_profileImage = theme === 'light' ? require('../picture/user_profile.png') : require('../picture/user_profile_w.png');
  const eng_langImage = require('../picture/eng_lang.png');
  const thai_langImage = require('../picture/thai_lang.png');
  if (language == "EN") {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <TouchableOpacity
                onPress={() => {
                  console.log("back to Profile page!");
                }}
              >
                <Text style={[styles.text,{fontSize: 25}]}>{'<'}</Text>
            </TouchableOpacity>
            <Image style={[styles.logo]} source={settingImage} />
            <Text style={[styles.text,{marginLeft: 5, fontSize: 25,}]}>Settings</Text>
          </View>
        </View>
        
        <View style={[styles.containerContent,styles.center]} >
             <View style={styles.boxx}>
                <Image style={styles.logo2}source={user_profileImage}/>
                <Text style={[styles.text]}>User X</Text>
                <Text style={[styles.text]}>6XX</Text>
                <Text style={[styles.text]}>XX@dome</Text>
            </View>
            <Text style={[styles.text2]}>{'>Language'}</Text>
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
                <View style={styles.nav2}>
                    <Text style={[styles.text2]}>{'>PIN CODE'}</Text>
                    <Switch
                        trackColor={{false: styles.thumbColorFalse, true: styles.thumbColorTrue}}
                        thumbColor={isEnabled ? styles.cycleColor : styles.cycleColor}
                        ios_backgroundColor={styles.iosBackgroundColor}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
      </View>
    );
  }
  else{
    return (
      <View style={styles.test}>
        <Text>Profile</Text>
        <Button title="Sign Out" onPress={() => firebase_auth.signOut()} />
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
    logo3: {
        width: 40,
        height: 40,
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
        logo3: {
            width: 40,
            height: 40,
            borderRadius: 30,
        },
        checkmark: {
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
            lineHeight: 25,
        },
        thumbColorFalse: '#e8e8e8',
        thumbColorTrue: '#81b0ff',
        cycleColor: 'white',
        iosBackgroundColor: '#e8e8e8',
      });
}

export default SettingInput;