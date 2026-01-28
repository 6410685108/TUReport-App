import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { db, PostData, CommentData } from "../system/db";
import { data } from "../system/data";
import UserPhoto from "../components/UserPhoto";
import Name from "../components/Name";
import { SettingContext } from '../system/setting';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  InpostAdmin: { postInfo: PostData };
};

interface InpostProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'InpostAdmin'>;
  route: RouteProp<RootStackParamList, 'InpostAdmin'>;
}

const Inpost: React.FC<InpostProps> = ({ navigation, route }) => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === 'light' ? lightstyles : darkstyles;
  const { postInfo } = route.params;
  const postid = postInfo.id;
  const [repost, setRepost] = useState<number>(postInfo.repost);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [comment, setComment] = useState<string>("");

  const fetchComment = async (): Promise<void> => {
    const comment = await data.getComments(postid);
    setComments(comment);
  };

  useEffect(() => {
    fetchComment();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchComment();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, repost]);

  const handleRepost = async (postId: string): Promise<void> => {
    db.repostPost(postId);
    const isRepost = await db.isReposted(postId);
    if (isRepost) {
      setRepost(repost - 1);
    } else {
      setRepost(repost + 1);
    }
  };

  const handleBookmark = async (postId: string): Promise<void> => {
    await db.userBookmark(postId);
  };

  const handleCreateComment = async (): Promise<void> => {
    await db.createComment(postid, comment);
    await fetchComment();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: "10%", height: "90%" }}>
        <View
          style={{
            margin: 10,
            padding: 5,
            borderRadius: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <UserPhoto userId={postInfo.author} isAnonymous={postInfo.anonymous} />
              <View style={{ flexDirection: "column", paddingLeft: 5 }}>
                <Text style={[styles.text, { fontWeight: "bold", fontSize: 14 }]}>
                  <Name userId={postInfo.author} isAnonymous={postInfo.anonymous} />
                </Text>
                <Text style={[styles.text, { fontSize: 12 }]}>{postInfo.time}</Text>
              </View>
            </View>
            {postInfo.status !== 'Finished' && postInfo.status !== 'Reject' && (
              <View style={{ flexDirection: 'column' }}>
                <Text style={[styles.text, { fontSize: 14, textAlign: 'center' }]}>{postInfo.status}</Text>
                {postInfo.status === 'Pending' && (
                  <Image style={{ width: 70, height: 20 }} source={require('../picture/Pending.png')} />
                )}
                {postInfo.status === 'Approved' && (
                  <Image style={{ width: 70, height: 20 }} source={require('../picture/Approved.png')} />
                )}
                {postInfo.status === 'In progress' && (
                  <Image style={{ width: 70, height: 20 }} source={require('../picture/Inprogress.png')} />
                )}
                {postInfo.status === 'Waiting' && (
                  <Image style={{ width: 70, height: 20 }} source={require('../picture/Waiting.png')} />
                )}
              </View>
            )}
            {postInfo.status === 'Reject' && (
              <View style={{ flexDirection: 'row' }}>
                {postInfo.status === 'Reject' && (
                  <Image style={{ width: 25, height: 25, top: -2 }} source={require('../picture/Reject.png')} />
                )}
                <Text style={[styles.text, { fontSize: 14, textAlign: 'center' }]}>{postInfo.status}</Text>
              </View>
            )}
            {postInfo.status === 'Finished' && (
              <View style={{ flexDirection: 'row' }}>
                {postInfo.status === 'Finished' && (
                  <Image style={{ width: 30, height: 30, top: -5 }} source={require('../picture/Finished.png')} />
                )}
                <Text style={[styles.text, { fontSize: 14, textAlign: 'center' }]}>{postInfo.status}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16, marginTop: 10 }]}>
            {postInfo.title}
          </Text>
          <Text style={[styles.text, { marginTop: 10 }]}>{postInfo.detail}</Text>
          <Image
            style={{
              width: "100%",
              height: 250,
              borderRadius: 20,
              marginTop: 10,
            }}
            source={{ uri: postInfo.photoUrl }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => handleRepost(postInfo.id)}
            >
              {theme === 'light' ? (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../picture/repost_icon.png")}
                />
              ) :
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../picture/repost_icon_w.png")}
                />
              }
              <Text style={[styles.text, { paddingLeft: 5 }]}>{repost}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                handleBookmark(postInfo.id);
              }}
            >
              {theme === 'light' ? (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../picture/save1.png")}
                />
              ) :
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../picture/save1_w.png")}
                />
              }

            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: styles.text.color === 'black' ? "black" : "white",
              borderBottomWidth: 1,
              marginTop: 15,
            }}
          />
          <View>
            {comments.map((commentItem) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 15,
                }}
                key={commentItem.id}
              >
                <View style={{ flexDirection: "row" }}>
                  <UserPhoto userId={commentItem.author} />
                  <View style={{ flexDirection: "column", paddingLeft: 6 }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 15 }]}>
                      <Name userId={commentItem.author} /> <Text style={{ fontSize: 10, fontWeight: "normal" }}>{commentItem.time}</Text>
                    </Text>
                    <Text style={[styles.text, { fontSize: 13 }]}>{commentItem.comment}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>


        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
        }}
      >
        <TextInput
          placeholder={language === 'EN' ? "Comment" : "คอมเม้นต์"}
          placeholderTextColor={styles.text.color === 'black' ? "black" : "white"}
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={{
            borderWidth: 1,
            borderColor: styles.text.color === 'black' ? "black" : "white",
            borderRadius: 10,
            padding: 5,
            width: "80%",
            flex: 0.7,
          }}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleCreateComment()}
        >
          <Text style={styles.text}>{language === 'EN' ? "Send" : "ส่ง"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Inpost;

const lightstyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#FFF',
    height: '100%'
  },
  sendButton: {
    marginLeft: 10,
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    height: 30,
  },
  sendButtonhover: {
    marginLeft: 10,
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    height: 30,
  },
  text: {
    color: 'black',
  },
});

const darkstyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#1c1c1c',
    height: '100%'
  },
  sendButton: {
    marginLeft: 10,
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#606060",
    borderRadius: 10,
    height: 30,
  },
  sendButtonhover: {
    marginLeft: 10,
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#606060",
    borderRadius: 10,
    height: 30,
  },
  text: {
    color: 'white',
  },
});
