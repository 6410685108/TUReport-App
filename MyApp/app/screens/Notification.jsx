import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect , useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";
import UserPhoto from "../components/UserPhoto";
import Name from "../components/Name";

const Notification =  () => {
  const [data, setData] = useState([]);
  const notiImage = require("../picture/noti.png");
  const fetchData = async () => {
    const res = await db.getNotification();
    setData(res);
  }
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  });

  const handleToInpost = async (postId) => {
    const post = await db.getPost(postId);
    navigation.navigate("Inpost", { postInfo: post });
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image style={styles.logo} source={require("../picture/noti.png")} />
          <Text style={[styles.text, { marginLeft: 5, fontSize: 25 }]}>
            Notification
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("Clear");
          }}
        >
          <Image
            style={{ width: 40, height: 40, marginRight: 5 }}
            source={notiImage}
          />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20 }}>
        {data.map((info) => (
          <View style={{ marginVertical: 10 }} key={info.id}>
            <TouchableOpacity onPress={() => handleToInpost(info.postid)} style={{ flexDirection: 'row' }}>
              <View style={styles.profile}>
                <UserPhoto userId={info.userCreate} />
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>
                  <Name userId={info.userCreate}/> {info.title}
                </Text>
                <Text style={{ fontSize: 12 }}>{info.time}</Text>
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
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
