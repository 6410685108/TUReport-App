import React from "react";
import { View, Text , Button } from "react-native";
import { firebase_auth } from "../../firebaseConfig";

const Profile = () => {
             
    return (
        <View>
            <Text>Profile</Text>
            <Button title="Sign Out" onPress={() => firebase_auth.signOut()} />
        </View>
    );
}

export default Profile;