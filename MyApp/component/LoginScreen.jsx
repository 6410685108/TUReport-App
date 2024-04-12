import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { initializeDatabase, checkUser, deleteAllUser } from '../dbManager/UserManager'; // Import deleteAllUser

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  useEffect(() => {
    initializeDatabase()
      .then(() => setDatabaseInitialized(true))
      .catch(error => {
        console.error('Error initializing database:', error);
        Alert.alert('Error', 'An error occurred while initializing the database');
      });
  }, []);

  const handleLogin = () => {
    if (!databaseInitialized) {
      Alert.alert('Error', 'Database is not initialized');
      return;
    }

    checkUser(username, password)
      .then(userExists => {
        if (userExists) {
          navigation.navigate('Home'); 
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('Error checking user:', error);
        alert('Error occurred while checking user');
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleDeleteAll = () => {
    deleteAllUser() // Call the deleteAllUser function
      .then(() => {
        console.log('All users deleted successfully');
        alert('All users deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting users:', error);
        alert('An error occurred while deleting users');
      });
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
      <Button title="Register" onPress={handleRegister} />
      <Button title="Delete All Users" onPress={handleDeleteAll} />
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
