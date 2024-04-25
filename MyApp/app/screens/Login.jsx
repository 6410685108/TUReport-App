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
  ScrollView,
} from "react-native";
import { firebase_auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton, MD3Colors } from "react-native-paper";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  const signIn = async () => {
    setLoading(true);
    try {
      // const response = await signInWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth,"t@t.com","111111");
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <LinearGradient
      colors={["#ff7100", "#ffda27"]}
      style={styles.background}
    >
      {/* Why use Scrool View ??? */}
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
          <Text style={{ color: "white", marginTop: 0 }}>Continue with</Text>
          <View style={styles.iconButtonContainer}>
            <IconButton
              icon="google"
              iconColor={MD3Colors.error50}
              size={30}
              onPress={() => console.log("Pressed")}
              mode="contained-tonal"
              style={styles.iconButton}
            />
            <IconButton
              icon="facebook"
              iconColor={MD3Colors.error50}
              size={30}
              onPress={() => console.log("Pressed")}
              mode="contained-tonal"
              style={styles.iconButton}
            />
            <IconButton
              icon="email"
              iconColor={MD3Colors.error50}
              size={30}
              onPress={() => console.log("Pressed")}
              mode="contained-tonal"
              style={styles.iconButton}
            />
          </View>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.signUpText, { marginTop: 0 }]}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
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
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconButton: {
    marginHorizontal: 15,
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: height / 2,
    zIndex: 999,
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "white",
    marginTop: 15,
  },
  signUpText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});

export default Login;
