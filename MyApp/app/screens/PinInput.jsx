import React, { useState , useContext ,useEffect,useRef} from 'react';
import Icon from "react-native-vector-icons/Ionicons"
import { View, TextInput, Button ,StyleSheet, Image, Text, TouchableOpacity, Alert , Keyboard , SafeAreaView, StatusBar} from 'react-native';
import { db } from '../system/db';
import * as ImagePicker from 'expo-image-picker';
import { SettingContext } from '../system/setting';
import PinView from 'react-native-pin-view';
import ReactNativePinView from "react-native-pin-view"

const Pin = () => {

    const { setting } = useContext(SettingContext);
    const { theme, language } = setting;
    const styles = theme === 'light' ? lightstyles : darkstyles;

    const [enteredPin, setEnteredPin] = useState('');
    const pinViewRef = useRef(null);
  
    const handlePinChange = (value) => {
      setEnteredPin(value);
    };
  
    const handleCustomLeftButtonPress = () => {
      if (enteredPin.length > 0) {
        setEnteredPin(enteredPin.slice(0, -1));
      }
    };
  
    const handleCustomRightButtonPress = () => {
      if (enteredPin.length === 6) {
        alert(`Entered PIN: ${enteredPin}`);
      } else {
        alert('Please enter a 6-digit PIN');
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.pinText}>PIN</Text>
        <View style={styles.pinViewContainer}>
          <ReactNativePinView
            ref={pinViewRef}
            pinLength={6} // Enforce a 6-digit PIN
            onValueChange={handlePinChange}
            inputViewEmptyStyle={styles.inputViewEmptyStyle}
            inputViewFilledStyle={styles.inputViewFilledStyle}
            buttonViewStyle={styles.buttonViewStyle}
            buttonTextStyle={styles.buttonTextStyle}
            customLeftButton={
              <View>
                {/* Conditionally display "Backspace" button */}
                {enteredPin.length > 0 && (
                  <Icon name="backspace" size={36} color="gray" />
                )}
              </View>
            }
            customRightButton={
              <View>
                {/* Only display "Unlock" button when PIN length is 6 */}
                {enteredPin.length === 6 && (
                  <Icon name="lock-open" size={36} color="gray" />
                )}
              </View>
            }
            onButtonPress={(key) => {
              if (key === 'custom_left') {
                handleCustomLeftButtonPress();
              } else if (key === 'custom_right') {
                handleCustomRightButtonPress();
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
};


const lightstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
      },
      pinText: {
        color: 'black',
        fontSize: 48,
        paddingBottom: 48,
      },
      pinViewContainer: {
        marginTop: 24,
      },
      inputViewEmptyStyle:{
        borderWidth: 1, 
        borderColor: 'black', 
        backgroundColor: 'white',
        margin:12   
    },
    inputViewFilledStyle:{
        backgroundColor: 'black', 
    },
    buttonViewStyle:{
        borderWidth: 1, 
        borderColor: 'black',
    },
    buttonTextStyle:{
        color: 'black',
    }
  });

const darkstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
      },
      pinText: {
        color: 'white',
        fontSize: 48,
        paddingBottom: 48,
      },
      pinViewContainer: {
        marginTop: 24,
      },
      inputViewEmptyStyle:{
        borderWidth: 1, 
        borderColor: 'white', 
        backgroundColor: '#1c1c1c',
        margin:12   
    },
    inputViewFilledStyle:{
        backgroundColor: 'white', 
    },
    buttonViewStyle:{
        borderWidth: 1, 
        borderColor: 'white',
    },
    buttonTextStyle:{
        color: 'white',
    }
  });



export default Pin;