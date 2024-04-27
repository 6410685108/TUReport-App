import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect , useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../system/db";

const Notification =  () => {
  const [data, setData] = useState([]);
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
    const send = [ post ] ;
    navigation.navigate("Inpost", { postInfo: send });
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
      </View>
      <View style={{ margin: 20 }}>
        {data.map((info) => (
          <View style={{ marginVertical: 10 }} key={info.id}>
            <TouchableOpacity onPress={() => handleToInpost(info.postid)} style={{ flexDirection: 'row' }}>
              <View style={styles.profile}>
                <Image style={styles.profileImg} source={{ uri: info.userCreate.photo }} />
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>
                  {info.title}
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
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    marginRight: 10,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
