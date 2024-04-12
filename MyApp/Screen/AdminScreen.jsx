import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { deleteAllUser } from '../dbManager/UserManager';
import { Alert } from 'react-native';

const AdminScreen = ({ navigation }) => {
  const handleDeleteAll = () => {
    Alert.alert(
        'Confirmation',
        'Are you sure you want to delete all users?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              deleteAllUser()
                .then(() => {
                  console.log('All users deleted successfully');
                  alert('All users deleted successfully');
                })
                .catch(error => {
                  console.error('Error deleting users:', error);
                  alert('An error occurred while deleting users');
                });
            },
            style: 'destructive',
          }
        ],
    );
  };

  return (
    <View style={styles.container}>
      <Text>Admin Screen</Text>
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
});

export default AdminScreen;
