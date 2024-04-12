import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    // Database initialization logic
    // For example:
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)',
        [],
        () => {
          console.log('Database initialized');
          resolve(); // Resolve the promise when initialization is complete
        },
        (_, error) => {
          console.error('Error initializing database:', error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });
};


const addUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            console.log('Username already exists');
            resolve(false); // Resolve with false if username already exists
          } else {
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, password],
                (_, result) => {
                  console.log('Registered successfully');
                  resolve(true); // Resolve with true if registration is successful
                },
                (_, error) => {
                  console.log('Error registering:', error);
                  reject(error); // Reject the promise if there's an error
                }
              );
            });
          }
        },
        (_, error) => {
          console.log('Error checking username:', error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });
};


const checkUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            resolve(true); // Resolve with true if user exists
          } else {
            resolve(false); // Resolve with false if user does not exist
          }
        },
        (_, error) => {
          console.error('Error checking user:', error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });
};

const deleteAllUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users',
        [],
        (_, result) => {
          console.log('All users deleted successfully');
          resolve(); // Resolve the promise when deletion is complete
        },
        (_, error) => {
          console.error('Error deleting users:', error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  });
};
  
export { initializeDatabase, addUser, checkUser, deleteAllUser };
