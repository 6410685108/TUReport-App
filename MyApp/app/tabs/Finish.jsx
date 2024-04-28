import React, { useState, useContext } from "react";
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

const Finish = () => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === 'light' ? lightstyles : darkstyles;

  const [country, setCountry] = useState('Finished');
  const local_data = [
    {
      value: "Pending",
      lable: "Pending",
    },
    {
      value: "Approved",
      lable: "Approved",
    },
    {
      value: "InProgress",
      lable: "InProgress",
    },
    {
      value: "Waiting",
      lable: "Waiting",
    },
    {
      value: "Finished",
      lable: "Finished",
    },
    {
      value: "Reject",
      lable: "Reject",
    },
  ];

  const statusImage = theme === 'light' ? require('../picture/status_b.png') : require('../picture/status_w.png');

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image
            style={styles.logo}
            source={statusImage}
          />
          <Text style={[styles.text,{ marginLeft: 5, fontSize: 25 }]}>{language === 'EN' ? "Status" : "สถานะ"}</Text>
        </View>
      </View>
      <View style={styles.nav2}>
        <SelectCountry
          style={styles.dropdown}
          containerStyle={styles.containerStyle}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={240}
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
    backgroundColor: "#1c1c1c",
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
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1}, 
    textShadowRadius: 10,
    fontWeight: 'bold'
  },
});

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
    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 1}, 
    textShadowRadius: 10,
    fontWeight: 'bold'
  },
});

export default Finish;