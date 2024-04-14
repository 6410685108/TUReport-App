import React from "react";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("appdb.db");

const userInitializeDatabase = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          'username TEXT, ' +
          'password TEXT)',
          [],
          () => {
            console.log('Users Database initialized');
            resolve();
          },
          (_, error) => {
            console.error('Error initializing database:', error);
            reject(error);
          }
        );
      });
    });
  };

const postInitializeDatabase = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts (' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'title TEXT,' +
          'content TEXT,' +
          'repost INTEGER,' +
          'status BOOLEAN,' +
          'location TEXT,' +
          'anonymous BOOLEAN,' +
          'username TEXT)',
          [],
          () => {
            console.log('Posts Database initialized');
            resolve();
          },
          (_, error) => {
            console.error('Error initializing database:', error);
            reject(error);
          }
        );
      });
    });
  };

const commentInitializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS comments (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'content TEXT,' +
        'username TEXT,' +
        'postId INTEGER)',
        [],
        () => {
          console.log('Comments Database initialized');
          resolve();
        },
        (_, error) => {
          console.error('Error initializing database:', error);
          reject(error);
        }
      );
    });
  });
};

// Posts Database Functions
const createPost = (title, content , username) => {
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
      tx.executeSql(
          "INSERT INTO posts (title, content, repost, status  ,username) VALUES (?, ?, ?, ?, ?)",
          [title, content, 0, false, username],
          (_, result) => {
          console.log('Post created successfully');
          resolve();
          }
      );
      });
  });
};

const getAllPosts = (callback) => {
  db.transaction(tx => {
      tx.executeSql(
          'SELECT * FROM posts',
          [],
          (_, { rows: { _array } }) => {
              callback(_array);
          },
          (_, error) => {
              console.log('Error fetching posts:', error);
          }
      );
  });
};

const deleteAllPosts = () => {
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
      tx.executeSql(
          "DELETE FROM posts",
          [],
          (_, result) => {
          console.log('Posts deleted successfully');
          resolve();
          }
      );
      });
  });
};

// Users Database Functions
const addUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            console.log('Username already exists');
            resolve(false);
          } else {
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, password],
                (_, result) => {
                  console.log('Registered successfully');
                  resolve(true);
                },
                (_, error) => {
                  console.log('Error registering:', error);
                  reject(error); 
                }
              );
            });
          }
        },
        (_, error) => {
          console.log('Error checking username:', error);
          reject(error);
        }
      );
    });
  });
};

const isUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            resolve(true); 
          } else {
            resolve(false); 
          }
        },
        (_, error) => {
          console.error('Error checking user:', error);
          reject(error);
        }
      );
    });
  });
};

const isUserExists = (username) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (_, error) => {
          console.error('Error checking user:', error);
          reject(error);
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
          resolve();
        },
        (_, error) => {
          console.error('Error deleting users:', error);
          reject(error);
        }
      );
    });
  });
};

// Comment Database Functions

const createComment = (postId,username,content) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO comments (postId, username, content) VALUES (?, ?, ?)",
        [postId, username, content],
        (_, result) => {
          console.log('Comment created successfully');
          resolve();
        },
        (_, error) => {
          console.error('Error creating comment:', error);
          reject(error);
        }
      );
    });
  });
}

const deleteComment = (commentId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM comments WHERE id = ?',
        [commentId],
        (_, result) => {
          console.log('Comment deleted successfully');
          resolve();
        },
        (_, error) => {
          console.error('Error deleting comment:', error);
          reject(error);
        }
      );
    });
  });

}

const database = { 
//  initializeDatabase,
  userInitializeDatabase,
  postInitializeDatabase,
  commentInitializeDatabase,
// Post Database Functions
  createPost,
  getAllPosts,
  deleteAllPosts,
// User Database Functions
  addUser,
  isUser,
  isUserExists,
  deleteAllUser, 
// Comment Database Functions
  createComment,
  deleteComment,

};

export { database };
