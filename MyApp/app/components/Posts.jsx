import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

const Posts = () => {
  return (
    <View>
        {/* use function map to show all post */}
      <View style={{margin: 10, padding: 15, backgroundColor: 'lightgrey', borderRadius: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 30, height: 30}}source={{uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}}/>
                <View style={{flexDirection: 'column', paddingLeft: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>Username</Text>
                    <Text style={{fontSize: 12}}>4h</Text>
                </View>
            </View>
            <Text>Status</Text>
        </View>
        <Text style={{marginTop: 10}}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto ullam, quas laborum optio odio doloribus?
        </Text>
        <Image style={{width: '100%', height: 250, borderRadius: 20, marginTop: 10}} source={{uri: 'https://files.ejan.co/wp-content/uploads/2023/12/2320_4.jpg'}}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {console.log('Repost pressed!')}}>
                <Image style={{width: 30, height: 30}} source={{uri: 'https://w7.pngwing.com/pngs/408/714/png-transparent-repost-zondicons-icon.png'}} />
                <Text style={{paddingLeft: 5}}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {console.log('Bookmark pressed!')}}>
                <Image style={{width: 30, height: 30}} source={{uri: 'https://i.pinimg.com/736x/53/53/4a/53534aa10681e044afadc9966183b24a.jpg'}} />
            </TouchableOpacity>
        </View>
        <TextInput placeholder="Comment" style={{borderWidth: 1, borderColor: 'black', borderRadius: 10, padding: 5, marginTop: 10}}/>
      </View>
    </View>
  );
};

export default Posts;
