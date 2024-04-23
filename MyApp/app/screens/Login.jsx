import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { firebase_auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const easyLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        "t@t.com",
        "111111"
      );
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      // Gradient colors
      colors={["#ff7100", "#ffda27"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../picture/logo.png")}
            style={{
              width: 200,
              height: 200,
              marginTop: 60,
              marginBottom: -20,
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
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
              <Text style={styles.orText}>or</Text>
              <View style={styles.line}></View>
            </View>
            <Text style={{ color: "white", marginTop: -5 }}>Continue with</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.buttonText}>Go to Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Test")}
            >
              <Text style={styles.buttonText}>Test Page For Backend</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={easyLogin}>
              <Text style={styles.buttonText}>EZ Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginVertical: 10,
    width: width * 0.5,
    borderRadius: 25,
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
});

export default Login;
