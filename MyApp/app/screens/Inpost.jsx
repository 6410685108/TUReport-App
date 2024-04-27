import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import React, { useEffect , useState } from "react";
import { db } from "../system/db"
import { data } from "../system/fetchData";
import UserPhoto from "../components/UserPhoto";

const Inpost = ({ navigation, route }) => {
  const { postInfo } = route.params;
  const postid = postInfo.id;
  const [repost, setRepost] = useState(postInfo.repost);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [sendButton, setSendButton] = useState(false);

  const fetchComment = async () => {
    const comment = await data.getComments(postid);
    setComments(comment);
  }

  useEffect(() => {
    fetchComment();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchComment();
    });
    return () => {
        unsubscribe();
    };
}, [navigation,repost]);

  const handleRepost = async (postId) => {
    const isRepost = await db.repostPost(postId);
    if (isRepost){
      setRepost(repost - 1);
    } else {
      setRepost(repost + 1);
    }
  }

  const handleBookmark = async (postId) => {
    await db.userBookmark(postId);
}

  const handleCreateComment = async () => {
    await db.createComment(postid,comment);
    await fetchComment();
  }

  return (
    <View style={{ flexDirection: "column" }}>
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
            <UserPhoto userId={postInfo.author.uid} />
              <View style={{ flexDirection: "column", paddingLeft: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {postInfo.author.displayName}
                </Text>
                <Text style={{ fontSize: 12 }}>{postInfo.time}</Text>
              </View>
            </View>
            <Text>{postInfo.status}</Text>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
            {postInfo.title}
          </Text>
          <Text style={{ marginTop: 10 }}>{postInfo.detail}</Text>
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
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../picture/repost_icon.png")}
              />
              <Text style={{ paddingLeft: 5 }}>{repost}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                handleBookmark(postInfo.id);
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../picture/save1.png")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 15,
            }}
          />


          <View>
            {comments.map((comment) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 15,
                }}
                key={comment.id}
              >
                <View style={{ flexDirection: "row" }}>
                  <UserPhoto userId={comment.author.uid} />
                  <View style={{ flexDirection: "column", paddingLeft: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {comment.author.displayName}
                    </Text>
                    <Text style={{ fontSize: 13 }}>{comment.comment}</Text>
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
          height: 40,
        }}
      >
        <TextInput
          placeholder="Comment"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            padding: 5,
            width: "80%",
            flex: 0.7,
          }}
        />
        <TouchableOpacity
        style={sendButton ? styles.sendButtonhover : styles.sendButton}
        onPress={() => handleCreateComment()}
        onMouseEnter={() => setSendButton(true)}
        onMouseLeave={() => setSendButton(false)}
        >
        <Text style={{color: "black"}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Inpost;

const styles = StyleSheet.create({
  sendButton: { 
    marginLeft: 10, 
    flex: 0.15, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "lightgrey", 
    borderRadius: 10, 
    height: 30,
    trasition: "all 0.5s"
  },
  sendButtonhover: {
    marginLeft: 10, 
    flex: 0.15, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "grey", 
    borderRadius: 10, 
    height: 30,
  }
});
