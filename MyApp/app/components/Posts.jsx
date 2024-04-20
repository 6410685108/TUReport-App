import React from "react";
import { View, Text, Image } from "react-native";

const Posts = () => {
  return (
    <View>
      <View>
        <Image style={{width: 30, height: 30}}source={{uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}}/>
        <Text>
          Title: Title{"\n"}
          Username: Username{"\n"}
          Repost: 1{"\n"}
          Status: Ok{"\n"}
          Location: Map{"\n"}
          Anonymous: Anonymous
        </Text>
      </View>
    </View>
  );
};

export default Posts;
