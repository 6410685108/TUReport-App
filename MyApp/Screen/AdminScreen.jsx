import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { database } from '../dbManager/Database';
import { Alert } from 'react-native';

const AdminScreen = ({ navigation }) => {
  const handleDeleteAllUser = () => {
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
              database.deleteAllUser()
                .then(() => {
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
  
  const handleDeleteAllPost = () => {
    Alert.alert(
        'Confirmation',
        'Are you sure you want to delete all posts?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              database.deleteAllPosts()
                .then(() => {
                  alert('All posts deleted successfully');
                })
                .catch(error => {
                  console.error('Error deleting posts:', error);
                  alert('An error occurred while deleting posts');
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
      <Button title="Delete All Users" onPress={handleDeleteAllUser} />
      <Button title="Delete All Posts" onPress={handleDeleteAllPost} />
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
