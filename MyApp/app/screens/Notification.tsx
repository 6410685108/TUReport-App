import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { db, NotificationData } from "../system/db";
import UserPhoto from "../components/UserPhoto";
import Name from "../components/Name";
import { SettingContext } from '../system/setting';

type RootStackParamList = {
  Inpost: { postInfo: any };
};

const Notification: React.FC = () => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === 'light' ? lightstyles : darkstyles;
  const [data, setData] = useState<NotificationData[]>([]);
  
  const fetchData = async (): Promise<void> => {
    const res = await db.getNotification();
    setData(res);
  };
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchData();
  });

  const handleToInpost = async (postId: string): Promise<void> => {
    const post = await db.getPost(postId);
    navigation.navigate("Inpost", { postInfo: post });
  };
  
  const noti_Image = theme === 'light' ? require('../picture/noti.png') : require('../picture/noti_w.png');
  const binImage = theme === 'light' ? require('../picture/bin_b1.png') : require('../picture/bin_w1.png');
  
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.inNav}>
          <Image style={styles.logo} source={noti_Image} />
          <Text style={[styles.text, { marginLeft: 5, fontSize: 25 }]}>
            {language === 'EN' ? "Notification" : "การแจ้งเตือน"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            db.deleteAllNotifications();
          }}
        >
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={binImage}
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
                <Text style={[styles.text, { fontSize: 16 }]}>
                  <Name userId={info.userCreate} /> {info.title}
                </Text>
                <Text style={[styles.text, { fontSize: 12 }]}>{info.time}</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                marginVertical: 5,
                borderColor: styles.borderColor,
                borderWidth: 0.3,
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

interface NotificationStyles {
  container: object;
  nav: object;
  inNav: object;
  nav2: object;
  logo: object;
  profile: object;
  text: { color: string };
  borderColor: string;
}

const lightstyles: NotificationStyles = {
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
  text: {
    color: "black",
  },
  borderColor: "black",
};

const darkstyles: NotificationStyles = {
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
  text: {
    color: "white",
  },
  borderColor: "white",
};
