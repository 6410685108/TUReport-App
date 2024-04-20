import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";

const Posts = () => {
    const testInfo = [{
        username: 'JohnSmith',
        time: '4h',
        status: 'Status',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto ullam, quas laborum optio odio doloribus?',
        image: 'https://files.ejan.co/wp-content/uploads/2023/12/2320_4.jpg',
    },
    {
        username: 'JohnDoe',
        time: '4h',
        status: 'Status',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto ullam, quas laborum optio odio doloribus?',
        image: 'https://files.ejan.co/wp-content/uploads/2023/12/2320_4.jpg',
    }
    ]
  return (
    <ScrollView>
        {/* use function map to show all post */}
        {testInfo.map((info) => (
            <View style={{margin: 10, padding: 15, backgroundColor: '#ECECEC', borderRadius: 20}} key={info.id}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 30, height: 30}}source={require('../picture/user_profile.png')}/>
                    <View style={{flexDirection: 'column', paddingLeft: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 14}}>{info.username}</Text>
                        <Text style={{fontSize: 12}}>{info.time}</Text>
                    </View>
                </View>
                <Text>{info.status}</Text>
            </View>
            <Text style={{marginTop: 10}}>
                {info.content}
            </Text>
            <Image style={{width: '100%', height: 250, borderRadius: 20, marginTop: 10}} source={{uri: info.image}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {console.log('Repost pressed!')}}>
                    <Image style={{width: 30, height: 30}} source={require('../picture/repost_icon.png')} />
                    <Text style={{paddingLeft: 5}}>10</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {console.log('Bookmark pressed!')}}>
                    <Image style={{width: 30, height: 30}} source={require('../picture/save1.png')} />
                </TouchableOpacity>
            </View>
            <TextInput placeholder="Comment" style={{borderWidth: 1, borderColor: 'black', borderRadius: 10, padding: 5, marginVertical: 10}}/>
          </View>
        ))}
    </ScrollView>
  );
};

export default Posts;
