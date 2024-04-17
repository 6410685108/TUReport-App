import React, { useState } from "react";
import { database } from "../../dbManager/Database";

const AuthContext = React.createContext({
  username: "",
  isLogin: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const login = async (navigation,username, password) => {
    try {
      const userExists = await database.isUser(username, password);
      if (userExists) {
        setUsername(username);
        setIsLogin(true);
        console.log("login");
        navigation.navigate("Home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      alert("Error occurred while checking user");
    }
  };

  const logout = () => {
    setUsername("");
    setIsLogin(false);
    console.log("logout");
  };

  const value = { username, isLogin, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
