import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { AuthContext } from "./system/Authenticate";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLogin, login } = useContext(AuthContext);

  useEffect(() => {if(isLogin) navigation.navigate('Home')})

  const handleLogin = () => {
    login(navigation,username, password);
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  
});

export default LoginScreen;
