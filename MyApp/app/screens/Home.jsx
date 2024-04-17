import React from "react";
import { View, Text , Button } from "react-native";
import { firebase_auth } from "../../firebaseConfig";
import Posts from "../components/Posts";

const Home = () => {
    const handleLogout = async () => {
        try {
          await firebase_auth.signOut();
          console.log('User logged out successfully');
          
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
    };
    
      
    return (
        <View>
            <Text>Home</Text>
            <Posts />
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default Home;