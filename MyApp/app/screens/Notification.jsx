import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const data = [
  {
    id: 1,
    user: "User1",
    message: "commented on your post",
    date: "2021-09-01",
    profile: require("../picture/user.png"),
  },
  {
    id: 2,
    user: "User2",
    message: "commented on your post",
    date: "2021-09-01",
    profile: require("../picture/user.png"),
  },
  {
    id: 3,
    user: "User3",
    message: "commented on your post",
    date: "2021-09-01",
    profile: require("../picture/user.png"),
  },
  {
    id: 4,
    user: "User4",
    message: "commented on your post",
    date: "2021-09-02",
    profile: require("../picture/user.png"),
  },
  {
    id: 5,
    user: "User5",
    message: "commented on your post",
    date: "2021-09-02",
    profile: require("../picture/user.png"),
  },
  {
    id: 6,
    user: "User6",
    message: "commented on your post",
    date: "2021-09-02",
    profile: require("../picture/user.png"),
  },
  {
    id: 7,
    user: "User7",
    message: "commented on your post",
    date: "2021-09-03",
    profile: require("../picture/user.png"),
  },
  {
    id: 8,
    user: "User8",
    message: "commented on your post",
    date: "2021-09-03",
    profile: require("../picture/user.png"),
  },
];

const Notification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image style={styles.logo} source={require("../picture/noti.png")} />
          <Text style={[styles.text, { marginLeft: 5, fontSize: 25 }]}>
            Notification
          </Text>
        </View>
      </View>
      <View style={{ margin: 20 }}>
        {data.map((info) => (
          <View style={{ marginVertical: 10 }} key={info.id}>
            <TouchableOpacity onPress={console.log("hello")} style={{ flexDirection: 'row' }}>
              <View style={styles.profile}>
                <Image style={styles.profileImg} source={info.profile} />
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>
                  {info.user} {info.message}
                </Text>
                <Text style={{ fontSize: 12 }}>{info.date}</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                marginVertical: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Notification;

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
    justifyContent: "flex-end",
    height: 50,
  },
  logo: {
    width: 40,
    height: 40,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    marginRight: 10,
  },
  profileImg: {
    width: 32,
    height: 32,
  },
});
