import React from "react";
import { View, Text , Button , StyleSheet } from "react-native";
import { firebase_auth } from "../../firebaseConfig";

const Profile = () => {
             
    return (
        <View style={styles.test}>
            <Text>Profile</Text>
            <Button title="Sign Out" onPress={() => firebase_auth.signOut()} />
        </View>
    );
}

const styles = StyleSheet.create({
    test: {
      alignItems: "center",
      marginTop: "100%",
    },
    
  });

export default Profile;