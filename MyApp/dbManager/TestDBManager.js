import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

// Function to initialize the database
const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER)'
    );
  });
};

// Function to insert an item into the database
const addItem = (name, quantity) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (name, quantity) VALUES (?, ?)',
      [name, quantity],
      (_, result) => {
        console.log('Item added successfully');
      },
      (_, error) => {
        console.log('Error adding item:', error);
      }
    );
  });
};

// Function to fetch all items from the database
const getItems = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM items',
      [],
      (_, { rows: { _array } }) => {
        callback(_array);
      },
      (_, error) => {
        console.log('Error fetching items:', error);
      }
    );
  });
};

export { initializeDatabase, addItem, getItems };
