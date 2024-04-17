import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import useDatabase from '../dbManager/useDatabase';

const AdminInitDatabase = ({ navigation }) => {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  useDatabase(setDatabaseInitialized);
 
  return (
    <View style={styles.container}>
      <Text>Admin Screen</Text>
      {databaseInitialized ? (
        <Text>Database initialized</Text>
      ) : (
        <Text>Initializing database...</Text>
      )}
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

export default AdminInitDatabase;
