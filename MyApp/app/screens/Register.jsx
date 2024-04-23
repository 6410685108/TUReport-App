import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase_auth } from "../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
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
        <Text style={styles.header}>Create Account</Text>
        <Text style={{ color: "white", marginTop: -5 }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={email}
          onChangeText={setEmail}
        />
        <Text style={{ color: "white", marginTop: -5 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={{ color: "white", marginTop: -5 }}>Comfirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Register" onPress={handleRegister} />
            <Button
              title="Go to Login"
              onPress={() => navigation.navigate("Login")}
            />
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 3,
    borderRadius: 25,
    padding: 10,
    borderColor: "white",
    color: "white",
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    color: "#fff",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
