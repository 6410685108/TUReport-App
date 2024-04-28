import React, { useState, useContext, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { db } from "../system/db";
import * as ImagePicker from "expo-image-picker";
import { SettingContext } from "../system/setting";
// import PinView from 'react-native-pin-view';
import ReactNativePinView from "react-native-pin-view";

const Pin = ({ navigation }) => {
  const { setting } = useContext(SettingContext);
  const { theme, language } = setting;
  const styles = theme === "light" ? lightstyles : darkstyles;

  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
    if (enteredPin.length === 6) {
      setShowCompletedButton(true);
    } else {
      setShowCompletedButton(false);
    }
  }, [enteredPin]);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.pinText}>PIN</Text>
        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={6}
          buttonSize={60}
          onValueChange={(value) => setEnteredPin(value)}
          buttonAreaStyle={{ marginTop: 24 }}
          inputAreaStyle={{ marginBottom: 24 }}
          inputViewEmptyStyle={[styles.inputViewEmptyStyle]}
          inputViewFilledStyle={[styles.inputViewFilledStyle]}
          buttonViewStyle={[styles.buttonViewStyle]}
          buttonTextStyle={styles.buttonTextStyle}
          onButtonPress={(key) => {
            if (key === "custom_left") {
              pinView.current.clear();
              console.log("enter now pin", enteredPin);
            }
            if (key === "custom_right") {
              console.log("completed pin", enteredPin);
              db.setPin(enteredPin);
              navigation.navigate("Setting");
            }
          }}
          customLeftButton={
            showRemoveButton ? (
              <Icon
                name={"ios-backspace"}
                size={36}
                color={theme === "light" ? "black" : "white"}
              />
            ) : undefined
          }
          customRightButton={
            showCompletedButton ? (
              <Icon
                name={"lock-open"}
                size={36}
                color={theme === "light" ? "black" : "white"}
              />
            ) : undefined
            
          }
        />
      </SafeAreaView>
    </>
  );
};

const lightstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  pinText: {
    color: "black",
    fontSize: 48,
    paddingBottom: 48,
  },
  pinViewContainer: {
    marginTop: 24,
  },
  inputViewEmptyStyle: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    margin: 8,
  },
  inputViewFilledStyle: {
    backgroundColor: "black",
    margin: 8,
  },
  buttonViewStyle: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttonTextStyle: {
    color: "black",
  },
});

const darkstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  pinText: {
    color: "white",
    fontSize: 48,
    paddingBottom: 48,
  },
  pinViewContainer: {
    marginTop: 24,
  },
  inputViewEmptyStyle: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#1c1c1c",
    margin: 8,
  },
  inputViewFilledStyle: {
    backgroundColor: "white",
    margin: 8,
  },
  buttonViewStyle: {
    borderWidth: 1,
    borderColor: "white",
  },
  buttonTextStyle: {
    color: "white",
  },
});

export default Pin;
