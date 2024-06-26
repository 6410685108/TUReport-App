import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { data } from "../system/data";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await data.login(email, password);
  };

  return (
    <LinearGradient colors={["#b50d2e", "#ffd13e"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../picture/logo.png")}
            style={{
              width: 280,
              height: 280,
              marginTop: -30,
              marginBottom: -10,
            }}
          />
        </View>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="white"
        />

        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="white"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.line}></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.signUpText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: height,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: width * 0.75,
    borderWidth: 3,
    borderRadius: 25,
    padding: 10,
    borderColor: "white",
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 8,
    width: width * 0.5,
    borderRadius: 25,
  },
  buttonContainer: {
    alignItems: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "white",
    marginHorizontal: 5,
    width: width * 0.5,
  },
  orText: {
    color: "white",
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontWeight: "700",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
  registerText: {
    fontSize: 16,
    color: "white",
    marginTop: 15,
  },
  signUpText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginTop: 15,
  },
});

export default Login;
