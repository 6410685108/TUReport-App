import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { firebase_auth } from "../../firebaseConfig";
import Posts from "../components/Posts";
import { SelectCountry } from "react-native-element-dropdown";

// import { TextInput } from "react-native-gesture-handler";

const Finish = () => {
  const [country, setCountry] = useState("1");


  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image
            style={styles.logo}
            source={require('../picture/finish.png')}
          />
          <Text style={{ marginLeft: 5, fontSize: 25 }}>FINISHED</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("move to notification page!");
          }}
        >
          <Image
            style={{ width: 40, height: 40, marginRight: 5 }}
            source={require("../picture/noti.png")}
          />
        </TouchableOpacity>
      </View>

      <Posts option={"Finish"} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
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
});

export default Finish;
