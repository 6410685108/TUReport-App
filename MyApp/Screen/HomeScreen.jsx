import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const handleLogout = () => {
    navigation.navigate('Login');
  };
    
  return (
    <View style={styles.container}>
      <Text>Welcome, {username}!</Text>
      <Button title="Logout" onPress={handleLogout} />
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
});

export default HomeScreen;
