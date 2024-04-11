import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initializeDatabase, addItem, getItems } from './DatabaseManager';

export default function App() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    initializeDatabase();
    refreshItems();
  }, []);

  const refreshItems = () => {
    getItems((data) => {
      setItems(data);
    });
  };

  const handleAddItem = () => {
    addItem(itemName, parseInt(itemQuantity, 10));
    setItemName('');
    setItemQuantity('');
    refreshItems();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={text => setItemName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={itemQuantity}
        onChangeText={text => setItemQuantity(text)}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAddItem} />
      {items.map(item => (
        <Text key={item.id}>{item.name}: {item.quantity}</Text>
      ))}
    </View>
  );
}

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
