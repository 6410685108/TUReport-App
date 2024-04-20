import React , { useState } from "react";
import { View, Text, StyleSheet , TextInput, ActivityIndicator, Button } from "react-native";
import { firebase_auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth,email, password);
            //console.log(response);
        } catch (error) {
            alert(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth,email, password);
            //console.log(response);

        } catch (error) {
            alert(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <TextInput 
                value={email} 
                style={styles.input} 
                placeholder="Email" 
                autoCapitalize="none" 
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput 
                secureTextEntry={true}
                value={password} 
                style={styles.input} 
                placeholder="Password" 
                autoCapitalize="none" 
                onChangeText={(text) => setPassword(text)}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" /> 
            ) : (
                <>
                    <Button title="Login" onPress={signIn} />
                    <Button title="Goto Register" onPress={() => navigation.navigate('Register')} />
                </>
            )}
            
        </View>

    );
}

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

export default Login;