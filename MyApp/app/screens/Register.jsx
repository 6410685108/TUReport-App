import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { firebase_auth } from "../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../system/db";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth,email,password);
      await signInWithEmailAndPassword(auth, email, password)
      await db.uploadUserPhoto(
        "https://firebasestorage.googleapis.com/v0/b/tu-reports.appspot.com/o/images%2Fuser_profile.png?alt=media&token=2b93fb80-17f8-45a6-bdca-7af2a6c9cb0c"
      );
      const displayname = email.split("@")[0];
      await db.setDisplayName(displayname)
    } catch (error) {
      alert("Error registering: " + error.message);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#ff7100", "#ffda27"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Create Account</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.buttonText}>Back to Login</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 15,
    marginTop: -15,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    minWidth: "100%",
    borderWidth: 3,
    borderRadius: 25,
    padding: 10,
    borderColor: "white",
    color: "white",
    textAlign: "center",
  },
  label: {
    color: "white",
    marginBottom: 5,
  },
  header: {
    fontSize: 38,
    color: "#fff",
    marginBottom: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontWeight: "700",
  },
});

export default RegisterScreen;
