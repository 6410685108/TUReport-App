import React, { useState , useContext } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Posts from "../components/Posts";
import { SelectCountry } from "react-native-element-dropdown";
import { SettingContext } from "../system/setting";

// import { TextInput } from "react-native-gesture-handler";

// const { setting } = useContext(SettingContext);
// let theme = setting.theme;


const Home = () => {
  const [country, setCountry] = useState("1");
  const local_data = [
    {
      value: "1",
      lable: "Allpost",
    },
    {
      value: "A-Z",
      lable: "A-Z",
    },
    {
      value: "Z-A",
      lable: "Z-A",
    },
    {
      value: "Repost",
      lable: "Repost",
    },
  ];
  const homeImage = theme === 'light' ? require('../picture/home.png') : require('../picture/home_w.png');
  const notiImage = theme === 'light' ? require('../picture/noti.png') : require('../picture/noti_w.png');

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image
            style={styles.logo}
            source={homeImage}
          />
          <Text style={[styles.text,{ marginLeft: 5, fontSize: 25 }]}>HOME</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("move to notification page!");
          }}
        >
          <Image
            style={{ width: 40, height: 40, marginRight: 5 }}
            source={notiImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nav2}>
        <SelectCountry
          style={styles.dropdown}
          containerStyle={styles.containerStyle}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={country}
          data={local_data}
          valueField="value"
          labelField="lable"
          onChange={(e) => {
            setCountry(e.value);
          }}
        />
      </View>

      <Posts option={country} />
    </View>
  );
};

let styles ;
let theme = 'dark'
if (theme == 'dark'){
  styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
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
    nav2: {
      flexDirection: "row",
      justifyContent: "flex-end",
      height: 50,
    },
    search: {
      flex: 0.5,
      paddingLeft: 10,
      padding: 2,
      margin: 10,
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 10,
    },
    dropdown: {
      flex: 0.5,
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 10,
    },
    containerStyle: {
      backgroundColor: "black",
    },
    logo: {
      width: 40,
      height: 40,
    },
    text: {
      color: "white",
    },
    placeholderStyle: {
      color: 'white',
    },
    selectedTextStyle: {
      color: 'grey',
    },
  });
}else if(theme == "light"){
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
    nav2: {
      flexDirection: "row",
      justifyContent: "flex-end",
      height: 50,
    },
    search: {
      flex: 0.5,
      paddingLeft: 10,
      padding: 2,
      margin: 10,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
    },
    dropdown: {
      flex: 0.5,
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
    },
    logo: {
      width: 40,
      height: 40,
    },
    text: {
      color: "black",
    },
    placeholderStyle: {
      color: 'black',
    },
    selectedTextStyle: {
      color: 'black',
      backgroundColor: 'white',
    },
  });
}

export default Home;
