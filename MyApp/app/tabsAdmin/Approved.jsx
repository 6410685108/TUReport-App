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
import Posts from "../componentsAdmin/Posts";
import { SelectCountry } from "react-native-element-dropdown";
import { SettingContext } from "../system/setting";

const Approved = ({ navigation }) => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === "light" ? lightstyles : darkstyles;

  const [country, setCountry] = useState("1");

  let local_data = [];
  if (language == "EN") {
    local_data = [
      {
        value: "1",
        lable: "Most Recent",
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
  } else {
    local_data = [
      {
        value: "1",
        lable: "โพสทั้งหมด",
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
        lable: "รีโพสต์",
      },
    ];
  }

  const PendingImage =
    theme === "light"
    ? require("../picture/logo.png")
      : require("../picture/home_w.png");
  const notiImage =
    theme === "light"
      ? require("../picture/noti.png")
      : require("../picture/noti_w.png");

  if (language == "EN") {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Image style={styles.logo} source={PendingImage} />
            <Text style={[styles.text, { marginLeft: 5, fontSize: 25 }]}>
              Approved
            </Text>
          </View>
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
        <Posts option={country} status={"Approved"} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.inNav}>
            <Image style={styles.logo} source={PendingImage} />
            <Text style={[styles.text, { marginLeft: 5, fontSize: 25 }]}>
              หน้าหลัก
            </Text>
          </View>
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
        <Posts option={country} status={"Pending"} />
      </View>
    );
  }
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
    marginRight: 10,
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
    backgroundColor: "#D86836",
    borderRadius: 40,
  },
  text: {
    color: "white",
  },
  placeholderStyle: {
    color: "white",
  },
  selectedTextStyle: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontWeight: "bold",
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
    width: '50%',
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#D86836",
    borderRadius: 40,
  },
  text: {
    color: "black",
  },
  placeholderStyle: {
    color: "black",
  },
  selectedTextStyle: {
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontWeight: "bold",
  },
});

export default Approved;
