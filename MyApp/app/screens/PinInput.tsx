import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ViewStyle,
} from "react-native";
import { SettingContext } from "../system/setting";
import ReactNativePinView from "react-native-pin-view";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Pin: undefined;
  Setting: undefined;
};

interface PinProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pin'>;
}

// Custom button components - defined outside to avoid recreation on each render
const BackspaceButton: React.FC<{ theme: string }> = ({ theme }) => (
  <Icon
    name={"ios-backspace"}
    size={36}
    color={theme === "light" ? "black" : "white"}
  />
);

const UnlockButton: React.FC<{ theme: string }> = ({ theme }) => (
  <Icon
    name={"lock-open"}
    size={36}
    color={theme === "light" ? "black" : "white"}
  />
);

const Pin: React.FC<PinProps> = ({ navigation }) => {
  const { setting } = useContext(SettingContext);
  const { theme } = setting;
  const styles = theme === "light" ? lightstyles : darkstyles;

  const pinView = useRef<any>(null);
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [showCompletedButton, setShowCompletedButton] = useState<boolean>(false);
  
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

  const customLeftButton = useMemo(() => {
    if (!showRemoveButton) return undefined;
    return () => <BackspaceButton theme={theme} />;
  }, [showRemoveButton, theme]);

  const customRightButton = useMemo(() => {
    if (!showCompletedButton) return undefined;
    return () => <UnlockButton theme={theme} />;
  }, [showCompletedButton, theme]);
  
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.pinText}>PIN</Text>
        <ReactNativePinView
          inputSize={32}
          pinLength={6}
          buttonSize={60}
          onValueChange={(value: string) => setEnteredPin(value)}
          buttonAreaStyle={{ marginTop: 24 }}
          inputAreaStyle={{ marginBottom: 24 }}
          inputViewEmptyStyle={styles.inputViewEmptyStyle as ViewStyle}
          inputViewFilledStyle={styles.inputViewFilledStyle as ViewStyle}
          buttonViewStyle={styles.buttonViewStyle as ViewStyle}
          buttonTextStyle={styles.buttonTextStyle}
          onButtonPress={(key: string) => {
            if (key === "custom_left") {
              pinView.current?.clear();
              console.log("enter now pin", enteredPin);
            }
            if (key === "custom_right") {
              console.log("completed pin", enteredPin);
              navigation.navigate("Setting");
            }
          }}
          customLeftButton={customLeftButton}
          customRightButton={customRightButton}
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
