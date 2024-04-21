import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase_auth } from "../../firebaseConfig";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth,email, password);
        } catch (error) {
            alert(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {loading ? (
                <ActivityIndicator size="large" color="#0000ff" /> 
            ) : (
                <>
                    <Button title="Register" onPress={handleRegister} />
                    <Button title="Goto Login" onPress={() => navigation.navigate('Login')} />
                </>
            )}
     
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
       marginHorizontal: 20,
       flex: 1,
       justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    }
});


export default RegisterScreen;
