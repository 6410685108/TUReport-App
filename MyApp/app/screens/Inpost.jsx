import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";

const Inpost = ({ navigation, route }) => {
  const { postInfo } = route.params;
  const comments = [{
    id: 1,
    name: "User1",
    profile: require("../picture/user_profile.png"),
    comment: "This is a comment",
  },
  {
    id: 2,
    name: "User2",
    profile: require("../picture/user_profile.png"),
    comment: "This is a comment2",
  },
  {
    id: 3,
    name: "User3",
    profile: require("../picture/user_profile.png"),
    comment: "This is a comment3",
  },
  {
    id: 4,
    name: "User4",
    profile: require("../picture/user_profile.png"),
    comment: "This is a comment4",
  },
  {
    id: 5,
    name: "User5",
    profile: require("../picture/user_profile.png"),
    comment: "This is a comment5",
  },
  ]
  console.log(postInfo);
  return (
    <View style={{ flexDirection: "column" }}>
      <ScrollView style={{ marginTop: "10%" }}>
        {/* use function map to show all post */}
        <View
          style={{
            margin: 10,
            padding: 5,
            backgroundColor: "#ECECEC",
            borderRadius: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../picture/user_profile.png")}
              />
              <View style={{ flexDirection: "column", paddingLeft: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {postInfo.author}
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
              <Text style={{ paddingLeft: 5 }}>{postInfo.repost}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                console.log("Bookmark pressed!");
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../picture/save1.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            {comments.map((comment) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={comment.profile}
                  />
                  <View style={{ flexDirection: "column", paddingLeft: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {comment.name}
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
          backgroundColor: "black",
          marginButtom: "20",
          width: 50,
          height: 50,
        }}
      >
        <TextInput
          placeholder="Comment"
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            padding: 5,
          }}
        />
      </View>
    </View>
  );
};

export default Inpost;
