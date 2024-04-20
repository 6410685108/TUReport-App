import React, { useState } from "react";
import { View, Text , Button, TextInput, StyleSheet, Image} from "react-native";
import { firebase_auth } from "../../firebaseConfig";
import Posts from "../components/Posts";
import { SelectCountry } from 'react-native-element-dropdown';

// import { TextInput } from "react-native-gesture-handler";

const Home = () => {
  const [country, setCountry] = useState('1');
  const local_data = [
    {
      value: '1',
      lable: 'Allpost',
    },
    {
      value: '2',
      lable: 'A',
    },
    {
      value: '3',
      lable: 'B',
    },
    {
      value: '4',
      lable: 'C',
    },
    {
      value: '5',
      lable: 'D',
    },
  ];

    const handleLogout = async () => {
        try {
          await firebase_auth.signOut();
          console.log('User logged out successfully');
          
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
    };
    
      
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
              <View style={styles.inNav}>
                <Image style={[styles.logo, {margin: 5}]} source={{uri: 'https://w7.pngwing.com/pngs/283/132/png-transparent-house-business-real-estate-logo-service-house-text-service-room-thumbnail.png',}} />
                <Text style={[{margin: 5, fontSize: 40, fontWeight: 'bold'}]}>HOME</Text>
              </View>
              <Image style={{width: 40, height: 40, marginRight: 5}}source={{uri: 'https://www.vhv.rs/dpng/d/426-4263273_white-bell-notification-icon-transparent-clipart-bell-icon.png'}}/>
            </View>
            <View style={styles.nav2}>
              <TextInput placeholder="Search" style={styles.search}/>
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={country}
                data={local_data}
                valueField="value"
                labelField="lable"
                onChange={e => {
                  setCountry(e.value);
                }}
              />
            </View>

            <Posts />
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      height: '100%',
    },
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inNav: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    nav2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
    },
    search: {
        flex: 0.5,
        paddingLeft: 10,
        padding: 2,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    dropdown: {
        flex: 0.5,
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
});

export default Home;